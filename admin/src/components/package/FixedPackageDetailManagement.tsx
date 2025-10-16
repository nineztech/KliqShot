'use client';

import { useState, useEffect } from 'react';
import DesktopFixedPackageDetailManagement from './DesktopFixedPackageDetailManagement';
import MobileFixedPackageDetailManagement from './MobileFixedPackageDetailManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';
import { PackageGroup } from './FixedPackageTypes';

interface FixedPackageDetailManagementProps {
  packageData: PackageGroup;
  onBack: () => void;
  onSave: (updatedPackage: PackageGroup) => void;
}

export default function FixedPackageDetailManagement({
  packageData,
  onBack,
  onSave
}: FixedPackageDetailManagementProps) {
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
        <MobileFixedPackageDetailManagement
          packageData={packageData}
          onBack={onBack}
          onSave={onSave}
        />
      ) : (
        <DesktopFixedPackageDetailManagement
          packageData={packageData}
          onBack={onBack}
          onSave={onSave}
        />
      )}
    </div>
  );
}

