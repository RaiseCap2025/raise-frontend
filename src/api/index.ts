import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

const headers = {
  Authorization: "Bearer eyJraWQiOiIxMjc2NTA3MjgzNjYwODYiLCJhbGciOiJFUzI1NiJ9.eyJwIjoiMTk0Nzc5NjcyOToxOTQ3Nzk2NzQxIiwiaXNzIjoiU0Y6MTAxMiIsImV4cCI6MTc5MTk1MjYwNH0.irmf2y-IPrV8yARpn2sHlpZnSwvpBMhRd04ntdqxeQj3rX-JZ-_llPbulenYxmrUQA-KaImL79HTcLd9YXFWmA",
  "Content-Type": "application/json",
  "Accept": "application/json"
};

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers
});

// 🔒 Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ⚠️ Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Handle unauthorized logic (e.g., logout or refresh token)
      console.warn('Unauthorized! Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default api;
