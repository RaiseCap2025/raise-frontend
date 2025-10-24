export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }
  
  export interface UserRequest {
    name: string;
    email: string;
    password: string;
  }
  
  export interface UserResponse {
    user: User;
    token?: string;
  }
  