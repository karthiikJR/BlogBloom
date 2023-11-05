import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { UserRouter } from "./routes/users.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// Have to set credentials to true and origin to the frontend url because we have credentials: "include" in the frontend
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/auth", UserRouter);

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
