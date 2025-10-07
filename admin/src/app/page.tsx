'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import Dashboard from '@/components/dashboard';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <Dashboard activeTab={activeTab} />
    </div>
  );
}