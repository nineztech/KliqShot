'use client';

import Sidebar from '@/components/sidebar';
import { MdNotifications } from 'react-icons/md';

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="notifications" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="ml-20 pt-16 transition-all duration-300 p-4 md:p-8">
        <div className="admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
            <MdNotifications className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600">Notifications interface coming soon...</p>
        </div>
      </div>
    </div>
  );
}

