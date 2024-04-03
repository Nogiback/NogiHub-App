import express from "express";
import verifyUser from "../middlewares/verifyUser.js";
import {
  getAllUsers,
  getUser,
  getFollowers,
  getFollowing,
  getLikedPosts,
  getUserPosts,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", verifyUser, getAllUsers);
router.get("/:userID", verifyUser, getUser);
router.get("/:userID/followers", verifyUser, getFollowers);
router.get("/:userID/following", verifyUser, getFollowing);
router.get("/:userID/likes", verifyUser, getLikedPosts);
router.get("/:userID/posts", verifyUser, getUserPosts);
router.put("/:userID/update", verifyUser, updateUser);

export default router;
