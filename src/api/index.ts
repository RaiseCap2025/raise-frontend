import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';
const isLocal = import.meta.env.MODE === 'development';
const API_BASE_URL = isLocal
  ? import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
  : '/api';

const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
};

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers
});

// 🔒 Request interceptor
api.interceptors.request.use(
  (config) => {
    // TODO : Add authorization token if available
    // const token = localStorage.getItem('accessToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
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
