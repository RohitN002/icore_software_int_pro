import express from "express";
import {
  deleteUser,
  exportUsers,
  getUsers,
  updateUser,
  uploadUsers,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/upload-users", authMiddleware, uploadUsers);
router.get("export-users", authMiddleware, exportUsers);
router.get("/", getUsers);
router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, deleteUser);
export default router;
