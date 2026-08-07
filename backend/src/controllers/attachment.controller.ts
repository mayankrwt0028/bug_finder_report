import { Request, Response } from "express";
import { uploadToCloudinary } from "../utils/uploadCloudinary";
import {
  deleteAttachment,
  uploadAttachment,
} from "../services/attachment.service";

export const uploadAttachmentCont = async (req: Request, res: Response) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const uploaded = await uploadToCloudinary(file);

    const attachment = await uploadAttachment(
      req.params.bugId as string,
      file.originalname,
      uploaded.secure_url,
      uploaded.public_id,
      req.body.type,
    );

    return res.status(201).json({
      success: true,
      data: attachment,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAttachmentCont = async (req: Request, res: Response) => {
  try {
    await deleteAttachment(req.params.id as string);

    return res.status(200).json({
      success: true,
      message: "Attachment deleted successfully",
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
