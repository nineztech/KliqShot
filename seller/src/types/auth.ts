// types/auth.ts

export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  Phone: string;
  token?: string;
}

export interface RegisterData {
  firstname: string;
  lastname: string;
  Phone: string;
  email: string;
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
  error?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}