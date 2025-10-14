'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import PackageManagement from '@/components/package';
import PackageDetailManagement from '@/components/package/PackageDetailManagement';
import { Package } from '@/components/package';

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: '1',
      name: 'Basic Package',
      description: 'Perfect for small events and personal photography needs',
      isActive: true,
      packageType: 'individual',
      categoryPricing: []
    },
    {
      id: '2',
      name: 'Standard Package',
      description: 'Ideal for weddings and medium-sized events',
      isActive: true,
      packageType: 'individual',
      categoryPricing: []
    },
    {
      id: '3',
      name: 'Premium Package',
      description: 'Complete coverage for full-day events',
      isActive: true,
      packageType: 'individual',
      categoryPricing: []
    }
  ]);

  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');

  const handleConfigurePackage = (pkg: Package) => {
    setSelectedPackage(pkg);
    setViewMode('detail');
  };

  const handleBackToList = () => {
    setSelectedPackage(null);
    setViewMode('list');
  };

  const handleSavePackage = (updatedPackage: Package) => {
    setPackages(packages.map(pkg => 
      pkg.id === updatedPackage.id ? updatedPackage : pkg
    ));
    handleBackToList();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="packages" onTabChange={(tab) => window.location.href = `/${tab}`} />
      
      {viewMode === 'list' ? (
        <PackageManagement 
          packages={packages} 
          setPackages={setPackages}
          onConfigurePackage={handleConfigurePackage}
        />
      ) : (
        selectedPackage && (
          <PackageDetailManagement
            packageData={selectedPackage}
            onBack={handleBackToList}
            onSave={handleSavePackage}
          />
        )
      )}
    </div>
  );
}

