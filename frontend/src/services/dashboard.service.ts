import axiosInstance from "../api/axios";

export const getDashboard = async () => {
  const response = await axiosInstance.get("/dashboard");
  return response.data;
};