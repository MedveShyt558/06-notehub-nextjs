import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NOTEHUB_API,
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});
