import { apiClient } from '../client';
import type { User, UserRequest, UserResponse } from '../types/user.types';
import type { PaginatedResponse } from '../types/api.types';

const BASE_URL = '/users';

export const UserAPI = {
  getAll: async (page = 1, pageSize = 10) =>
    apiClient.get<PaginatedResponse<User>>(`${BASE_URL}?page=${page}&pageSize=${pageSize}`),

  getById: async (id: string) =>
    apiClient.get<User>(`${BASE_URL}/${id}`),

  create: async (payload: UserRequest) =>
    apiClient.post<UserResponse>(BASE_URL, payload),

  update: async (id: string, payload: Partial<UserRequest>) =>
    apiClient.put<UserResponse>(`${BASE_URL}/${id}`, payload),

  delete: async (id: string) =>
    apiClient.delete<void>(`${BASE_URL}/${id}`)
};
