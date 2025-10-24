import type { AxiosRequestConfig } from 'axios';
import api from './index';
import type { ApiResponse } from './types/api.types';

export const apiClient = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const res = await api.get<T>(url, config);
    return { data: res.data, status: res.status };
  },

  post: async <T, D = unknown>(url: string, body?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const res = await api.post<T>(url, body, config);
    return { data: res.data, status: res.status };
  },

  put: async <T, D = unknown>(url: string, body?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const res = await api.put<T>(url, body, config);
    return { data: res.data, status: res.status };
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    const res = await api.delete<T>(url, config);
    return { data: res.data, status: res.status };
  }
};
