import api from "../api/axios";

export const uploadAttachment = (
  bugId: string,
  file: File,
  type: "BUG" | "SOLUTION" = "BUG",
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("type", type);

  return api.post(`/attachments/${bugId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
