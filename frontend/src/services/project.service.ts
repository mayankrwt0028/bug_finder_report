import axiosInstance from "../api/axios";

export const getProjects = () => {
  return axiosInstance.get("/projects");
};

export const getProjectById = (id: string) => {
  return axiosInstance.get(`/projects/${id}`);
};

export const createProject = (data: {
  name: string;
  description: string;
}) => {
  return axiosInstance.post("/projects", data);
};

export const updateProject = (
  id: string,
  data: {
    name: string;
    description: string;
  }
) => {
  return axiosInstance.put(`/projects/${id}`, data);
};

export const deleteProject = (id: string) => {
  return axiosInstance.delete(`/projects/${id}`);
};
