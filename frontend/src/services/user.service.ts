import axiosInstance from "../api/axios";


export const getUsers = () => {
  return axiosInstance.get("/users");
};


export const updateUserRole = (
  id: string,
  role: string
) => {
  return axiosInstance.put(`/users/${id}/role`, {
    role,
  });
};


export const deleteUser = (
  id: string
) => {
  return axiosInstance.delete(`/users/${id}`);
};