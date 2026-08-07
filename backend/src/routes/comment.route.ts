import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  createCommentCont,
  deleteCommentCont,
  getAllCommentCont,
  updateCommentCont,
} from "../controllers/comment.controller";

const router = Router();

router.post("/:bugId", authMiddleware, createCommentCont);

router.get("/bug/:id", authMiddleware, getAllCommentCont);

router.patch("/:id", authMiddleware, updateCommentCont);

router.delete("/:id", authMiddleware, deleteCommentCont);

export default router;
