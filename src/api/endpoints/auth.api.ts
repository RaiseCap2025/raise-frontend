import { apiClient } from '../client';
import type { UserResponse } from '../types/user.types';

export const AuthAPI = {
  login: async (email: string, password: string) =>
    apiClient.post<UserResponse>('/auth/login', { email, password }),

  logout: async () =>
    apiClient.post<void>('/auth/logout'),

  refreshToken: async (refreshToken: string) =>
    apiClient.post<UserResponse>('/auth/refresh', { refreshToken })
};
