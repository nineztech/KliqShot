'use client';

import { useState, useEffect } from 'react';
import DesktopAdvertisementManagement from './DesktopAdvertisementManagement';
import MobileAdvertisementManagement from './MobileAdvertisementManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';

export interface Advertisement {
  id: string;
  title: string;
  description: string;
  image: string;
  link?: string;
  position: 'banner' | 'sidebar' | 'homepage';
  isActive: boolean;
  startDate: string;
  endDate: string;
}

interface AdvertisementManagementProps {
  advertisements: Advertisement[];
  setAdvertisements: (advertisements: Advertisement[]) => void;
  onRefresh?: () => void;
}

export default function AdvertisementManagement({ advertisements, setAdvertisements, onRefresh }: AdvertisementManagementProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { isMinimized } = useSidebar();

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
    <div 
      className="transition-all duration-300"
      style={{ marginLeft: isMobile ? '0' : (isMinimized ? '5rem' : '16rem') }}
    >
      {isMobile ? (
        <MobileAdvertisementManagement 
          advertisements={advertisements} 
          setAdvertisements={setAdvertisements}
          onRefresh={onRefresh}
        />
      ) : (
        <DesktopAdvertisementManagement 
          advertisements={advertisements} 
          setAdvertisements={setAdvertisements}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
}

