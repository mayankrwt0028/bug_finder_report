import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  createComment,
  deleteComment,
  getAllCommentById,
  updateComment,
} from "../services/comment.service";

export const createCommentCont = async (req: AuthRequest, res: Response) => {
  try {
    const { message } = req.body;

    const bugId = req.params.bugId as string;

    const comment = await createComment({
      message,
      bugId,
      userId: req.userId!,
    });

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      comment,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCommentCont = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const comment = await getAllCommentById(id);
    return res.status(200).json({
      sucess: true,
      comment,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCommentCont = async (req: AuthRequest, res: Response) => {
  try {
    const id = req.params.id as string;
    const { message, userId, bugId } = req.body;

    const comment = await updateComment(id, {
      message,
      userId,
      bugId,
    });
    return res.status(200).json({
      success: true,
      message: "Comment are update",
      comment,
    });
  } catch (error: any) {
    return res.status(400).json({
      succes: false,
      message: error.message,
    });
  }
};

export const deleteCommentCont = async (req: AuthRequest, res: Response) => {
  try {
    const deleteId = req.params.id as string;
    const comment = await deleteComment(deleteId);
    return res.status(200).json({
      succes: true,
      message: "bug deleted succesfully",
      comment,
    });
  } catch (error: any) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};
