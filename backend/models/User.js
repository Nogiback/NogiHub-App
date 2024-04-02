import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    displayName: {
      type: String,
      default: function () {
        return this.username;
      },
    },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    location: { type: String, default: "" },
    profilePic: { type: String, default: "" },
    bio: { type: String, default: "" },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  // createdAt, updatedAt
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
