import express from "express";

import {
  allPosts,
  getPost,
  addPost,
  deletePost,
  updatePost,
} from "../controllers/postController.js";

import { upload } from "../middlewares/uploadImage.js";

const router = express.Router();

router.get("/", allPosts);

router.get("/:id", getPost);

router.post("/create", upload.single("file"), addPost);

router.delete("/delete/:id", deletePost);

router.put("/update/:id", upload.single("file"), updatePost);

export default router;
