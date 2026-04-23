import axios from "axios";

/*
  Base API URL from environment
*/
const API_URL = `${import.meta.env.VITE_API_URL}/ai`;

/*
  Send destination to backend and get AI recommendation
*/
export const getRecommendation = async (destination: string) => {
  const response = await axios.post(`${API_URL}/recommend`, {
    destination,
  });

  return response.data;
};