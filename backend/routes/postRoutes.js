import express from "express";
import verifyUser from "../middlewares/verifyUser.js";
import {
  getAllPosts,
  getFollowingPosts,
  getPost,
  getPostComments,
  createPost,
  createComment,
  deletePost,
  deleteComment,
  addLikeToPost,
  removeLikeFromPost,
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", verifyUser, getAllPosts);
router.get("/following", verifyUser, getFollowingPosts);
router.get("/:postID", verifyUser, getPost);
router.get("/:postID/comments", verifyUser, getPostComments);

router.post("/post", verifyUser, createPost);
router.post("/:postID/comment", verifyUser, createComment);

router.delete("/:postID/delete", verifyUser, deletePost);
router.delete("/:postID/comments/:commentID/delete", verifyUser, deleteComment);

router.patch("/:postID/like", verifyUser, addLikeToPost);
router.patch("/:postID/unlike", verifyUser, removeLikeFromPost);

export default router;
