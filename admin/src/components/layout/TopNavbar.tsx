'use client';

import Link from 'next/link';
import { 
  MdNotifications, 
  MdAccountCircle,
  MdChevronLeft,
  MdChevronRight,
  MdSettings,
  MdLogout
} from 'react-icons/md';
import { useSidebar } from '@/components/sidebar/SidebarContext';
import { useAuth } from '@/components/auth/AuthContext';
import { useRouter } from 'next/navigation';

export default function TopNavbar() {
  const { isMinimized, toggleSidebar } = useSidebar();
  const { admin, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/signin');
  };

  return (
    <div 
      className="fixed top-0 right-0 h-16 bg-white border-b border-gray-200 z-30 flex items-center justify-between px-6 shadow-sm transition-all duration-300"
      style={{ left: isMinimized ? '5rem' : '16rem' }}
    >
      {/* Left Section - Menu */}
      <div className="flex items-center">
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
      </div>

      {/* Right Section - Actions & Profile */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <>
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
                <span className="text-white font-semibold text-sm">
                  {admin?.firstName?.charAt(0) || 'A'}
                </span>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">
                  {admin?.firstName} {admin?.lastName}
                </p>
                <p className="text-xs text-gray-500">{admin?.email}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                title="Logout"
              >
                <MdLogout className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Sign In / Sign Up Buttons */}
            <Link
              href="/signin"
              className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
