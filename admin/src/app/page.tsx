'use client';

import Sidebar from '@/components/sidebar';
import Dashboard from '@/components/dashboard';
import TopNavbar from '@/components/layout/TopNavbar';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="dashboard" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <TopNavbar />
      <div className="ml-20 pt-16 transition-all duration-300">
        <Dashboard activeTab="dashboard" />
      </div>
    </div>
  );
}