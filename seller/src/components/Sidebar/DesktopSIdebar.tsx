'use client';

import React, { useState } from 'react';
import { Home, Package, Wallet, ArrowLeftRight, TrendingDown, TrendingUp, Settings, ChevronRight, ChevronDown, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSidebar } from './SidebarContext'; // Import the context
import { useAuth } from '@/components/AuthContext';

const Sidebar = () => {
  const [transactionsOpen, setTransactionsOpen] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const { isMinimized } = useSidebar(); // Get the minimized state
  const { logout } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true, href: '/' },
    { icon: Package, label: 'Products', hasSubmenu: true, href: '/Desktop'},
    { icon: Wallet, label: 'My Wallet', hasSubmenu: true, href: '/wallet' },
    { 
      icon: ArrowLeftRight, 
      label: 'Transactions', 
      hasSubmenu: true,
      isOpen: transactionsOpen,
      submenu: [
        { icon: TrendingDown, label: 'Income', href: '/transactions/income' },
        { icon: TrendingUp, label: 'Outcome', href: '/transactions/outcome' }
      ]
    },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Call AuthContext logout to clear all tokens and cookies
      logout();
      
      // Redirect to signin page
      router.push('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      // Still logout and redirect even on error
      logout();
      router.push('/signin');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className={`${isMinimized ? 'w-20' : 'w-64'} ease-in-out bg-gradient-to-b from-slate-800 via-purple-800 to-indigo-900 h-screen fixed left-0 top-0 text-white z-20 transition-all duration-300`}>
      {/* Logo/Brand Section */}
      <div className={`${isMinimized ? 'p-6' : 'p-6'} transition-all duration-300`}>
        <div className="flex items-center justify-center">
          <div className={`relative ${isMinimized ? 'w-12 h-12' : 'w-40 h-16'} transition-all duration-300`}>
            {isMinimized ? (
              <Image
                src="/Logo_Icon2.png"
                alt="KliqShot Logo"
                fill
                className="object-contain"
                priority
              />
            ) : (
              <Image
                src="/main Logo.png"
                alt="KliqShot Logo"
                fill
                className="object-contain"
                priority
              />
            )}
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 space-y-1">
        {menuItems.map((item, index) => (
          <div key={index}>
            <button
              onClick={() => item.label === 'Transactions' && setTransactionsOpen(!transactionsOpen)}
              className={`w-full flex items-center ${isMinimized ? 'justify-center' : 'justify-between'} px-4 py-3 rounded-lg transition duration-200 ${
                item.active 
                  ? 'bg-indigo-500/50 text-white' 
                  : 'text-indigo-100 hover:bg-indigo-500/30'
              }`}
              title={isMinimized ? item.label : ''}
            >
              <div className={`flex items-center ${isMinimized ? '' : 'gap-3'}`}>
                <item.icon className="w-5 h-5 text-white" />
                {!isMinimized && <span className="font-medium">{item.label}</span>}
              </div>
              {!isMinimized && item.hasSubmenu && (
                item.isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
              )}
            </button>
            
            {/* Submenu Items */}
            {!isMinimized && item.submenu && item.isOpen && (
              <div className="ml-4 mt-1 space-y-1">
                {item.submenu.map((subitem, subIndex) => (
                  <button
                    key={subIndex}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-indigo-100 hover:bg-indigo-500/30 transition duration-200"
                  >
                    <subitem.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{subitem.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Settings Button */}
        <button 
          className={`w-full flex items-center ${isMinimized ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg text-indigo-100 hover:bg-indigo-500/30 transition duration-200`}
          title={isMinimized ? 'Settings' : ''}
        >
          <Settings className="w-5 h-5 text-white" />
          {!isMinimized && <span className="font-medium">Settings</span>}
        </button>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-4 right-4">
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full bg-indigo-500 hover:bg-red-100 disabled:cursor-not-allowed text-white hover:text-red-500 font-semibold py-3 rounded-lg transition duration-200 shadow-lg"
          title={isMinimized ? 'Log out' : ''}
        >
          <div className={`flex gap-2 items-center justify-center ${isMinimized ? 'px-0' : ''}`}>
            <LogOut className="w-5 h-5" />
            {!isMinimized && (
              <span className="font-medium">
                {isLoggingOut ? 'Logging out...' : 'Log out'}
              </span>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;