'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UserCircleIcon } from '@heroicons/react/24/outline';

interface ProfileDropdownProps {
  isMobile?: boolean;
}

export default function ProfileDropdown({ isMobile = false }: ProfileDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleProfileClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignupClick = () => {
    setShowDropdown(false);
    router.push('/signup');
  };

  const handleSigninClick = () => {
    setShowDropdown(false);
    router.push('/signin');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  if (isMobile) {
    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={handleProfileClick}
          className="p-1 text-white hover:text-white hover:bg-white/10 rounded-full transition-colors duration-200"
        >
          <UserCircleIcon className="h-3 w-3" />
        </button>
        
        {/* Mobile Profile Dropdown */}
        {showDropdown && (
          <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <div className="p-2">
              <div className="space-y-1">
                <button
                  onClick={handleSignupClick}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Sign Up
                </button>
                <button
                  onClick={handleSigninClick}
                  className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleProfileClick}
        className="bg-white/20 p-2 rounded-full text-white hover:text-white hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 transition-colors duration-200"
      >
        <span className="sr-only">Open user menu</span>
        <UserCircleIcon className="h-8 w-8" />
      </button>
      
      {/* Desktop Profile Dropdown */}
      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <UserCircleIcon className="h-4 w-4 text-blue-600" />
              Account
            </h3>
            <div className="space-y-1">
              <button
                onClick={handleSignupClick}
                className="w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center gap-3 group text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Sign Up</div>
                  <div className="text-xs text-gray-500">Create new account</div>
                </div>
              </button>
              <button
                onClick={handleSigninClick}
                className="w-full text-left px-3 py-2.5 text-sm rounded-lg transition-all duration-200 flex items-center gap-3 group text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="font-medium">Sign In</div>
                  <div className="text-xs text-gray-500">Access your account</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
