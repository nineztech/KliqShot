'use client';

import React, { useState } from 'react';
import { ArrowLeftRight, TrendingDown, TrendingUp,ChevronRight, ChevronDown, LogOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useSidebar } from './SidebarContext';
import { useAuth } from '@/components/AuthContext';
import { 
  MdHome, 
  MdPeople, 
  MdCameraAlt, 
  MdSettings,
 MdPerson ,
 MdWallet
} from 'react-icons/md';

const Sidebar = () => {
  const [transactionsOpen, setTransactionsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { isMinimized } = useSidebar();
  const { logout } = useAuth();
 
  const menuItems = [
    { id: 'dashboard', icon: MdHome, label: 'Dashboard', href: '/Desktop' },
    { id: 'wallet', icon: MdWallet, label: 'My Wallet', href: '/Wallet' },
    { 
      id: 'transactions',
      icon: ArrowLeftRight,
      label: 'Bookings',
      hasSubmenu: true,
      submenu: [
        { id: 'income', icon: TrendingDown, label: 'Upcoming', href: '/transactions/income' },
        { id: 'outcome', icon: TrendingUp, label: 'History', href: '/transactions/outcome' }
      ]
    },
     { id: 'my_portfolio', icon: MdCameraAlt, label: 'My Portfolio', href: '/UserPortfolio' },
     { id: 'my_profile', icon: MdPerson, label: 'My Profile', href: '/UserProfile' },
  ];

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      logout();
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      logout();
      router.push('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Check if current path matches the item
  const isActive = (href: string) => pathname === href;

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
        {menuItems.map((item) => (
          <div key={item.id}>
            {/* Main Menu Item */}
            {item.hasSubmenu ? (
              // If has submenu, use button to toggle
              <button
                onClick={() => setTransactionsOpen(!transactionsOpen)}
                className={`w-full flex items-center ${isMinimized ? 'justify-center' : 'justify-between'} px-4 py-3 rounded-lg transition duration-200 text-indigo-100 hover:bg-indigo-500/30`}
                title={isMinimized ? item.label : ''}
              >
                <div className={`flex items-center ${isMinimized ? '' : 'gap-3'}`}>
                  <item.icon className={`w-6 h-6 flex-shrink-0 text-white  `} />
                  {!isMinimized && <span className="font-medium">{item.label}</span>}
                </div>
                {!isMinimized && (
                  transactionsOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                )}
              </button>
            ) : (
              // If no submenu, use Link for navigation
              <Link
                href={item.href!}
                className={`w-full flex items-center ${isMinimized ? 'justify-center' : 'justify-between'} px-4 py-3 rounded-lg transition duration-200 ${
                  isActive(item.href!) 
                    ? 'bg-indigo-500/50 text-white' 
                    : 'text-indigo-100 hover:bg-indigo-500/30'
                }`}
                title={isMinimized ? item.label : ''}
              >
                <div className={`flex items-center ${isMinimized ? '' : 'gap-3'}`}>
                  <item.icon className={`w-6 h-6 flex-shrink-0 text-white-600`} />
                  {!isMinimized && <span className="font-medium">{item.label}</span>}
                </div>
              </Link>
            )}
            
            {/* Submenu Items */}
            {!isMinimized && item.submenu && transactionsOpen && (
              <div className="ml-4 mt-1 space-y-1">
                {item.submenu.map((subitem) => (
                  <Link
                    key={subitem.id}
                    href={subitem.href}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition duration-200 ${
                      isActive(subitem.href)
                        ? 'bg-indigo-500/50 text-white'
                        : 'text-indigo-100 hover:bg-indigo-500/30'
                    }`}
                  >
                    <subitem.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{subitem.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Settings Button */}
        <Link
          href="/settings"
          className={`w-full flex items-center ${isMinimized ? 'justify-center' : 'gap-3'} px-4 py-3 rounded-lg transition duration-200 ${
            isActive('/settings')
              ? 'bg-indigo-500/50 text-white'
              : 'text-indigo-100 hover:bg-indigo-500/30'
          }`}
          title={isMinimized ? 'Settings' : ''}
        >
          <MdSettings className="w-5 h-5 text-white" />
          {!isMinimized && <span className="font-medium">Settings</span>}
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-4 right-4">
        <button 
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full bg-indigo-500 hover:bg-red-200 hover:text-red-500 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200 shadow-lg"
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