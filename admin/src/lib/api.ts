// lib/api.ts - Admin API client
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5006/api';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'admin' | 'super_admin';
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

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
apiClient.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      // Clear auth data on unauthorized
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

export const adminApi = {
  // Register a new admin
  register: async (data: RegisterData): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post('/admins/register', data);
      
      // Store token in localStorage
      if (response.data.data?.token) {
        localStorage.setItem('adminToken', response.data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.data.admin));
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Registration failed');
    }
  },

  // Login admin
  login: async (data: LoginData): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post('/admins/login', data);
      
      // Store token in localStorage
      if (response.data.data?.token) {
        localStorage.setItem('adminToken', response.data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.data.admin));
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Login failed');
    }
  },

  // Get admin profile
  getProfile: async (): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get('/admins/profile');
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch profile');
    }
  },

  // Logout
  logout: async (): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post('/admins/logout');
      
      // Clear local storage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminTokenExpiration');
      
      return response.data;
    } catch (error: any) {
      // Even if API call fails, clear local storage
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      localStorage.removeItem('adminTokenExpiration');
      
      throw new Error(error.response?.data?.message || error.message || 'Logout failed');
    }
  },

  // Check if admin is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('adminToken');
  },

  // Get current admin user
  getCurrentUser: () => {
    const userStr = localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
  }
};

// Category API
export const categoryApi = {
  // Upload image for category
  uploadImage: async (file: File): Promise<ApiResponse> => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await apiClient.post('/upload/category-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to upload image');
    }
  },

  // Get all categories with subcategories
  getAll: async (includeInactive = false): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get(`/categories?includeInactive=${includeInactive}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch categories');
    }
  },

  // Get single category by ID
  getById: async (id: string): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get(`/categories/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch category');
    }
  },

  // Get subcategories of a category
  getSubCategories: async (categoryId: string): Promise<ApiResponse> => {
    try {
      const response = await apiClient.get(`/categories/${categoryId}/subcategories`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to fetch subcategories');
    }
  },

  // Create a new category or subcategory
  create: async (data: {
    name: string;
    description?: string;
    image?: string;
    parentId?: string | null;
    displayOrder?: number;
    isActive?: boolean;
  }): Promise<ApiResponse> => {
    try {
      const response = await apiClient.post('/categories', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to create category');
    }
  },

  // Update category or subcategory
  update: async (id: string, data: {
    name?: string;
    description?: string;
    image?: string;
    parentId?: string | null;
    displayOrder?: number;
    isActive?: boolean;
    photographerCount?: number;
  }): Promise<ApiResponse> => {
    try {
      const response = await apiClient.put(`/categories/${id}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || 'Failed to update category');
    }
  }
};

