'use client';

import Sidebar from '@/components/sidebar';
import { MdSettings } from 'react-icons/md';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="settings" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="ml-20 pt-16 transition-all duration-300 p-4 md:p-8">
        <div className="admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Settings</h2>
            <MdSettings className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-gray-600">Settings interface coming soon...</p>
        </div>
      </div>
    </div>
  );
}

