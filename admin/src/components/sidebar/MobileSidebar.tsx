'use client';

import { useState } from 'react';
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
    { id: 'dashboard', label: 'Dashboard', icon: MdHome, href: '/' },
    { id: 'categories', label: 'Categories', icon: MdDashboard, href: '/categories' },
    { id: 'photographers', label: 'Photographers', icon: MdCameraAlt, href: '/photographers' },
    { id: 'users', label: 'Users', icon: MdPeople, href: '/users' },
    { id: 'analytics', label: 'Analytics', icon: MdBarChart, href: '/analytics' },
    { id: 'notifications', label: 'Notifications', icon: MdNotifications, href: '/notifications' },
    { id: 'settings', label: 'Settings', icon: MdSettings, href: '/settings' },
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
            className="admin-sidebar w-64 h-full bg-gradient-to-b from-slate-800 via-purple-800 to-indigo-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              {/* Logo */}
              <div className="flex items-center justify-center mb-2">
                <div className="w-40 h-16 rounded-lg flex items-center justify-center">
                  <Image src="/main Logo.png" alt="KliqShot Logo" width={160} height={64} className="object-contain" />
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-white/20 text-white backdrop-blur-sm'
                          : 'text-blue-100 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-200'}`} />
                      <span className="font-medium text-sm">{item.label}</span>
                    </Link>
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
