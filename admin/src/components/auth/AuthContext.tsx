'use client';

// AuthContext.tsx - Auth context for admin authentication
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Admin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'super_admin';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, adminData: Admin) => void;
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
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('adminToken');
        const tokenExpiration = localStorage.getItem('adminTokenExpiration');
        const adminStr = localStorage.getItem('adminUser');

        if (token && tokenExpiration && adminStr) {
          const expirationTime = parseInt(tokenExpiration, 10);
          const currentTime = new Date().getTime();

          if (currentTime < expirationTime) {
            const adminData = JSON.parse(adminStr);
            console.log('Found valid admin auth, setting admin:', adminData);
            setAdmin(adminData);
          } else {
            console.log('Token expired, clearing auth');
            clearAuth();
          }
        } else {
          console.log('No valid admin auth found');
        }
      } catch (error) {
        console.error('Error checking admin auth:', error);
        clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const clearAuth = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminTokenExpiration');
    localStorage.removeItem('adminUser');
    
    // Clear cookies
    document.cookie = 'adminToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    setAdmin(null);
  };

  const login = (token: string, adminData: Admin) => {
    console.log('Logging in admin:', adminData);

    const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // 7 days

    // Store in localStorage
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminTokenExpiration', expirationTime.toString());
    localStorage.setItem('adminUser', JSON.stringify(adminData));

    // Store token in cookie for middleware access
    document.cookie = `adminToken=${token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;

    setAdmin(adminData);
  };

  const logout = () => {
    console.log('Logging out admin');
    clearAuth();
  };

  const value = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

