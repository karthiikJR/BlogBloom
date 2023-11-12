import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
	{
		title: String,
		summary: String,
		content: String,
		coverImgPath: String,
		author: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
	},
	{
		timestamps: true,
	}
);

const PostModel = mongoose.model("Posts", PostSchema);

export default PostModel;
