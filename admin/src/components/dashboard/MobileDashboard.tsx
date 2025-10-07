'use client';

import { 
  MdDashboard, 
  MdPeople, 
  MdCameraAlt, 
  MdBarChart,
  MdAdd
} from 'react-icons/md';
import { useState } from 'react';
import CategoryManagement from '../category/CategoryManagement';

interface MobileDashboardProps {
  activeTab: string;
}

export default function MobileDashboard({ activeTab }: MobileDashboardProps) {
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Wedding & Pre-Wedding',
      description: 'Capture your special day',
      photographerCount: 420,
      subCategories: [
        { id: '1-1', name: 'Haldi', photographerCount: 45 },
        { id: '1-2', name: 'Mehendi', photographerCount: 38 },
        { id: '1-3', name: 'Reception', photographerCount: 67 }
      ]
    },
    {
      id: '2',
      name: 'Portrait & Portfolio',
      description: 'Professional headshots & portraits',
      photographerCount: 380,
      subCategories: [
        { id: '2-1', name: 'Headshots', photographerCount: 78 },
        { id: '2-2', name: 'Portfolio', photographerCount: 65 }
      ]
    }
  ]);

  const stats = [
    { title: 'Categories', value: categories.length, icon: MdDashboard, color: 'blue' },
    { title: 'Photographers', value: 1247, icon: MdCameraAlt, color: 'green' },
    { title: 'Users', value: 3421, icon: MdPeople, color: 'purple' },
    { title: 'Bookings', value: 892, icon: MdBarChart, color: 'orange' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-4 p-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="admin-card p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-gray-600">{stat.title}</p>
                        <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                        <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="admin-card p-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <MdAdd className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">New category added</p>
                    <p className="text-xs text-gray-600">Wedding Photography</p>
                  </div>
                  <span className="text-xs text-gray-500">2h ago</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <MdPeople className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">New photographer</p>
                    <p className="text-xs text-gray-600">Sarah Johnson joined</p>
                  </div>
                  <span className="text-xs text-gray-500">4h ago</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'categories':
        return <CategoryManagement categories={categories} setCategories={setCategories} />;
      
      case 'photographers':
        return (
          <div className="admin-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Photographers</h2>
              <button className="admin-button-primary text-sm px-3 py-2">
                <MdAdd className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            <p className="text-gray-600 text-sm">Photographer management coming soon...</p>
          </div>
        );
      
      case 'users':
        return (
          <div className="admin-card p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Users</h2>
              <button className="admin-button-primary text-sm px-3 py-2">
                <MdAdd className="w-4 h-4 mr-1" />
                Add
              </button>
            </div>
            <p className="text-gray-600 text-sm">User management coming soon...</p>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="admin-card p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600 text-sm">Analytics dashboard coming soon...</p>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="admin-card p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Notifications</h2>
            <p className="text-gray-600 text-sm">Notifications coming soon...</p>
          </div>
        );
      
      case 'settings':
        return (
          <div className="admin-card p-4">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Settings</h2>
            <p className="text-gray-600 text-sm">Settings panel coming soon...</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="admin-main pt-16">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
}
