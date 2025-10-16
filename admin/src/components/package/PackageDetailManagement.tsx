'use client';

import { useState, useEffect } from 'react';
import DesktopPackageDetailManagement from './DesktopPackageDetailManagement';
import MobilePackageDetailManagement from './MobilePackageDetailManagement';
import DesktopFixedPackageDetailManagement from './DesktopFixedPackageDetailManagement';
import MobileFixedPackageDetailManagement from './MobileFixedPackageDetailManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';
import { Package } from './index';

interface PackageDetailManagementProps {
  packageData: Package;
  onBack: () => void;
  onSave: (updatedPackage: Package) => void;
}

export default function PackageDetailManagement({
  packageData,
  onBack,
  onSave
}: PackageDetailManagementProps) {
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
      {packageData.packageType === 'fixed' ? (
        isMobile ? (
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
        )
      ) : (
        isMobile ? (
          <MobilePackageDetailManagement
            packageData={packageData}
            onBack={onBack}
            onSave={onSave}
          />
        ) : (
          <DesktopPackageDetailManagement
            packageData={packageData}
            onBack={onBack}
            onSave={onSave}
          />
        )
      )}
    </div>
  );
}

