import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://back-end-recipe-room-phase-5.onrender.com/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token"); // match this with Login.jsx
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
