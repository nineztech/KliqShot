'use client';

import Link from 'next/link';
import Image from 'next/image';
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
    { id: 'dashboard', label: 'Dashboard', icon: MdHome, href: '/' },
    { id: 'categories', label: 'Categories', icon: MdDashboard, href: '/categories' },
    { id: 'photographers', label: 'Photographers', icon: MdCameraAlt, href: '/photographers' },
    { id: 'users', label: 'Users', icon: MdPeople, href: '/users' },
    { id: 'analytics', label: 'Analytics', icon: MdBarChart, href: '/analytics' },
    { id: 'notifications', label: 'Notifications', icon: MdNotifications, href: '/notifications' },
    { id: 'settings', label: 'Settings', icon: MdSettings, href: '/settings' },
  ];

  return (
    <div className="admin-sidebar w-20 hover:w-64 min-h-screen fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out group bg-gradient-to-b from-slate-800 via-purple-800 to-indigo-900">
      <div className="p-4">
        {/* Logo */}
        <div className="flex items-center justify-center mb-8 overflow-hidden">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
            <Image src="/main Logo.png" alt="KliqShot Logo" width={48} height={48} className="object-contain" />
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 overflow-hidden ${
                  isActive
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-6 h-6 flex-shrink-0 ${isActive ? 'text-white' : 'text-blue-200'}`} />
                <span className="font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
        <div className="flex items-center space-x-3 overflow-hidden">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <div className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="font-medium text-white text-sm">Admin User</p>
            <p className="text-xs text-blue-100">admin@kliqshot.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
