'use client';

import Sidebar from '@/components/sidebar';
import { MdAdd } from 'react-icons/md';

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="users" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="ml-20 transition-all duration-300 p-4 md:p-8">
        <div className="admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Users Management</h2>
            <button className="admin-button-primary">
              <MdAdd className="w-4 h-4 mr-2" />
              Add User
            </button>
          </div>
          <p className="text-gray-600">User management interface coming soon...</p>
        </div>
      </div>
    </div>
  );
}

