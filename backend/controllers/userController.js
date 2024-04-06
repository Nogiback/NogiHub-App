import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import Post from "../models/Post.js";

// GET ALL USERS EXCEPT CURRENT USER

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const currentUserID = req.user._id;
  const allUsers = await User.find({ _id: { $ne: currentUserID } })
    .select("-password")
    .sort({ username: 1 })
    .exec();

  if (!allUsers) {
    res.status(401).json({ message: "Error: No users found." });
    return;
  }

  res.status(200).json(allUsers);
});

// GET SINGLE USER

export const getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.userID)
    .select("-password")
    .exec();

  if (!user) {
    res.status(404).json({ message: "Error: No user found." });
    return;
  }

  res.status(200).json(user);
});

// GET USER'S FOLLOWERS

export const getFollowers = asyncHandler(async (req, res, next) => {
  const followers = await User.findById(req.params.userID)
    .select("followers")
    .populate({
      path: "followers",
      select: "username displayName email profilePic",
    })
    .exec();

  if (!followers) {
    res.status(404).json({ message: "Error: No followers found." });
    return;
  }

  res.status(200).json(followers);
});

// GET USER'S FOLLOWING LIST

export const getFollowing = asyncHandler(async (req, res, next) => {
  const following = await User.findById(req.params.userID)
    .select("following")
    .populate({
      path: "following",
      select: "username displayName email profilePic",
    })
    .exec();

  if (!following) {
    res.status(404).json({ message: "Error: No following users found." });
    return;
  }

  res.status(200).json(following);
});

// GET USER'S LIKED POSTS

export const getLikedPosts = asyncHandler(async (req, res, next) => {
  res.send("getLikedPosts NOT YET IMPLEMENTED");
});

// GET USER'S POSTS

export const getUserPosts = asyncHandler(async (req, res, next) => {
  res.send("getUserPosts NOT YET IMPLEMENTED");
});

// UPDATE USER'S PROFILE

export const updateUser = asyncHandler(async (req, res, next) => {
  res.send("updateUser NOT YET IMPLEMENTED");
});

// ADD TO USER's FOLLOWING

export const addToFollowing = asyncHandler(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id).exec();
  const followingUser = await User.findById(req.params.followID).exec();

  if (!followingUser || !currentUser) {
    res.status(404).json({ message: "Error: No users found." });
    return;
  }

  await User.findByIdAndUpdate(currentUser._id, {
    $push: { following: followingUser },
  });

  await User.findByIdAndUpdate(followingUser._id, {
    $push: { followers: currentUser },
  });

  res.status(200).json({ message: "User successfully followed." });
});

// REMOVE FROM USER'S FOLLOWING

export const removeFromFollowing = asyncHandler(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id).exec();
  const unfollowingUser = await User.findById(req.params.followID).exec();

  if (!unfollowingUser || !currentUser) {
    res.status(404).json({ message: "Error: No users found." });
    return;
  }

  await User.findByIdAndUpdate(currentUser._id, {
    $pullAll: { following: [unfollowingUser] },
  });

  await User.findByIdAndUpdate(unfollowingUser._id, {
    $pullAll: { followers: [currentUser] },
  });

  res.status(200).json({ message: "User successfully unfollowed." });
});
