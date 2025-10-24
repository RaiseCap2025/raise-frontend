export interface ApiResponse<T> {
    data: T;
    status: number;
  }
  
  export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
  }
  
  export interface ApiError {
    message: string;
    code?: string | number;
  }
  