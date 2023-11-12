import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../../helpers/context/UserContext";

function Form({ formType }) {
	const [passwordShown, setPasswordShown] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [username, setUsername] = useState("");
	const [redirect, setRedirect] = useState(false);
	const { setUserInfo } = useContext(UserContext);

	async function onRegister(event) {
		event.preventDefault();

		// Check if the email and password fields are empty
		if (!email || !password) {
			alert("Please enter email and password");
			return;
		}

		// Send a POST request to the server
		const response = await fetch(`http://localhost:4000/auth/register`, {
			method: "POST",
			body: JSON.stringify({ email, password,username }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		// Extract the JSON body content from the response
		const responseData = await response.json();

		if (response.ok) {
			// Check if the response is successful
			console.log("User registered successfully");
			alert("User registered successfully");
			setRedirect(true);
		} else {
			// Display the error message from the server
			console.log(responseData.message);
		}
	}

	async function onLogin(event) {
		event.preventDefault();
		console.log("login");

		// Check if the email and password fields are empty
		if (!email || !password) {
			alert("Please enter email and password");
			return;
		}

		// The credentials option in a Fetch API request configures how the browser handles cookies and authentication in the context of cross-origin requests.
		const response = await fetch("http://localhost:4000/auth/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
			credentials: "include",
		});

		console.log(response);

		// Check if the response is successful
		if (response.status === 200) {
			response.json().then((userInfo) => {
				console.log(userInfo);
				alert("User logged in successfully");
				setRedirect(true);
				setUserInfo(userInfo);
			});
		} else {
			alert("Invalid credentials");
		}
	}

	const route = formType === "Login" ? "/register" : "/login";

	// Redirect to the home page if the user is already logged in
	if (redirect) {
		return <Navigate to={"/"} />;
	}

	return (
		<form
			className="font-secondary h-96 w-80 flex flex-col gap-6 p-5 items-center justify-center"
			onSubmit={formType === "Login" ? onLogin : onRegister}
		>
			<h1 className="font-bold text-3xl font-primary">{formType}</h1>
			{formType === "Register" && (
				<div className="flex items-center w-full">
					<i className="fa-solid fa-user fa-sm absolute ml-4"></i>
					<input
						type="text"
						name="Username"
						placeholder="Enter your username"
						className="w-full text-center h-10 rounded-full bg-slate-100"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</div>
			)}
			<div className="flex items-center w-full">
				<i className="fa-solid fa-envelope fa-sm absolute ml-4"></i>
				<input
					type="email"
					name="Name"
					placeholder="Enter your email"
					className="w-full text-center h-10 rounded-full bg-slate-100"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<div className="flex items-center w-full relative">
				<i className="fa-solid fa-lock fa-sm absolute ml-4"></i>
				<input
					type={passwordShown ? "text" : "password"}
					name="Password"
					placeholder="Enter your password"
					className="w-full text-center h-10 rounded-full bg-slate-100"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{passwordShown ? (
					<i
						className="fa-solid fa-eye-slash fa-sm absolute right-4 cursor-pointer"
						onClick={() => setPasswordShown((prev) => !prev)}
					></i>
				) : (
					<i
						className="fa-solid fa-eye fa-sm absolute right-4 cursor-pointer"
						onClick={() => setPasswordShown((prev) => !prev)}
					></i>
				)}
			</div>
			<p className="text-gray-400">
				Click here to{" "}
				<Link to={route} className="text-blue-600">
					{formType === "Login" ? "Register" : "Login"}
				</Link>
			</p>
			<button className="bg-ascent h-10 w-28 rounded-full font-bold text-white border-black hover:bg-transparent hover:border transition-all hover:text-black">
				{formType}
			</button>
		</form>
	);
}

export default Form;
