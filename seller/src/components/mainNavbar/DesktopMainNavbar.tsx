'use client';

import React from 'react';
import { ArrowLeftRight, User } from 'lucide-react';
import { useSidebar } from '../Sidebar/SidebarContext';
import { useAuth } from '@/components/AuthContext'; // Import your auth context
import { MdSettings, MdSearch, MdNotifications } from 'react-icons/md';
 
import { useRouter } from 'next/dist/client/components/navigation';

export default function DesktopMainNavbar() {
  const { isMinimized, toggleSidebar } = useSidebar();
  const { user } = useAuth(); // Get actual logged-in user data
  const router = useRouter();
  // Get user initials for fallback avatar
  const getUserInitials = (firstname?: string, lastname?: string) => {
    if (!firstname && !lastname) return 'U';
    
    const initials = `${firstname?.[0] || ''}${lastname?.[0] || ''}`.toUpperCase();
    return initials || 'U';
  };

  // Get full name
  const getFullName = () => {
    if (!user) return 'Guest';
    return `${user.firstname || ''} ${user.lastname || ''}`.trim() || user.email;
  };

  return (
    <nav
      className="bg-white border-b border-gray-200 px-6 py-2 fixed top-0 right-0 z-10 transition-all duration-300"
      style={{ left: isMinimized ? '5rem' : '16rem' }}
    >
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle with Tooltip */}
          <div className="relative group">
            <button
              onClick={toggleSidebar}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeftRight className="w-5 h-5 text-gray-600" />
            </button>

            {/* Tooltip */}
            <span
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2
                        whitespace-nowrap bg-gray-800 text-white text-xs 
                        px-2 py-1 ml-2 rounded-full opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200 pointer-events-none z-50"
            >
              {isMinimized ? 'Open Sidebar' : 'Close Sidebar'}
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700 w-6 h-6" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 bg-white border-1 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-80"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <MdSettings className="w-6 h-6 text-gray-600" />
          </button>

          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition">
            <MdNotifications className="w-6 h-6 text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile Section */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            {user ? (
              <>
              {/* User Avatar with Initials */}
                <div
                onClick={() => router.push('/UserProfile')}
                 className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white font-semibold flex items-center justify-center shadow-md">
                  {getUserInitials(user.firstname)}
                </div>
                <div className="text-left">  
                  <span className="text-md font-medium text-gray-700 block">
                    {getFullName()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {user.email}
                  </span>
                </div>
                
                 
              </>
            ) : (
              // Fallback if no user is logged in
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Guest</span>
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}