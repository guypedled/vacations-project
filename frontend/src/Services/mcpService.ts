import axios from "axios";

/*
  Base URL from ENV
*/
const API_URL = `${import.meta.env.VITE_API_URL}/mcp`;

/*
  Send question to backend MCP endpoint
*/
export const askMcpQuestion = async (question: string) => {
  const response = await axios.post(`${API_URL}/ask`, {
    question,
  });

  return response.data;
};