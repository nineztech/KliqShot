'use client';

import { useState } from 'react';
import { 
  MdSearch, 
  MdNotifications, 
  MdAccountCircle,
  MdChevronLeft,
  MdChevronRight,
  MdSettings
} from 'react-icons/md';
import { useSidebar } from '@/components/sidebar/SidebarContext';

export default function TopNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { isMinimized, toggleSidebar } = useSidebar();

  return (
    <div 
      className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-6 shadow-sm transition-all duration-300"
      style={{ left: isMinimized ? '5rem' : '16rem' }}
    >
      {/* Left Section - Menu and Search */}
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
          title={isMinimized ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isMinimized ? (
            <MdChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <MdChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Right Section - Actions & Profile */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <MdNotifications className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        {/* Settings */}
        <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
          <MdSettings className="w-6 h-6" />
        </button>

        {/* Profile */}
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">A</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@kliqshot.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
