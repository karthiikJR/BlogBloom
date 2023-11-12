import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { UserRouter } from "./routes/users.js";
import { PostRouter } from "./routes/posts.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

/* 
In Node.js, __filename and __dirname are global variables that provide the current module file's absolute path and the directory path, respectively. However, these variables are not available when using ES modules (import/export syntax).
The code you provided is a workaround for this. It uses the import.meta.url property, which is available in ES modules and gives the URL of the current module file.
fileURLToPath(import.meta.url) converts this URL into a file path, which is equivalent to __filename in CommonJS.
dirname(__filename) gets the directory path from the file path, which is equivalent to __dirname in CommonJS.
So, this code is essentially providing the functionality of __filename and __dirname for ES modules.
*/
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

const app = express();

// Have to set credentials to true and origin to the frontend url because we have credentials: "include" in the frontend
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use("/auth", UserRouter);
app.use("/posts", PostRouter);

const PORT = process.env.PORT || 8080;
const connect = process.env.MONGODB_URI;

const startServer = async () => {
	try {
		mongoose.connect(connect);
		app.listen(PORT, () => {
			console.log(`Server listening ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

startServer();
