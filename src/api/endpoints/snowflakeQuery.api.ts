import { apiClient } from '../client';

const BASE_URL = '';

export const QueryAPI = {
  query: async (sqlQuery: string) =>
    apiClient.post<Record<string, any>>(`${BASE_URL}/statements`, sqlQuery),
};
