import mongoose, { Schema } from "mongoose";

const PostSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  // createdAt, updatedAt
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
