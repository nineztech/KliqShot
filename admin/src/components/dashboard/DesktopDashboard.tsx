'use client';

import { 
  MdDashboard, 
  MdPeople, 
  MdCameraAlt, 
  MdBarChart,
  MdAdd,
  MdEdit,
  MdDelete,
  MdVisibility
} from 'react-icons/md';
import { useState } from 'react';
import CategoryManagement from '../category';
import PhotographerManagement from '../photographer';

interface DesktopDashboardProps {
  activeTab: string;
}

export default function DesktopDashboard({ activeTab }: DesktopDashboardProps) {
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

  const [photographers, setPhotographers] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 234 567 8900',
      location: 'New York, NY',
      specialty: 'Wedding Photography',
      rating: 4.9,
      reviews: 156,
      price: '₹15,000',
      experience: '5+ years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      status: 'active' as 'active' | 'inactive' | 'pending',
      joinDate: '2023-01-15',
      categories: ['wedding', 'portrait']
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 987 654 3210',
      location: 'Mumbai, India',
      specialty: 'Haldi Photography',
      rating: 4.8,
      reviews: 203,
      price: '₹12,000',
      experience: '7+ years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      status: 'active' as 'active' | 'inactive' | 'pending',
      joinDate: '2023-02-20',
      categories: ['wedding', 'events']
    }
  ]);

  const stats = [
    { title: 'Total Categories', value: categories.length, icon: MdDashboard, color: 'blue' },
    { title: 'Total Photographers', value: 1247, icon: MdCameraAlt, color: 'green' },
    { title: 'Total Users', value: 3421, icon: MdPeople, color: 'purple' },
    { title: 'Total Bookings', value: 892, icon: MdBarChart, color: 'orange' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="admin-card">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="admin-card">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MdAdd className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">New category added</p>
                    <p className="text-sm text-gray-600">Wedding Photography category was created</p>
                  </div>
                  <span className="text-sm text-gray-500">2 hours ago</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <MdPeople className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">New photographer registered</p>
                    <p className="text-sm text-gray-600">Sarah Johnson joined the platform</p>
                  </div>
                  <span className="text-sm text-gray-500">4 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'categories':
        return <CategoryManagement categories={categories} setCategories={setCategories} />;
      
      case 'photographers':
        return <PhotographerManagement photographers={photographers} setPhotographers={setPhotographers} />;
      
      case 'users':
        return (
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
        );
      
      case 'analytics':
        return (
          <div className="admin-card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Analytics Dashboard</h2>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="admin-card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Notifications</h2>
            <p className="text-gray-600">Notification management coming soon...</p>
          </div>
        );
      
      case 'settings':
        return (
          <div className="admin-card">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="admin-main ml-64 p-8">
      <div className="max-w-7xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
}
