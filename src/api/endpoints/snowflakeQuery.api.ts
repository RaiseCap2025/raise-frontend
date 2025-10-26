import { apiClient } from '../client';

export const QueryAPI = {
  query: async (sqlQuery: string) =>
    apiClient.post<any>('/api/v2/statements', sqlQuery),
};
