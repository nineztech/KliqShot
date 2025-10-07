'use client';

import Sidebar from '@/components/sidebar';
import Dashboard from '@/components/dashboard';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="dashboard" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="ml-20 transition-all duration-300">
        <Dashboard activeTab="dashboard" />
      </div>
    </div>
  );
}