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
  MdNotifications,
  MdLogout
} from 'react-icons/md';
import { useSidebar } from './SidebarContext';

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function DesktopSidebar({ activeTab, onTabChange }: DesktopSidebarProps) {
  const { isMinimized } = useSidebar();
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
    <div className={`admin-sidebar ${isMinimized ? 'w-20' : 'w-64'} min-h-screen fixed left-0 top-0 z-40 transition-all duration-300 ease-in-out bg-gradient-to-b from-slate-800 via-purple-800 to-indigo-900`}>
      <div className="p-4">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-2">
          <div className={`${isMinimized ? 'w-16 h-16' : 'w-40 h-16'} rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300`}>
            {isMinimized ? (
              <Image src="/Logo_Icon2.png" alt="KliqShot Icon" width={36} height={36} className="object-contain" />
            ) : (
              <Image src="/main Logo.png" alt="KliqShot Logo" width={160} height={64} className="object-contain" />
            )}
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
                className={`w-full flex items-center ${isMinimized ? 'justify-center' : 'space-x-3'} px-3 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActive
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
                title={isMinimized ? item.label : ''}
              >
                <Icon className={`w-6 h-6 flex-shrink-0 ${isActive ? 'text-white' : 'text-blue-200'}`} />
                {!isMinimized && <span className="font-medium whitespace-nowrap">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
        <button className={`w-full bg-indigo-500 hover:bg-red-100 text-white hover:text-red-500 font-semibold py-3 rounded-lg transition duration-200 shadow-lg ${isMinimized ? 'px-0' : ''}`}>
          <div className={`flex gap-2 items-center ${isMinimized ? 'justify-center' : 'justify-center'}`}>
            <MdLogout className="w-5 h-5" />
            {!isMinimized && <span className="font-medium">Log out</span>}
          </div>
        </button>
      </div>
    </div>
  );
}
