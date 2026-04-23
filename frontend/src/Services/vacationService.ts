import axios from "axios";

/*
  Base URL from ENV
*/
const API_URL = `${import.meta.env.VITE_API_URL}/vacations`;

/*
  Auth header with JWT
*/
function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
}

/*
  GET all vacations
*/
export const getVacations = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

/*
  GET vacation by ID
*/
export const getVacationById = async (id: any) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );
  return response.data;
};

/*
  ADD vacation
*/
export const addVacation = async (vacation: FormData) => {
  const response = await axios.post(
    API_URL,
    vacation,
    getAuthHeaders()
  );
  return response.data;
};

/*
  UPDATE vacation
*/
export const updateVacation = async (
  id: any,
  vacation: FormData
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    vacation,
    getAuthHeaders()
  );
  return response.data;
};

/*
  DELETE vacation
*/
export const deleteVacation = async (id: number) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthHeaders()
  );
  return response.data;
};

/*
  LIKE vacation
*/
export const likeVacation = async (id: number) => {
  const response = await axios.post(
    `${API_URL}/${id}/like`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

/*
  UNLIKE vacation
*/
export const unlikeVacation = async (id: number) => {
  const response = await axios.delete(
    `${API_URL}/${id}/like`,
    getAuthHeaders()
  );
  return response.data;
};

/*
  EXPORT CSV
*/
export const downloadCSV = async () => {
  const response = await axios.get(`${API_URL}/export/csv`, {
    ...getAuthHeaders(),
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");

  link.href = url;
  link.setAttribute("download", "vacations.csv");

  document.body.appendChild(link);
  link.click();
  link.remove();
};