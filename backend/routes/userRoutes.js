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
router.get("/:username", verifyUser, getUser);
router.get("/:username/followers", verifyUser, getFollowers);
router.get("/:username/following", verifyUser, getFollowing);
router.get("/:username/likes", verifyUser, getLikedPosts);
router.get("/:username/posts", verifyUser, getUserPosts);

router.patch("/update", verifyUser, updateUser);
router.patch("/add/:followID", verifyUser, addToFollowing);
router.patch("/remove/:followID", verifyUser, removeFromFollowing);

export default router;
