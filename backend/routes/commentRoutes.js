import express from "express";
import verifyUser from "../middlewares/verifyUser.js";
import {
  getAllComments,
  getComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.get("/", verifyUser, getAllComments);
router.get("/:commentID", verifyUser, getComment);

export default router;
