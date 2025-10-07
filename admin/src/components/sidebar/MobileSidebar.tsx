'use client';

import { useState } from 'react';
import { 
  MdHome, 
  MdDashboard, 
  MdPeople, 
  MdCameraAlt, 
  MdBarChart,
  MdSettings,
  MdNotifications,
  MdMenu,
  MdClose
} from 'react-icons/md';

interface MobileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function MobileSidebar({ activeTab, onTabChange }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdHome },
    { id: 'categories', label: 'Categories', icon: MdDashboard },
    { id: 'photographers', label: 'Photographers', icon: MdCameraAlt },
    { id: 'users', label: 'Users', icon: MdPeople },
    { id: 'analytics', label: 'Analytics', icon: MdBarChart },
    { id: 'notifications', label: 'Notifications', icon: MdNotifications },
    { id: 'settings', label: 'Settings', icon: MdSettings },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between lg:hidden">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="font-bold text-gray-900">KliqShot Admin</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isOpen ? (
            <MdClose className="w-6 h-6 text-gray-600" />
          ) : (
            <MdMenu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="admin-sidebar w-64 h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              {/* Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">K</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">KliqShot</h1>
                  <p className="text-xs text-gray-500">Admin Panel</p>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onTabChange(item.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
