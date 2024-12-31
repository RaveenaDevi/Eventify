import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://ec2-3-109-54-45.ap-south-1.compute.amazonaws.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const addEvent = async (formData) => {
  const token = localStorage.getItem("token");
  const response = await apiClient.post("/events", formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Ensure this header is set for form data
      Authorization: `Bearer ${token}`, // Include the Authorization header
    },
  });
  return response.data;
};
export const getEvents = async () => {
  const response = await apiClient.get("/events");
  return response.data;
};

export const getEventById = async (eventId) => {
  const response = await apiClient.get(`/events/${eventId}`);
  return response.data;
};

export const editEventById = async (eventId, formData) => {
  const token = localStorage.getItem("token");
  const response = await apiClient.put(`/events/${eventId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", 
      Authorization: `Bearer ${token}`, 
    },
  });
  return response.data;
};
