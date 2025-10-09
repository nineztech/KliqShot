'use client';

import Sidebar from '@/components/sidebar';
import CategoryManagement from '@/components/category';
import { useState } from 'react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    {
      id: '1',
      name: 'Wedding & Pre-Wedding',
      description: 'Capture your special day',
      photographerCount: 420,
      subCategories: [
        { id: '1-1', name: 'Haldi', photographerCount: 45 },
        { id: '1-2', name: 'Mehendi', photographerCount: 38 },
        { id: '1-3', name: 'Reception', photographerCount: 67 }
      ]
    },
    {
      id: '2',
      name: 'Portrait & Portfolio',
      description: 'Professional headshots & portraits',
      photographerCount: 380,
      subCategories: [
        { id: '2-1', name: 'Headshots', photographerCount: 78 },
        { id: '2-2', name: 'Portfolio', photographerCount: 65 }
      ]
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="categories" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="pt-16 transition-all duration-300 p-4 md:p-8">
        <CategoryManagement categories={categories} setCategories={setCategories} />
      </div>
    </div>
  );
}

