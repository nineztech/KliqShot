'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from './components/AuthContext';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Store the current path to redirect back after login
      const redirectUrl = pathname || '/Desktop';
      router.push(`/signin?redirect=${encodeURIComponent(redirectUrl)}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <LoadingSpinner />;
  
  return <>{children}</>;
};

export default ProtectedRoute;
