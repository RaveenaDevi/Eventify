import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://ec2-3-109-54-45.ap-south-1.compute.amazonaws.com/api/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUsers = async (formData) => {
  const response = await apiClient.post("/login", formData);
  return response.data;
};

export const registerUsers = async (formData) => {
  const response = await apiClient.post("/register", formData);
  return response.data;
};
