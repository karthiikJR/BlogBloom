import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../helpers/context/UserContext";
import { useParams } from "react-router-dom";
import { renderProperDate } from "../helpers/context/utils";
import "../App.css";
import { Link } from "react-router-dom";

function PostPage() {
	const { id } = useParams();
	const [postInfo, setPostInfo] = useState(null);
	const { userInfo } = useContext(UserContext);
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
			{userInfo && userInfo.id === postInfo.author._id && (
				<div className="flex font-secondary justify-center items-center my-4 sm:my-8">
					<Link
						to={`/editpost/${postInfo._id}`}
						className="font-primary flex gap-3 rounded-md bg-dark_accent font-bold text-light py-2 px-5"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
							/>
						</svg>
						Edit Post
					</Link>
				</div>
			)}
			<img
				src={"http://localhost:4000/" + postInfo.coverImgPath}
				alt="Post image"
				className="w-full"
			/>
			<div className="flex justify-between sm:flex-row flex-col">
				<p className="italic my-4 sm:my-8">
					Edited at:
					<time>
						{" " + renderProperDate({ createdAt: postInfo.updatedAt })}
					</time>
				</p>
				<p className="italic sm:my-8">
					Author: <strong>{postInfo.author.username}</strong>
				</p>
			</div>
			<div className="postContent">
				<p className="sm:my-8 my-4">{postInfo.summary}</p>
				<div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
			</div>
			<p className="italic my-8">
				Published at:
				<time>{" " + renderProperDate({ createdAt: postInfo.createdAt })}</time>
			</p>
		</div>
	);
}

export default PostPage;
