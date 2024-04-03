import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

import connectToMongoDB from "./database/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
