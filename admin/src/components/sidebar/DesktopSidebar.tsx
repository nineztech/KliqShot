'use client';

import { 
  MdHome, 
  MdDashboard, 
  MdPeople, 
  MdCameraAlt, 
  MdBarChart,
  MdSettings,
  MdNotifications
} from 'react-icons/md';

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function DesktopSidebar({ activeTab, onTabChange }: DesktopSidebarProps) {
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
    <div className="admin-sidebar w-64 min-h-screen fixed left-0 top-0 z-40">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">K</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">KliqShot</h1>
            <p className="text-xs text-gray-500">Admin Panel</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <div>
            <p className="font-medium text-gray-900 text-sm">Admin User</p>
            <p className="text-xs text-gray-500">admin@kliqshot.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
