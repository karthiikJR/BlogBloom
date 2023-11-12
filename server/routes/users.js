import Jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/Users.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Configure dotenv to use environment variables
dotenv.config();

// Extract environment variables
const SALT = process.env.SALT;
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new router
const router = express.Router();
router.use(cookieParser());

router.post("/register", async (req, res) => {
	// Extract email and password from request body
	const { username, email, password } = req.body;

	// Check if user already exists
	const user = await UserModel.findOne({ email });

	// If user exists, return status 409(Conflict status code) and message that user already exists
	if (user) return res.status(409).json({ message: "User already exists" });

	// If user does not exist, hash the password
	const hashedPassword = await bcrypt.hash(password, Number(SALT));

	// Create a new user with email and hashed password
	const newUser = new UserModel({
		email: email,
		password: hashedPassword,
		username: username,
	});

	// Save the user to the database
	newUser.save();

	// Return status 201(Created status code) and message that user was created
	return res.status(201).json({ message: "User created" });
});

router.post("/login", async (req, res) => {
	// Extract email and password from request body
	const { email, password } = req.body;

	// Check if user exists
	const user = await UserModel.findOne({ email: email });

	// If user does not exist, return status 401(Unauthorized status code) and message that user was not found
	if (!user) return res.status(401).json({ message: "User not found" });

	// If user exists, check if password is correct using bcrypt compare function
	const checkPassword = await bcrypt.compare(password, user.password);

	// If password is incorrect, return status 401(Unauthorized status code) and message that password is incorrect
	if (!checkPassword)
		return res.status(401).json({ message: "Incorrect password" });

	// If password is correct, create a new JWT token where there is not expiration date so {} as third argument
	Jwt.sign({ email,username:user.username, id: user._id }, JWT_SECRET, {}, (error, token) => {
		// If there is an error, return status 500(Internal server error status code) and message that there was an internal server error
		if (error)
			return res.status(500).json({ message: "Internal server error" });

		// If there is no error, send the token as a cookie
		return res
			.cookie("Session_cookie", token)
			.status(200)
			.json({ message: "Logged in", userId: user._id, email,username:user.username });
	});
});

router.get('/profile', (req,res) => {
  const {Session_cookie} = req.cookies;
  if(Session_cookie) {
	Jwt.verify(Session_cookie, JWT_SECRET, {}, (err, info) => {
		if (err) throw err;
		res.json(info);
	});
  }
});

router.post('/logout', (req, res) => {
	res.cookie('Session_cookie', '',).json({ message: "Logged out" });
});

export { router as UserRouter };


/*
router.get("/profile", async (req, res) => {
	// res.json(req.cookies);
	const { Session_cookie } = req.cookies;

	Jwt.verify(Session_cookie, JWT_SECRET, {}, (error, decoded) => {
		if (error) {
			res.status(401).json({ message: "Unauthorized" });
			return;
		}

		return res.status(200).json(decoded);
	});

});

Here's a breakdown of what happens in the above snippet:

The Jwt.verify function is asynchronous and takes some time to execute.
While Jwt.verify is running, the code continues to execute, and it reaches the return res.status(200).json(decoded); line.
The return res.status(200).json(decoded); line is executed before the Jwt.verify callback is called, resulting in the 401 response being overridden by the 200 response.


In the actual code snippet, you are using throw error; instead of sending a response inside the Jwt.verify callback. When you throw an error, it will stop the execution 
of the current function, preventing the subsequent return res.status(200).json(decoded); from being executed. This ensures that only one response is sent based on whether 
there was an error or not.

*/