'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import FixedPackageManagement from '@/components/package/FixedPackageManagement';
import FixedPackageDetailManagement from '@/components/package/FixedPackageDetailManagement';
import { PackageGroup } from '@/components/package/FixedPackageTypes';

export default function FixedPackagesPage() {
  const [packageGroups, setPackageGroups] = useState<PackageGroup[]>([
    {
      id: '1',
      name: 'Basic Package',
      description: 'Perfect for small events and personal photography needs',
      isActive: true,
      subPackages: [
        {
          id: '1-1',
          name: 'Wedding Basic',
          categoryId: '1',
          categoryName: 'Wedding Photography',
          duration: '4 hours',
          totalPrice: 299,
          isActive: true
        },
        {
          id: '1-2',
          name: 'Birthday Basic',
          categoryId: '2',
          categoryName: 'Birthday Photography',
          duration: '2 hours',
          totalPrice: 149,
          isActive: true
        }
      ]
    },
    {
      id: '2',
      name: 'Premium Package',
      description: 'Complete coverage for full-day events with premium features',
      isActive: true,
      subPackages: [
        {
          id: '2-1',
          name: 'Wedding Premium',
          categoryId: '1',
          categoryName: 'Wedding Photography',
          duration: '8 hours',
          totalPrice: 799,
          isActive: true
        },
        {
          id: '2-2',
          name: 'Corporate Premium',
          categoryId: '3',
          categoryName: 'Corporate Events',
          duration: '6 hours',
          totalPrice: 599,
          isActive: true
        }
      ]
    }
  ]);

  const [selectedPackageGroup, setSelectedPackageGroup] = useState<PackageGroup | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  const handleConfigurePackage = (pkg: PackageGroup) => {
    setSelectedPackageGroup(pkg);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setSelectedPackageGroup(null);
    setViewMode('list');
  };

  const handleSavePackage = (updatedPackage: PackageGroup) => {
    setPackageGroups(packageGroups.map(pkg => 
      pkg.id === updatedPackage.id ? updatedPackage : pkg
    ));
    handleBackToList();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="packages-fixed" onTabChange={(tab) => window.location.href = `/${tab}`} />
      
      {viewMode === 'list' ? (
        <FixedPackageManagement 
          packageGroups={packageGroups} 
          setPackageGroups={setPackageGroups}
          onConfigurePackage={handleConfigurePackage}
        />
      ) : (
        selectedPackageGroup && (
          <FixedPackageDetailManagement
            packageData={selectedPackageGroup}
            onBack={handleBackToList}
            onSave={handleSavePackage}
          />
        )
      )}
    </div>
  );
}

