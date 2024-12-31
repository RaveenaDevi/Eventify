import axios from "axios";

const apiClient = axios.create({
  
    baseURL: "http://ec2-3-109-54-45.ap-south-1.compute.amazonaws.com/api",
    headers: {
        "Content-Type": "application/json",
    }
 });


export const joinEvent = async (eventId) => {
  const token = localStorage.getItem('token');
    const response = await apiClient.post(`/registrations/${eventId}/register`,{},{
      headers: {
        'Authorization': `Bearer ${token}`,     // Include the Authorization header
      }
      });
    return response.data
}

  export const myJoinEvent = async () => {
 const token = localStorage.getItem('token');
    const response = await apiClient.get(`/registrations/my-registrations`,{
      headers: {
        'Authorization': `Bearer ${token}`,    
      }
      });
    return response.data
  }