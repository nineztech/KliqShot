'use client';

import { useState, useEffect } from 'react';
import DesktopPackageManagement from './DesktopPackageManagement';
import MobilePackageManagement from './MobilePackageManagement';
import CityGroupManagement from './CityGroupManagement';
import DesktopPackageDetailManagement from './DesktopPackageDetailManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';

export interface CategoryPricing {
  categoryId: string;
  categoryName: string;
  price?: number;
  features: string[];
  subCategories: {
    subCategoryId: string;
    subCategoryName: string;
    price?: number;
    features: string[];
  }[];
}

export interface CityGroup {
  id: string;
  name: string;
  description: string;
  locations: {
    country: string;
    state: string;
    district: string;
  }[];
  isActive: boolean;
  categoryPricing?: CategoryPricing[];
}

export interface Package {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  cityGroups?: CityGroup[];
  // Legacy support - will be migrated to cityGroups
  categoryPricing?: CategoryPricing[];
}

interface PackageManagementProps {
  packages: Package[];
  setPackages: (packages: Package[]) => void;
  onRefresh?: () => void;
}

type ViewType = 'packages' | 'cityGroups' | 'categoryPricing';

export default function PackageManagement({ packages, setPackages, onRefresh }: PackageManagementProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('packages');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [selectedCityGroupId, setSelectedCityGroupId] = useState<string | null>(null);
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

  const handleConfigurePackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setCurrentView('cityGroups');
  };

  const handleConfigureCityGroup = (packageData: Package, groupId: string) => {
    setSelectedPackage(packageData);
    setSelectedCityGroupId(groupId);
    setCurrentView('categoryPricing');
  };

  const handleBackToPackages = () => {
    setCurrentView('packages');
    setSelectedPackage(null);
    setSelectedCityGroupId(null);
  };

  const handleBackToCityGroups = () => {
    setCurrentView('cityGroups');
    setSelectedCityGroupId(null);
  };

  const handleSavePackage = (updatedPackage: Package) => {
    setPackages(packages.map(pkg => 
      pkg.id === updatedPackage.id ? updatedPackage : pkg
    ));
    setSelectedPackage(updatedPackage);
  };

  const handleSaveCategoryPricing = (updatedPackage: Package) => {
    setPackages(packages.map(pkg => 
      pkg.id === updatedPackage.id ? updatedPackage : pkg
    ));
    setSelectedPackage(updatedPackage);
  };

  const renderContent = () => {
    if (currentView === 'categoryPricing' && selectedPackage && selectedCityGroupId) {
      const cityGroup = selectedPackage.cityGroups?.find(group => group.id === selectedCityGroupId);
      if (cityGroup) {
        // Create a temporary package with the city group's category pricing
        const tempPackage: Package = {
          ...selectedPackage,
          categoryPricing: cityGroup.categoryPricing || []
        };
        
        return (
          <DesktopPackageDetailManagement
            packageData={tempPackage}
            onBack={handleBackToCityGroups}
            cityGroupName={cityGroup.name}
            onSave={(updatedPackage) => {
              // Update the city group's category pricing
              const updatedCityGroups = selectedPackage.cityGroups?.map(group =>
                group.id === selectedCityGroupId
                  ? { ...group, categoryPricing: updatedPackage.categoryPricing }
                  : group
              );
              const finalPackage = { ...selectedPackage, cityGroups: updatedCityGroups };
              handleSaveCategoryPricing(finalPackage);
            }}
          />
        );
      }
    }

    if (currentView === 'cityGroups' && selectedPackage) {
      return (
        <CityGroupManagement
          packageData={selectedPackage}
          onBack={handleBackToPackages}
          onConfigureGroup={handleConfigureCityGroup}
          onSave={handleSavePackage}
        />
      );
    }

    // Default packages view
    return isMobile ? (
      <MobilePackageManagement 
        packages={packages} 
        setPackages={setPackages}
        onRefresh={onRefresh}
        onConfigurePackage={handleConfigurePackage}
      />
    ) : (
      <DesktopPackageManagement 
        packages={packages} 
        setPackages={setPackages}
        onRefresh={onRefresh}
        onConfigurePackage={handleConfigurePackage}
      />
    );
  };

  return (
    <div 
      className="transition-all duration-300"
      style={{ marginLeft: isMobile ? '0' : (isMinimized ? '5rem' : '16rem') }}
    >
      {renderContent()}
    </div>
  );
}

