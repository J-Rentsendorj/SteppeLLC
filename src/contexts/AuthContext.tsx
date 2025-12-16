import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User, AuthState, LoginRequest, RegisterRequest, TokenResponse } from '../types/auth';
import { authApi, usersApi } from '../services/api';

interface AuthContextType extends AuthState {
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<{ message: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('accessToken'),
    isAuthenticated: false,
    isLoading: true,
  });

  const fetchUser = useCallback(async () => {
    try {
      const user = await usersApi.getCurrentUser();
      setState(prev => ({
        ...prev,
        user,
        isAuthenticated: true,
        isLoading: false,
      }));
    } catch {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      fetchUser();
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, [fetchUser]);

  const login = async (data: LoginRequest): Promise<void> => {
    const response: TokenResponse = await authApi.login(data);
    
    localStorage.setItem('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    
    setState(prev => ({
      ...prev,
      token: response.accessToken,
    }));
    
    await fetchUser();
  };

  const register = async (data: RegisterRequest): Promise<{ message: string }> => {
    const response = await authApi.register(data);
    return { message: response.message };
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
