'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  MdHome, 
  MdDashboard, 
  MdPeople, 
  MdCameraAlt, 
  MdCampaign,
  MdSettings,
  MdInventory,
  MdMenu,
  MdClose,
  MdLogout,
  MdExpandMore,
  MdExpandLess,
  MdEventNote,
  MdAttachMoney,
  MdCardGiftcard,
  MdSupportAgent,
  MdHistory,
  MdSlideshow
} from 'react-icons/md';
import { useAuth } from '@/components/auth/AuthContext';
import { adminApi } from '@/lib/api';

interface MobileSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function MobileSidebar({ activeTab, onTabChange }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // Auto-expand packages submenu when on packages page
  const isPackagesActive = activeTab === 'packages' || activeTab === 'packages-individual' || activeTab === 'packages-fixed';
  const [isPackagesOpen, setIsPackagesOpen] = useState(isPackagesActive);
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdHome, href: '/' },
    { id: 'bookings', label: 'Bookings', icon: MdEventNote, href: '/bookings' },
    { id: 'categories', label: 'Categories', icon: MdDashboard, href: '/categories' },
    { id: 'photographers', label: 'Kliqchamps', icon: MdCameraAlt, href: '/photographers' },
    { id: 'users', label: 'Clients', icon: MdPeople, href: '/users' },
    { id: 'coupons', label: 'Coupons', icon: MdAttachMoney, href: '/coupons' },
    { id: 'gifts', label: 'Gifts', icon: MdCardGiftcard, href: '/gifts' },
    { id: 'tickets', label: 'Tickets', icon: MdSupportAgent, href: '/tickets' },
    { id: 'logs', label: 'Activity Logs', icon: MdHistory, href: '/logs' },
    { id: 'analytics', label: 'Advertisements', icon: MdCampaign, href: '/analytics' },
    { id: 'carousel', label: 'Carousel & Content', icon: MdSlideshow, href: '/carousel' },
    { id: 'settings', label: 'Settings', icon: MdSettings, href: '/settings' },
  ];

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await adminApi.logout();
      logout();
      setIsOpen(false);
      router.push('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if API fails, still logout locally
      logout();
      setIsOpen(false);
      router.push('/signin');
    } finally {
      setIsLoggingOut(false);
    }
  };

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
            className="admin-sidebar w-64 h-full bg-gradient-to-b from-slate-800 via-purple-800 to-indigo-900 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto">
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
                  
                  {/* Packages Menu with Submenu */}
                  <div className="space-y-1">
                    <button
                      onClick={() => setIsPackagesOpen(!isPackagesOpen)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                        activeTab === 'packages' || activeTab === 'packages-individual' || activeTab === 'packages-fixed'
                          ? 'bg-white/20 text-white backdrop-blur-sm'
                          : 'text-blue-100 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <MdInventory className={`w-5 h-5 ${(activeTab === 'packages' || activeTab === 'packages-individual' || activeTab === 'packages-fixed') ? 'text-white' : 'text-blue-200'}`} />
                        <span className="font-medium text-sm">Packages</span>
                      </div>
                      {isPackagesOpen ? <MdExpandLess className="w-5 h-5" /> : <MdExpandMore className="w-5 h-5" />}
                    </button>
                    
                    {/* Submenu */}
                    {isPackagesOpen && (
                      <div className="ml-6 space-y-1">
                        <Link
                          href="/packages/individual"
                          onClick={() => setIsOpen(false)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                            activeTab === 'packages-individual'
                              ? 'bg-white/20 text-white backdrop-blur-sm'
                              : 'text-blue-100 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span className="text-sm font-medium">Individual Packages</span>
                        </Link>
                        <Link
                          href="/packages/fixed"
                          onClick={() => setIsOpen(false)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                            activeTab === 'packages-fixed'
                              ? 'bg-white/20 text-white backdrop-blur-sm'
                              : 'text-blue-100 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <span className="text-sm font-medium">Fixed Packages</span>
                        </Link>
                      </div>
                    )}
                  </div>
                </nav>
              </div>
            </div>

            {/* Fixed Logout Button - Only show when authenticated */}
            {isAuthenticated && (
              <div className="flex-shrink-0 p-4 border-t border-white/20">
                <button 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="w-full bg-indigo-500 hover:bg-red-100 text-white hover:text-red-500 font-semibold py-3 rounded-lg transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex gap-2 items-center justify-center">
                    {isLoggingOut ? (
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <MdLogout className="w-5 h-5" />
                    )}
                    <span className="font-medium text-sm">{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
