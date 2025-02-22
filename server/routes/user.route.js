import express from "express";
import {
  deleteUser,
  exportUsers,
  getUsers,
  updateUser,
  uploadUsers,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

router.post("/upload-users", upload.single("file"), uploadUsers);
router.get("/export-users", exportUsers);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
export default router;
