import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // replace with Sana’s backend URL if deployed
});

// Interceptor to add token if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
