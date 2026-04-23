import axios from "axios";

/*
  Base URL from ENV (professional approach)
*/
const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

/*
  Register user
*/
export const register = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${API_URL}/register`, {
    firstName,
    lastName,
    email,
    password,
  });

  return response.data;
};

/*
  Login user
*/
export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });

  return response.data;
};