import Jwt from "jsonwebtoken";
import express from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/Users.js";
import PostModel from "../models/Post.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
import fs from "fs";

// Configure dotenv to use environment variables
dotenv.config();

// Create a new multer instance with the desired storage location to save the image locally
const uploadMiddleware = multer({ dest: "uploads/" });

// Extract environment variables
const SALT = process.env.SALT;
const JWT_SECRET = process.env.JWT_SECRET;

// Create a new router
const router = express.Router();
router.use(cookieParser());

// Create a new post and save it to the database. Added uploadMiddleware to handle file uploads
router.post("/create", uploadMiddleware.single("image"), async (req, res) => {
	const { originalname, path } = req.file;
	const { title, summary, content } = req.body;
	const { Session_cookie } = req.cookies;

	// Since the files are saved as binary data, we need to convert them to their respective file formats
	const ext = originalname.split(".").pop();
	const newPath = path + "." + ext;

	// Rename the file to its original extension file
	fs.renameSync(path, newPath);

	Jwt.verify(Session_cookie, JWT_SECRET, async (err, decoded) => {
		if (err) throw err;
		const post = await PostModel.create({
			title,
			summary,
			content,
			coverImgPath: newPath,
			author: decoded.id,
		});

		res.json(post).status(201);
	});

	// Create a new post and save it to the database
});

// Get all posts from the database
router.get("/getposts", async (req, res) => {
	// .populate() is used to populate the author field with the username of the author from
	// User schema since we have given the reference to the User schema in the Post schema
	const posts = await PostModel.find({})
		.populate("author", ["username"])
		.sort({ createdAt: -1 })
		.limit(20);
	res.json(posts).status(200);
});

// Get a single post from the database
router.get("/getpost/:id", async (req, res) => {
	const { id } = req.params;
	const post = await PostModel.findById(id).populate("author", ["username"]);
	res.json(post).status(200);
});

export { router as PostRouter };
