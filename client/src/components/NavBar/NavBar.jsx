import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
	return (
		<nav className="flex justify-between p-4 bg-darkest_accent h-20 items-center fixed w-full">
			<Link to="/" className="font-bold text-2xl text-white">LOGO</Link>
			<div className="flex gap-8 text-white">
				<Link to="/">Home</Link>
				<Link to="/post">New Post</Link>
				<Link to="/login">Login</Link>
			</div>
		</nav>
	);
}

export default NavBar;
