'use client';

// AuthContext.tsx - Auth context with safe chrome extension communication
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
 
interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        const userStr = localStorage.getItem('user');

        if (token && tokenExpiration && userStr) {
          const expirationTime = parseInt(tokenExpiration, 10);
          const currentTime = new Date().getTime();

          if (currentTime < expirationTime) {
            const userData = JSON.parse(userStr);
            console.log('Found valid auth, setting user:', userData);
            setUser(userData);
          } else {
            console.log('Token expired, clearing auth');
            clearAuth();
          }
        } else {
          console.log('No valid auth found');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('user');
    
    // Clear cookie
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    setUser(null);
  };

  const login = (token: string, userData: User) => {
    console.log('Logging in user:', userData);

    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 24 hours

    // Store in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expirationTime.toString());
    localStorage.setItem('user', JSON.stringify(userData));

    // Store token in cookie for middleware access
    document.cookie = `token=${token}; path=/; max-age=${24 * 60 * 60}; SameSite=Lax`;

    setUser(userData);

    // Notify Chrome Extension
    
  };

  const logout = () => {
    console.log('Logging out user');

    clearAuth();

    // Notify Chrome Extension
    
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
