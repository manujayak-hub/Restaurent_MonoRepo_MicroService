import axios from "axios";

export const BASE_URL = "http://16.16.139.104:5000"; // Update port if your backend/gateway uses a different one
const backendBaseUrl = BASE_URL;

const baseURL = axios.create({
  baseURL: backendBaseUrl,
});


baseURL.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers["ClientId"] = "user-1";

  return config;
});

export default baseURL;