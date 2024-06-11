// import dotenv from "dotenv";
import axios from "axios";

axios.defaults.withCredentials = true;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

api.defaults.headers.common["Content-Type"] = "application/json";
