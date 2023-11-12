import React from "react";
import { Link } from "react-router-dom";
import { renderProperDate } from "../../helpers/context/utils";

function Posts({
	_id,
	title,
	summary,
	content,
	author,
	createdAt,
	coverImgPath,
}) {
	return (
		<section className="bg-white h-full max-w-[800px] p-5 font-secondary m-5">
			<h3 className="font-primary font-extrabold text-3xl my-8 text-dark_accent">
				{title}
			</h3>
			<img
				className="object-contain w-full"
				src={"http://localhost:4000/" + coverImgPath}
				alt="Post image"
			/>
			<div className="py-5 flex items-center justify-between">
				<time className="text-xs">{renderProperDate({ createdAt })}</time>
				<a className="text-xs px-1 font-extrabold text-[#333]">
					{author.username}
				</a>
			</div>
			<p className="text-[16px] mb-4">{summary}</p>
			<Link
				to={`/posts/${_id}`}
				className="font-primary font-bold text-dark_accent"
			>
				Read more
			</Link>
		</section>
	);
}

export default Posts;
