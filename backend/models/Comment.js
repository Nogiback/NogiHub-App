import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  // createdAt, updatedAt
  { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
