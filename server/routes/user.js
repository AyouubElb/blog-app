import express from "express";
import { getUser, updateUser } from "../controllers/userController.js";

import { upload } from "../middlewares/uploadImage.js";

const router = express.Router();

router.get("/:id", getUser);

router.put("/update", upload.single("file"), updateUser);

export default router;
