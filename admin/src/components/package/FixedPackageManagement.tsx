'use client';

import { useState, useEffect } from 'react';
import DesktopFixedPackageManagement from './DesktopFixedPackageManagement';
import MobileFixedPackageManagement from './MobileFixedPackageManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';
import { PackageGroup } from './FixedPackageTypes';

interface FixedPackageManagementProps {
  packageGroups: PackageGroup[];
  setPackageGroups: (groups: PackageGroup[]) => void;
  onConfigurePackage?: (pkg: PackageGroup) => void;
}

export default function FixedPackageManagement({ packageGroups, setPackageGroups, onConfigurePackage }: FixedPackageManagementProps) {
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
        <MobileFixedPackageManagement 
          packageGroups={packageGroups} 
          setPackageGroups={setPackageGroups}
          onConfigurePackage={onConfigurePackage}
        />
      ) : (
        <DesktopFixedPackageManagement 
          packageGroups={packageGroups} 
          setPackageGroups={setPackageGroups}
          onConfigurePackage={onConfigurePackage}
        />
      )}
    </div>
  );
}

