import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import Post from "../models/Post.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const currentUser = req.user._id;
  const allUsers = await User.find({ _id: { $ne: currentUser } })
    .select("-password")
    .sort({ username: 1 })
    .exec();

  if (!allUsers) {
    res.status(401).json({ message: "Error: No users found." });
    return;
  }

  res.status(200).json(allUsers);
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userID).exec();

  if (!user) {
    res.status(404).json({ message: "Error: No user found." });
    return;
  }

  res.status(200).json(user);
});

export const getFollowers = asyncHandler(async (req, res, next) => {
  const followers = await User.findById(req.params.userID)
    .select("followers")
    .populate("followers")
    .exec();

  if (!followers) {
    res.status(404).json({ message: "Error: No user found." });
    return;
  }

  res.status(200).json(followers);
});

export const getFollowing = asyncHandler(async (req, res, next) => {
  res.send("getFollowing NOT YET IMPLEMENTED");
});

export const getLikedPosts = asyncHandler(async (req, res, next) => {
  res.send("getLikedPosts NOT YET IMPLEMENTED");
});

export const getUserPosts = asyncHandler(async (req, res, next) => {
  res.send("getUserPosts NOT YET IMPLEMENTED");
});

export const updateUser = asyncHandler(async (req, res, next) => {
  res.send("updateUser NOT YET IMPLEMENTED");
});
