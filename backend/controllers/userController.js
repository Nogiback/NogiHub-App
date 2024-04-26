import asyncHandler from "express-async-handler";
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
  const user = await User.findOne({ username: req.params.username })
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
  const followers = await User.findOne({ username: req.params.username })
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
  const following = await User.findOne({ username: req.params.username })
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
  const user = await User.findOne({ username: req.params.username }).exec();

  if (!user) {
    res.status(404).json({ message: "Error: No user found." });
    return;
  }

  const likedPosts = await Post.find({ likes: { $in: user._id } }).exec();

  res.status(200).json(likedPosts);
});

// GET USER'S POSTS

export const getUserPosts = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ username: req.params.username }).exec();

  if (!user) {
    res.status(404).json({ message: "Error: No user found." });
    return;
  }

  const userPosts = await Post.find({ author: user._id })
    .sort({ createdAt: -1 })
    .exec();

  res.status(200).json(userPosts);
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
