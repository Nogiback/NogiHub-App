import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import Post from "../models/Post.js";

// GET ALL USERS EXCEPT CURRENT USER

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const currentUserID = req.user._id;
  let allUsers;

  if (req.query.query === "") {
    allUsers = await User.find({ _id: { $ne: currentUserID } })
      .select("-password")
      .sort({ username: 1 })
      .exec();
  } else {
    allUsers = await User.find({
      _id: { $ne: currentUserID },
      username: { $regex: String(req.query.query), $options: "i" },
    })
      .select("-password")
      .sort({ username: 1 })
      .exec();
  }

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
      select: "-password",
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
      select: "-password",
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
  const skip =
    req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;
  const user = await User.findOne({ username: req.params.username }).exec();

  if (!user) {
    res.status(404).json({ message: "Error: No user found." });
    return;
  }

  const totalLikes = (await Post.find({ likes: { $in: user._id } })).length;
  const likedPosts = await Post.find({ likes: { $in: user._id } }, undefined, {
    skip,
    limit: 5,
  })
    .populate({
      path: "author",
      select: "username displayName profilePic",
    })
    .sort({ createdAt: -1 })
    .exec();

  res.status(200).json({ likedPosts, totalLikes });
});

// GET USER'S POSTS

export const getUserPosts = asyncHandler(async (req, res, next) => {
  const skip =
    req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;
  const user = await User.findOne({ username: req.params.username }).exec();

  if (!user) {
    res.status(404).json({ message: "Error: No user found." });
    return;
  }

  const totalUserPosts = (await Post.find({ author: user._id })).length;
  const userPosts = await Post.find({ author: user._id }, undefined, {
    skip,
    limit: 5,
  })
    .populate({
      path: "author",
      select: "username displayName profilePic",
    })
    .sort({ createdAt: -1 })
    .exec();

  res.status(200).json({ userPosts, totalUserPosts });
});

// UPDATE USER'S PROFILE

export const updateUser = [
  body("displayName").trim().escape().optional(),
  body("bio").trim().optional(),
  body("profilePic").trim().optional(),
  body("location").trim().escape().optional(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        message: "Error: User profile update failure.",
      });
      return;
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "Error: User not found." });
      return;
    }

    const displayName = req.body.displayName
      ? req.body.displayName
      : user.displayName;
    const bio = req.body.bio;
    const location = req.body.location;
    const profilePic = req.body.profilePic
      ? req.body.profilePic
      : user.profilePic;

    const updatedUserDetails = {
      _id: user._id,
      displayName,
      bio,
      profilePic,
      location,
    };

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      updatedUserDetails,
      { new: true }
    );

    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      displayName: updatedUser.displayName,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      location: updatedUser.location,
      bio: updatedUser.bio,
      message: "User successfully updated.",
    });
  }),
];

// ADD TO USER'S FOLLOWING

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
