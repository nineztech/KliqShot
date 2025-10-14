'use client';

import { useState, useEffect } from 'react';
import DesktopPackageManagement from './DesktopPackageManagement';
import MobilePackageManagement from './MobilePackageManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  isActive: boolean;
}

interface PackageManagementProps {
  packages: Package[];
  setPackages: (packages: Package[]) => void;
  onRefresh?: () => void;
}

export default function PackageManagement({ packages, setPackages, onRefresh }: PackageManagementProps) {
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
        <MobilePackageManagement 
          packages={packages} 
          setPackages={setPackages}
          onRefresh={onRefresh}
        />
      ) : (
        <DesktopPackageManagement 
          packages={packages} 
          setPackages={setPackages}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
}

