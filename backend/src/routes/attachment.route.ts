import Router from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

import {
  deleteAttachmentCont,
  uploadAttachmentCont,
} from "../controllers/attachment.controller";
const router = Router();

router.post(
  "/:bugId",
  authMiddleware,
  upload.single("file"),
  uploadAttachmentCont,
);
router.delete("/:id", authMiddleware, deleteAttachmentCont);

export default router;
