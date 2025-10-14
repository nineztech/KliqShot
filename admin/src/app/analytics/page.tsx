'use client';

import Sidebar from '@/components/sidebar';
import AdvertisementManagement from '@/components/advertisement';
import { useState } from 'react';
import { Advertisement } from '@/components/advertisement';

// Static advertisement data
const initialAdvertisements: Advertisement[] = [
  {
    id: '1',
    title: 'Summer Photography Special',
    description: 'Get 30% off on all wedding photography packages this summer season',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    link: 'https://example.com/summer-special',
    position: 'banner',
    isActive: true,
    startDate: '2025-06-01',
    endDate: '2025-08-31'
  },
  {
    id: '2',
    title: 'Portrait Session Promo',
    description: 'Book your professional portrait session today and get a free photo album',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800',
    link: 'https://example.com/portrait-promo',
    position: 'sidebar',
    isActive: true,
    startDate: '2025-05-01',
    endDate: '2025-12-31'
  },
  {
    id: '3',
    title: 'Event Coverage Package',
    description: 'Premium event photography and videography services for corporate events',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    link: 'https://example.com/event-package',
    position: 'homepage',
    isActive: false,
    startDate: '2025-07-01',
    endDate: '2025-09-30'
  }
];

export default function AdvertisementPage() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>(initialAdvertisements);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="analytics" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="pt-16 transition-all duration-300 p-4 md:p-8">
        <AdvertisementManagement 
          advertisements={advertisements} 
          setAdvertisements={setAdvertisements}
        />
      </div>
    </div>
  );
}

