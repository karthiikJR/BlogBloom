import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../helpers/context/UserContext";

function NavBar() {
	const { userInfo, setUserInfo } = useContext(UserContext);
	const navItems = [
		{
			name: "Home",
			link: "/",
			state: "all",
		},
		{
			name: "Register",
			link: "/register",
			state: "signedOut",
		},
		{
			name: "Login",
			link: "/login",
			state: "signedOut",
		},
		{
			name: "Create a new post",
			link: "/create",
			state: "signedIn",
		},
	];

	function renderNavSignedIn() {
		return navItems.map((item, index) => {
			return (
				(item.state === "signedIn" || item.state === "all") && (
					<Link
						key={index}
						to={item.link}
						className="hover:text-ascent transition-all duration-300"
					>
						{item.name}
					</Link>
				)
			);
		});
	}

	function renderNavSignIn() {
		return navItems.map((item, index) => {
			return (
				(item.state === "signedOut" || item.state === "all") && (
					<Link
						key={index}
						to={item.link}
						className="hover:text-ascent transition-all duration-300"
					>
						{item.name}
					</Link>
				)
			);
		});
	}

	function logout() {
		fetch("http://localhost:4000/auth/logout", {
			method: "POST",
			credentials: "include",
		});
		setUserInfo(null);
	}

	async function checkUser() {
		const res = await fetch("http://localhost:4000/auth/profile", {
			credentials: "include",
		});

		if (res.ok) {
			console.log("ok");
			res.json().then((data) => {
				setUserInfo(data);
			});
		}
	}

	useEffect(() => {
		checkUser();
	}, []);

	const email = userInfo?.email;
	console.log(email);

	return (
		<nav className="flex justify-between sm:px-10 px-3 font-secondary bg-darkest_accent h-20 items-center w-full">
			<Link to="/" className="font-extrabold text-2xl text-white font-primary">
				LOGO
			</Link>
			<div className="flex sm:gap-12 gap-4 text-white">
				{email === undefined ? renderNavSignIn() : renderNavSignedIn()}
				{email !== undefined && (
					<a
						className="hover:text-ascent transition-all duration-300 cursor-pointer"
						onClick={logout}
					>
						Logout
					</a>
				)}
			</div>
		</nav>
	);
}

export default NavBar;
