'use client';

import React from 'react';
import { SidebarProvider } from '@/components/Sidebar/SidebarContext';
import SidebarSection from '@/components/Sidebar';
import MainNavbarSection from '@/components/mainNavbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50">
        <SidebarSection />
        <MainNavbarSection />
        <main>{children}</main>
      </div>
    </SidebarProvider>
  );
}