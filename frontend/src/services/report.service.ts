import api from "../api/axios";

export const getReports = () => {
  return api.get("/report");
};