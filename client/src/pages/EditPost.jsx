import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const modules = {
	toolbar: [
		[{ header: [1, 2, false] }],
		["bold", "italic", "underline", "strike", "blockquote"],
		[
			{ list: "ordered" },
			{ list: "bullet" },
			{ indent: "-1" },
			{ indent: "+1" },
		],
		["link"],
		["clean"],
	],
};

function EditPost() {
	const [title, setTitle] = useState("");
	const [summary, setSummary] = useState("");
	const [content, setContent] = useState("");
	const [image, setImage] = useState("");
	const [redirect, setRedirect] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		fetch(`http://localhost:4000/posts/getpost/${id}`).then((response) => {
			response.json().then((postInfo) => {
				setTitle(postInfo.title);
				setSummary(postInfo.summary);
				setContent(postInfo.content);
			});
		});
	}, []);

	const handleTitleChange = (event) => {
		const value = event.target.value;
		// Restricting title to, for example, 50 characters
		if (value.length <= 45) {
			setTitle(value);
		}
	};

	const handleSummaryChange = (event) => {
		const value = event.target.value;
		// Restricting summary to, for example, 200 characters
		if (value.length <= 420) {
			setSummary(value);
		}
	};
	if (redirect) {
		return <Navigate to={`/posts/${id}`} />;
	}
	async function editPost(event) {
		event.preventDefault();
		const data = new FormData();
		data.set("title", title);
		data.set("summary", summary);
		data.set("content", content);
		data.set("postId", id);
		if (image?.[0]) {
			data.set("image", image?.[0]);
		}

		await fetch(`http://localhost:4000/posts/editpost/`, {
			method: "PUT",
			body: data,
			credentials: "include",
		}).then((response) => {
			if (response.ok) {
				alert("Post edited successfully");
				setRedirect(true);
			}
		});
	}

	return (
		<div className="mt-20 mx-auto max-w-4xl h-fit justify-center font-secondary p-5">
			<h2 className="font-primary font-extrabold text-3xl my-3">Edit Post</h2>
			<form onSubmit={editPost}>
				<input
					type="text"
					placeholder="Enter Title"
					value={title}
					onChange={handleTitleChange}
					className="w-full p-2 my-2 rounded-lg"
				/>
				<p className="text-xs pb-2 pl-2">
					Characters in Title: <strong>{title.length}/45</strong>
				</p>
				<textarea
					type="text"
					placeholder="Enter Summary"
					value={summary}
					onChange={handleSummaryChange}
					className="w-full mt-2 p-2 rounded-lg"
				/>
				<p className="text-xs pb-2 pl-2">
					Characters in Summary: <strong>{summary.length}/420</strong>
				</p>
				<input
					type="file"
					accept="image/png, image/jpeg, image/jpg, image/webp"
					onChange={(e) => setImage(e.target.files)}
					className="w-full p-2 bg-white rounded-lg my-2"
				/>
				<ReactQuill
					className="w-full my-2 bg-white font-secondary"
					value={content}
					onChange={(value) => setContent(value)}
					modules={modules}
					theme="snow"
				/>
				<button className="w-full bg-dark_accent mt-3 p-2 text-light hover:border border-black hover:bg-transparent hover:text-darkest_accent transition-colors">
					Update Post
				</button>
			</form>
		</div>
	);
}

export default EditPost;
