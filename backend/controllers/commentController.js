import asyncHandler from "express-async-handler";
import Comment from "../models/Comment.js";

// GET ALL COMMENTS

export const getAllComments = asyncHandler(async (req, res, next) => {
  const allComments = await Comment.find()
    .sort({ createdAt: -1 })
    .populate({ path: "author", select: "displayName username" })
    .exec();

  if (!allComments) {
    res.status(404).json({ message: "Error: No comments found." });
    return;
  }

  res.status(200).json(allComments);
});

// GET SINGLE COMMENT

export const getComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.commentID).exec();

  if (!comment) {
    res.status(404).json({ message: "Error: No comment found." });
    return;
  }

  res.status(200).json(comment);
});
