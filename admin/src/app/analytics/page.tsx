'use client';

import Sidebar from '@/components/sidebar';
import { MdBarChart } from 'react-icons/md';
import { useSidebar } from '@/components/sidebar/SidebarContext';

export default function AnalyticsPage() {
  const { isMinimized } = useSidebar();
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="analytics" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div 
        className="pt-16 transition-all duration-300 p-4 md:p-8"
        style={{ marginLeft: isMinimized ? '5rem' : '16rem' }}
      >
        <div className="admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Analytics & Reports</h2>
            <MdBarChart className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600">Analytics interface coming soon...</p>
        </div>
      </div>
    </div>
  );
}

