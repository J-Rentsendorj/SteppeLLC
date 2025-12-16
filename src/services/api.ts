import axios from 'axios';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { TokenResponse, LoginRequest, RegisterRequest, User } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7212/api';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor for token refresh and better error handling
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // Handle connection refused errors with helpful message
    if (error.code === 'ERR_NETWORK' || error.message.includes('ERR_CONNECTION_REFUSED')) {
      const enhancedError = new Error(
        '🔴 Backend server is not running!\n\n' +
        'Please start the backend API server:\n' +
        '1. Open terminal in project root\n' +
        '2. Run: start-dev.bat (or start-dev.ps1)\n' +
        '\nOr manually:\n' +
        'cd backend/src/AltanDynamics.Api && dotnet run'
      ) as AxiosError;
      enhancedError.name = 'ConnectionError';
      console.error('❌ Backend Connection Error:', {
        url: error.config?.url,
        baseURL: API_BASE_URL,
        message: 'Backend server is not running on https://localhost:7212'
      });
      return Promise.reject(enhancedError);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        
        if (refreshToken && accessToken) {
          const response = await axios.post<TokenResponse>(`${API_BASE_URL}/auth/refresh`, {
            accessToken,
            refreshToken,
          });
          
          const { accessToken: newToken, refreshToken: newRefresh } = response.data;
          localStorage.setItem('accessToken', newToken);
          localStorage.setItem('refreshToken', newRefresh);
          
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, clear tokens and redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: async (data: LoginRequest): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterRequest): Promise<{ message: string; userId: string }> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  refreshToken: async (accessToken: string, refreshToken: string): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/auth/refresh', { accessToken, refreshToken });
    return response.data;
  },
};

// Users API
export const usersApi = {
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },

  updateProfile: async (data: { fullName?: string; organization?: string }): Promise<void> => {
    await api.put('/users/me', data);
  },

  // Admin endpoints
  getUsers: async (params?: {
    status?: number;
    role?: number;
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ data: User[]; totalCount: number; page: number; totalPages: number }> => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  approveUser: async (userId: string): Promise<void> => {
    await api.put(`/users/${userId}/approve`);
  },

  rejectUser: async (userId: string): Promise<void> => {
    await api.put(`/users/${userId}/reject`);
  },

  getPendingCount: async (): Promise<{ pendingCount: number }> => {
    const response = await api.get('/users/pending-count');
    return response.data;
  },
};

// Leads API
export const leadsApi = {
  create: async (data: {
    fullName: string;
    email: string;
    organization: string;
    inquiryType: number;
    message: string;
    phone?: string;
  }): Promise<{ message: string; leadId: string; priority: string }> => {
    const response = await api.post('/leads', data);
    return response.data;
  },

  // Admin endpoints
  getLeads: async (params?: {
    priority?: number;
    status?: number;
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<{ data: Lead[]; totalCount: number; page: number; totalPages: number }> => {
    const response = await api.get('/leads', { params });
    return response.data;
  },

  getLead: async (id: string): Promise<Lead> => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },

  updateLead: async (id: string, data: { status?: number; notes?: string }): Promise<void> => {
    await api.put(`/leads/${id}`, data);
  },
};

// Lead type
export interface Lead {
  id: string;
  fullName: string;
  email: string;
  organization: string;
  inquiryType: number;
  message: string;
  phone?: string;
  priority: number;
  status: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default api;
