'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import PackageManagement from '@/components/package';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  isActive: boolean;
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([
    {
      id: '1',
      name: 'Basic Package',
      description: 'Perfect for small events and personal photography needs',
      price: 299,
      duration: '3 hours',
      features: [
        '3 hours of photography',
        '50 edited photos',
        'Online gallery',
        'Digital delivery'
      ],
      isActive: true
    },
    {
      id: '2',
      name: 'Standard Package',
      description: 'Ideal for weddings and medium-sized events',
      price: 599,
      duration: '6 hours',
      features: [
        '6 hours of photography',
        '150 edited photos',
        'Online gallery',
        'Digital delivery',
        'Second photographer',
        'USB drive included'
      ],
      isActive: true
    },
    {
      id: '3',
      name: 'Premium Package',
      description: 'Complete coverage for full-day events',
      price: 999,
      duration: 'Full day',
      features: [
        'Full day coverage (8+ hours)',
        '300+ edited photos',
        'Online gallery',
        'Digital delivery',
        'Two photographers',
        'USB drive & prints',
        'Photo album',
        'Engagement shoot'
      ],
      isActive: true
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="packages" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <PackageManagement 
        packages={packages} 
        setPackages={setPackages}
      />
    </div>
  );
}

