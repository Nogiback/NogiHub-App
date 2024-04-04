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
  addToFollowing,
  removeFromFollowing,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", verifyUser, getAllUsers);
router.get("/:userID", verifyUser, getUser);
router.get("/:userID/followers", verifyUser, getFollowers);
router.get("/:userID/following", verifyUser, getFollowing);
router.get("/:userID/likes", verifyUser, getLikedPosts);
router.get("/:userID/posts", verifyUser, getUserPosts);

router.patch("/:userID/update", verifyUser, updateUser);
router.patch("/add/:followID", verifyUser, addToFollowing);
router.patch("/remove/:followID", verifyUser, removeFromFollowing);

export default router;
