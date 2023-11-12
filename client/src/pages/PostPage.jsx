import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { renderProperDate } from "../helpers/context/utils";
import "../App.css";

function PostPage() {
	const { id } = useParams();
	const [postInfo, setPostInfo] = useState(null);
	useEffect(() => {
		fetch(`http://localhost:4000/posts/getpost/${id}`).then((response) => {
			response.json().then((post) => {
				setPostInfo(post);
			});
		});
	}, []);

	if (!postInfo)
		return (
			<div className="text-7xl text-center h-full flex justify-center items-center">
				Loading...
			</div>
		);

	return (
		<div className="max-w-5xl font-secondary mx-auto p-5  text-darkest_accent">
			<h1 className="my-8 sm:text-5xl text-3xl text-center font-extrabold font-primary">
				{postInfo.title}
			</h1>
			<img
				src={"http://localhost:4000/" + postInfo.coverImgPath}
				alt="Post image"
				className="w-full"
			/>
			<div className="flex justify-between">
				<p className="italic my-8">
					{postInfo.createdAt === postInfo.updatedAt
						? "Published: "
						: "Edited: "}{" "}
					<time>{renderProperDate({ createdAt: postInfo.updatedAt })}</time>
				</p>
				<p className="italic my-8">
					Author: <strong>{postInfo.author.username}</strong>
				</p>
			</div>
			<div className="postContent">
				<p className="my-8">{postInfo.summary}</p>
				<div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
			</div>
		</div>
	);
}

export default PostPage;
