'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { 
  MdHome, 
  MdDashboard, 
  MdPeople, 
  MdCameraAlt, 
  MdBarChart,
  MdSettings,
  MdInventory,
  MdLogout
} from 'react-icons/md';
import { useSidebar } from './SidebarContext';
import { useAuth } from '@/components/auth/AuthContext';
import { adminApi } from '@/lib/api';

interface DesktopSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function DesktopSidebar({ activeTab, onTabChange }: DesktopSidebarProps) {
  const { isMinimized } = useSidebar();
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdHome, href: '/' },
    { id: 'categories', label: 'Categories', icon: MdDashboard, href: '/categories' },
    { id: 'photographers', label: 'Kliqchamps', icon: MdCameraAlt, href: '/photographers' },
    { id: 'users', label: 'Clients', icon: MdPeople, href: '/users' },
    { id: 'analytics', label: 'Analytics', icon: MdBarChart, href: '/analytics' },
    { id: 'packages', label: 'Packages', icon: MdInventory, href: '/packages' },
    { id: 'settings', label: 'Settings', icon: MdSettings, href: '/settings' },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await adminApi.logout();
      logout();
      router.push('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API fails, still logout locally
      logout();
      router.push('/signin');
    } finally {
      setIsLoggingOut(false);
    }
  };

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

      {/* Logout Button - Only show when authenticated */}
      {isAuthenticated && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full bg-indigo-500 hover:bg-red-100 text-white hover:text-red-500 font-semibold py-3 rounded-lg transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${isMinimized ? 'px-0' : ''}`}
          >
            <div className={`flex gap-2 items-center ${isMinimized ? 'justify-center' : 'justify-center'}`}>
              {isLoggingOut ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <MdLogout className="w-5 h-5" />
              )}
              {!isMinimized && <span className="font-medium">{isLoggingOut ? 'Logging out...' : 'Log out'}</span>}
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
