import axiosInstance from "../api/axios";

export const getComments = (bugId: string) =>
  axiosInstance.get(`/comments/bug/${bugId}`);

export const createComment = (bugId: string, message: string) =>
  axiosInstance.post(`/comments/${bugId}`, {
    message,
  });

export const updateComment = (id: string, message: string) =>
  axiosInstance.patch(`/comments/${id}`, {
    message,
  });

export const deleteComment = (id: string) =>
  axiosInstance.delete(`/comments/${id}`);