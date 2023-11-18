import React, { useEffect, useState } from "react";
import Post from "../components/Post/Post";

function IndexPage() {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		fetch("http://localhost:4000/posts/getposts", {
			method: "GET",
		}).then((response) => {
			response.json().then((posts) => {
				setPosts(posts);
			});
		});
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			{posts.length > 0 &&
				posts.map((post, index) => <Post key={index} {...post} />)}
		</div>
	);
}

export default IndexPage;
