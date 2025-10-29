'use client';

import React from 'react';
import { SidebarProvider } from '@/components/Sidebar/SidebarContext';
import SidebarSection from '@/components/Sidebar';
import MainNavbarSection from '@/components/mainNavbar';
import ProtectedRoute from '@/ProtectedRoute';

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen bg-gray-50">
          <SidebarSection />
          <MainNavbarSection />
          <main>{children}</main>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
}