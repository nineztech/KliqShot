'use client';

import { useState, useEffect } from 'react';
import DesktopSidebar from './DesktopSidebar';
import MobileSidebar from './MobileSidebar';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileSidebar activeTab={activeTab} onTabChange={onTabChange} />
      ) : (
        <DesktopSidebar activeTab={activeTab} onTabChange={onTabChange} />
      )}
    </>
  );
}
