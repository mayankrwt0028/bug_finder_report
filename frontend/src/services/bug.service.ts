import axiosInstance from "../api/axios";

export const createBug = (data: any) =>
  axiosInstance.post("/bugs", data);

export const getAllBugs = () =>
  axiosInstance.get("/bugs");

export const getBugById = (id: string) =>
  axiosInstance.get(`/bugs/${id}`);

export const updateBug = (id: string, data: any) =>
  axiosInstance.put(`/bugs/${id}`, data);


export const assignBug = (
  bugId: string,
  assignToId: string
) => {
  return axiosInstance.patch("/bugs/assign", {
    bugId,
    assignToId,
  });
};

export const updateStatus = (
  id: string,
  status: string
) =>
  axiosInstance.patch(`/bugs/status/${id}`, {
    status,
  });

export const deleteBug = (id: string) =>
  axiosInstance.delete(`/bugs/${id}`);