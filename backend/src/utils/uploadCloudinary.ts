import cloudinary from "./cloudinary";
import { UploadApiResponse } from "cloudinary";
import streamifier from "streamifier"

export const uploadToCloudinary = (
  file: Express.Multer.File
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "bug-tracker",
      },
      (error, result) => {
        if (error) return reject(error);

        resolve(result!);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};