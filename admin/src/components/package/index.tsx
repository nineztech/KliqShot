'use client';

import { useState, useEffect } from 'react';
import DesktopPackageManagement from './DesktopPackageManagement';
import MobilePackageManagement from './MobilePackageManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';

export interface CategoryPricing {
  categoryId: string;
  categoryName: string;
  price?: number;
  features: string[];
  locations?: {
    country: string;
    state: string;
    district: string;
  }[];
  subCategories: {
    subCategoryId: string;
    subCategoryName: string;
    price?: number;
    features: string[];
  }[];
}

export interface Package {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  categoryPricing: CategoryPricing[];
}

interface PackageManagementProps {
  packages: Package[];
  setPackages: (packages: Package[]) => void;
  onRefresh?: () => void;
  onConfigurePackage?: (pkg: Package) => void;
}

export default function PackageManagement({ packages, setPackages, onRefresh, onConfigurePackage }: PackageManagementProps) {
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
          onConfigurePackage={onConfigurePackage}
        />
      ) : (
        <DesktopPackageManagement 
          packages={packages} 
          setPackages={setPackages}
          onRefresh={onRefresh}
          onConfigurePackage={onConfigurePackage}
        />
      )}
    </div>
  );
}

