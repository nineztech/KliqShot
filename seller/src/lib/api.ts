// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006/api';

interface RegisterData {
  firstname: string;
  lastname: string;
  Phone: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
  errors?: string[];
  error?: string;
}

export const api = {
  // Register a new seller
  register: async (data: RegisterData): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/sellers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      // Store token in localStorage
      if (result.data?.token) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data));
      }

      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Network error during registration');
    }
  },

  // Login seller
  login: async (data: LoginData): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/sellers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      // Store token in localStorage
      if (result.data?.token) {
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data));
      }

      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Network error during login');
    }
  },

  // Get seller profile
  getProfile: async (): Promise<ApiResponse> => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_BASE_URL}/sellers/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch profile');
      }

      return result;
    } catch (error: any) {
      throw new Error(error.message || 'Network error fetching profile');
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Get current user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};