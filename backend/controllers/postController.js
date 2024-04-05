import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import Post from "../models/Post.js";

// GET ALL POSTS

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find()
    .sort({ createdAt: -1 })
    .populate({ path: "author", select: "displayName username" })
    .exec();

  if (!allPosts) {
    res.status(404).json({ message: "Error: No posts found." });
    return;
  }

  res.status(200).json(allPosts);
});

// GET ONLY USER'S FOLLOWING POSTS

export const getFollowingPosts = asyncHandler(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id).exec();
  const followingPosts = await Post.find({
    author: { $in: currentUser.following },
  }).exec();

  if (!followingPosts) {
    res.status(404).json({ message: "Error: No posts found." });
    return;
  }

  res.status(200).json(followingPosts);
});

// GET SINGLE POST

export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postID).exec();

  if (!post) {
    res.status(404).json({ message: "Error: No post found." });
    return;
  }

  res.status(200).json(post);
});

// GET POST COMMENTS

export const getPostComments = asyncHandler(async (req, res, next) => {
  const comments = await Post.findById(req.params.postID)
    .select("comments")
    .exec();

  if (!comments) {
    res.status(404).json({ message: "Error: No post found." });
    return;
  }

  res.status(200).json(comments);
});

// CREATE POST

export const createPost = [
  body("content", "Content cannot be empty.")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("image").trim().optional(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        message: "Error: Create post failure.",
      });
      return;
    }
    const content = req.body.content;
    const author = req.user._id;
    const image = req.body.image ? req.body.image : "";

    const newPost = new Post({
      author,
      content,
      image,
    });

    await newPost.save();
    res.status(200).json(newPost);
  }),
];

export const createComment = asyncHandler(async (req, res, next) => {
  res.send("createComment NOT YET IMPLEMENTED");
});

export const deletePost = asyncHandler(async (req, res, next) => {
  res.send("deletePost NOT YET IMPLEMENTED");
});

export const deleteComment = asyncHandler(async (req, res, next) => {
  res.send("deleteComment NOT YET IMPLEMENTED");
});

export const addLikeToPost = asyncHandler(async (req, res, next) => {
  res.send("addLikeToPost NOT YET IMPLEMENTED");
});

export const removeLikeFromPost = asyncHandler(async (req, res, next) => {
  res.send("removeLikeFromPost NOT YET IMPLEMENTED");
});
