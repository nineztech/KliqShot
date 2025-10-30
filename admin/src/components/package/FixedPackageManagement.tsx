'use client';

import { useState, useEffect } from 'react';
import DesktopFixedPackageManagement from './DesktopFixedPackageManagement';
import MobileFixedPackageManagement from './MobileFixedPackageManagement';
import FixedCityGroupManagement from './FixedCityGroupManagement';
import DesktopFixedPackageDetailManagement from './DesktopFixedPackageDetailManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';
import { PackageGroup } from './FixedPackageTypes';

interface FixedPackageManagementProps {
  packageGroups: PackageGroup[];
  setPackageGroups: (groups: PackageGroup[]) => void;
  onConfigurePackage?: (pkg: PackageGroup) => void;
}

export default function FixedPackageManagement({ packageGroups, setPackageGroups, onConfigurePackage }: FixedPackageManagementProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [currentView, setCurrentView] = useState<'groups' | 'cityGroups' | 'detail'>('groups');
  const [selectedGroup, setSelectedGroup] = useState<PackageGroup | null>(null);
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

  const handleConfigureGroup = (pkg: PackageGroup) => {
    setSelectedGroup(pkg);
    setCurrentView('cityGroups');
  };

  const handleConfigureCityGroup = (pkg: PackageGroup, groupId: string) => {
    setSelectedGroup(pkg);
    setSelectedCityGroupId(groupId);
    setCurrentView('detail');
  };

  const handleBackToGroups = () => {
    setCurrentView('groups');
    setSelectedGroup(null);
    setSelectedCityGroupId(null);
  };

  const handleBackToCityGroups = () => {
    setCurrentView('cityGroups');
    setSelectedCityGroupId(null);
  };

  const savePackageGroup = (updated: PackageGroup) => {
    setPackageGroups(packageGroups.map(g => g.id === updated.id ? updated : g));
    setSelectedGroup(updated);
  };

  const renderContent = () => {
    if (currentView === 'detail' && selectedGroup && selectedCityGroupId) {
      const cityGroup = (selectedGroup.cityGroups || []).find(g => g.id === selectedCityGroupId);
      if (cityGroup) {
        const tempPackage: PackageGroup = { ...selectedGroup, subPackages: cityGroup.subPackages || [] };
        return (
          <DesktopFixedPackageDetailManagement
            packageData={tempPackage}
            onBack={handleBackToCityGroups}
            onSave={(updatedTemp) => {
              const updatedCityGroups = (selectedGroup.cityGroups || []).map(g => g.id === selectedCityGroupId ? { ...g, subPackages: updatedTemp.subPackages } : g);
              const finalPackage = { ...selectedGroup, cityGroups: updatedCityGroups } as PackageGroup;
              savePackageGroup(finalPackage);
            }}
          />
        );
      }
    }

    if (currentView === 'cityGroups' && selectedGroup) {
      return (
        <FixedCityGroupManagement
          packageData={selectedGroup}
          onBack={handleBackToGroups}
          onConfigureGroup={handleConfigureCityGroup}
          onSave={savePackageGroup}
        />
      );
    }

    return isMobile ? (
      <MobileFixedPackageManagement 
        packageGroups={packageGroups} 
        setPackageGroups={setPackageGroups}
        onConfigurePackage={handleConfigureGroup}
      />
    ) : (
      <DesktopFixedPackageManagement 
        packageGroups={packageGroups} 
        setPackageGroups={setPackageGroups}
        onConfigurePackage={handleConfigureGroup}
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

