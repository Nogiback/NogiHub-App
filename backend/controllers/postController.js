import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

// GET ALL POSTS

export const getAllPosts = asyncHandler(async (req, res, next) => {
  const skip =
    req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

  const totalPosts = (await Post.find({})).length;
  const allPosts = await Post.find({}, undefined, { skip, limit: 5 })
    .sort({ createdAt: -1 })
    .populate({ path: "author", select: "displayName username profilePic" })
    .exec();

  if (!allPosts) {
    res.status(404).json({ message: "Error: No posts found." });
    return;
  }

  res.status(200).json({ allPosts, totalPosts });
});

// GET ONLY USER'S FOLLOWING POSTS

export const getFollowingPosts = asyncHandler(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id).exec();
  const skip =
    req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;
  const totalFollowingPosts = (
    await Post.find({
      author: { $in: currentUser.following },
    })
  ).length;
  const followingPosts = await Post.find(
    {
      author: { $in: currentUser.following },
    },
    undefined,
    { skip, limit: 5 }
  )
    .populate({ path: "author", select: "displayName username profilePic" })
    .sort({ createdAt: -1 })
    .exec();

  if (!followingPosts) {
    res.status(404).json({ message: "Error: No posts found." });
    return;
  }

  res.status(200).json({ followingPosts, totalFollowingPosts });
});

// GET SINGLE POST

export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.postID)
    .populate({ path: "author", select: "displayName username profilePic" })
    .populate({
      path: "comments",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "author",
        model: "User",
        select: "displayName username profilePic",
      },
    })
    .exec();

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
  body("content", "Content cannot be empty.").trim().isLength({ min: 1 }),
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

// CREATE COMMENT

export const createComment = [
  body("content", "Content cannot be empty.").trim().isLength({ min: 1 }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({
        errors: errors.array(),
        message: "Error: Create comment failure.",
      });
      return;
    }
    const content = req.body.content;
    const author = req.user._id;

    const newComment = new Comment({
      author,
      content,
    });

    await newComment.save();
    await Post.findByIdAndUpdate(req.params.postID, {
      $push: { comments: newComment },
    });
    res.status(200).json(newComment);
  }),
];

// DELETE POST

export const deletePost = asyncHandler(async (req, res, next) => {
  const postToDelete = await Post.findById(req.params.postID).exec();
  const currentUserID = req.user._id;
  const isAuthorized = postToDelete.author.equals(currentUserID);

  if (!postToDelete) {
    res.status(404).json({ message: "Error: No post found." });
    return;
  }

  if (!isAuthorized) {
    res.status(403).json({ message: "Error: Not authorized." });
    return;
  }

  if (postToDelete.comments.length === 0) {
    await Post.findByIdAndDelete(req.params.postID);
    res.status(200).json({ message: "Post successfully deleted." });
    return;
  }

  postToDelete.comments.forEach(async (comment) => {
    const commentToDelete = await Comment.findById(comment);
    await Comment.findByIdAndDelete(commentToDelete._id);
  });

  await Post.findByIdAndDelete(req.params.postID);
  res.status(200).json({ message: "Post successfully deleted." });
});

// DELETE COMMENT

export const deleteComment = asyncHandler(async (req, res, next) => {
  const commentToDelete = await Comment.findById(req.params.commentID).exec();
  const currentUserID = req.user._id;
  const isAuthorized = commentToDelete.author.equals(currentUserID);

  if (!commentToDelete) {
    res.status(404).json({ message: "Error: No comment found." });
    return;
  }

  if (!isAuthorized) {
    res.status(403).json({ message: "Error: Not authorized." });
    return;
  }

  await Post.findByIdAndUpdate(req.params.postID, {
    $pullAll: { comments: [commentToDelete] },
  });

  await Comment.findByIdAndDelete(req.params.commentID);
  res.status(200).json({ message: "Comment successfully deleted." });
});

// ADD LIKE TO POST

export const addLikeToPost = asyncHandler(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id).exec();
  const likedPost = await Post.findById(req.params.postID).exec();

  if (!currentUser) {
    res.status(404).json({ message: "Error: No current user found." });
    return;
  }

  if (!likedPost) {
    res.status(404).json({ message: "Error: No post found." });
    return;
  }

  await Post.findByIdAndUpdate(req.params.postID, {
    $push: { likes: currentUser },
  });
  res.status(200).json({ message: "User successfully liked post." });
});

// REMOVE LIKE FROM POST

export const removeLikeFromPost = asyncHandler(async (req, res, next) => {
  const currentUser = await User.findById(req.user._id).exec();
  const unlikedPost = await Post.findById(req.params.postID).exec();

  if (!currentUser) {
    res.status(404).json({ message: "Error: No current user found." });
    return;
  }

  if (!unlikedPost) {
    res.status(404).json({ message: "Error: No post found." });
    return;
  }

  await Post.findByIdAndUpdate(req.params.postID, {
    $pullAll: { likes: [currentUser] },
  });
  res.status(200).json({ message: "User successfully unliked post." });
});
