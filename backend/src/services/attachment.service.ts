import { AttachmentType } from "@prisma/client";
import prisma from "../lib/prisma";
import cloudinary from "../utils/cloudinary";

export const uploadAttachment = async (
  bugId: string,
  fileName: string,
  fileUrl: string,
  publicId: string,
  type: "BUG" | "SOLUTION" = "BUG",
) => {
  const bug = await prisma.bug.findUnique({
    where: {
      id: bugId,
    },
  });

  if (!bug) {
    throw new Error("Bug not found");
  }

  return prisma.attachment.create({
    data: {
      bugId,
      fileName,
      fileUrl,
      publicId,
      type,
    },
  });
};

export const deleteAttachment = async (id: string) => {
  const attachment = await prisma.attachment.findUnique({
    where: {
      id,
    },
  });

  if (!attachment) {
    throw new Error("Attachment not found");
  }

  await cloudinary.uploader.destroy(attachment.publicId);

  await prisma.attachment.delete({
    where: {
      id,
    },
  });

  return attachment;
};
