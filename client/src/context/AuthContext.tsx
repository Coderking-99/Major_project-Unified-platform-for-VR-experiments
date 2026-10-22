import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isOwner: boolean;
  isClient: boolean;
  isLoading: boolean;
  login: (credentials: { username: string; password: string }) => Promise<User>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('arvr_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('arvr_token');
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Verify and sync token on initial mount
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('arvr_token');
      if (storedToken) {
        try {
          const res = await api.auth.getMe();
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('arvr_user', JSON.stringify(res.user));
          } else {
            logout();
          }
        } catch (err) {
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials: { username: string; password: string }): Promise<User> => {
    setIsLoading(true);
    try {
      const response = await api.auth.login(credentials);
      if (response.success && response.token) {
        setToken(response.token);
        setUser(response.user);
        localStorage.setItem('arvr_token', response.token);
        localStorage.setItem('arvr_user', JSON.stringify(response.user));
        return response.user;
      }
      throw new Error(response.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('arvr_token');
    localStorage.removeItem('arvr_user');
  };

  const refreshUser = async () => {
    try {
      const res = await api.auth.getMe();
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem('arvr_user', JSON.stringify(res.user));
      }
    } catch (_) {}
  };

  const isOwner = user?.role === 'OWNER';
  const isClient = user?.role === 'CLIENT';
  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isOwner,
        isClient,
        isLoading,
        login,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
