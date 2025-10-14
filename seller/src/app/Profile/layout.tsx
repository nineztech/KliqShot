'use client';

import React from 'react';
 
import NavbarSection from '@/components/navbar';
import ProtectedRoute from '@/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      
        <div className="min-h-screen bg-gray-50">
           
          <NavbarSection />
          <main>{children}</main>
        </div>
       
    </ProtectedRoute>
  );
}