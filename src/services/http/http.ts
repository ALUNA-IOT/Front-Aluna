import axios, { AxiosInstance } from "axios";

export const http: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "", // TODO: set real API baseURL
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});
