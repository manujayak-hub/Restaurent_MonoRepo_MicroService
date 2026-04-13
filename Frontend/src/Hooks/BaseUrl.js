import axios from "axios";

const backendBaseUrl = "http://localhost:5000";

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