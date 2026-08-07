import api from "../api/axios";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
// https://bug-finder-report.onrender.com/api/auth/register
export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: "QA" | "DEVELOPER";
}) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};