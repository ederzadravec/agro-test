import axios from "axios";

const API_URI = import.meta.env.VITE_API_URI;

const api = axios.create({
  baseURL: API_URI,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

export default api;
