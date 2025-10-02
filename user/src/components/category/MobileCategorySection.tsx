'use client';

import { useState } from 'react';
import CategoryCard from './CategoryCard';
import CategoryFilter from './CategoryFilter';
import { 
  HeartIcon, 
  UserGroupIcon, 
  CameraIcon,
  SparklesIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

export default function MobileCategorySection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const allCategories = [
    {
      title: "Wedding",
      description: "Capture your special day",
      imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop&crop=center&auto=format",
      icon: <HeartIcon className="w-8 h-8 text-pink-600" />,
      category: "Wedding",
      photographerCount: 420
    },
    {
      title: "Portrait",
      description: "Professional headshots & portraits",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=400&fit=crop&crop=center&auto=format",
      icon: <CameraIcon className="w-8 h-8 text-indigo-600" />,
      category: "Portrait",
      photographerCount: 380
    },
    {
      title: "Events",
      description: "Corporate & social events",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&crop=center&auto=format",
      icon: <BriefcaseIcon className="w-8 h-8 text-green-600" />,
      category: "Events",
      photographerCount: 290
    },
    {
      title: "Family",
      description: "Beautiful family moments",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=400&fit=crop&crop=center&auto=format",
      icon: <UserGroupIcon className="w-8 h-8 text-blue-600" />,
      category: "Family",
      photographerCount: 350
    },
    {
      title: "Product",
      description: "Professional product shoots",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center&auto=format",
      icon: <SparklesIcon className="w-8 h-8 text-purple-600" />,
      category: "Product",
      photographerCount: 240
    },
    {
      title: "Maternity",
      description: "Beautiful maternity moments",
      imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop&crop=center&auto=format",
      icon: <SparklesIcon className="w-8 h-8 text-pink-500" />,
      category: "Maternity",
      photographerCount: 180
    },
    {
      title: "Interior",
      description: "Property photography",
      imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&crop=center&auto=format",
      icon: <AcademicCapIcon className="w-8 h-8 text-orange-600" />,
      category: "Interior",
      photographerCount: 160
    },
    {
      title: "Fashion",
      description: "Fashion and beauty shoots",
      imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop&crop=center&auto=format",
      icon: <SparklesIcon className="w-8 h-8 text-purple-500" />,
      category: "Fashion",
      photographerCount: 200
    },
    {
      title: "Sports",
      description: "Sports and fitness photography",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center&auto=format",
      icon: <AcademicCapIcon className="w-8 h-8 text-red-600" />,
      category: "Sports",
      photographerCount: 120
    },
    {
      title: "Video",
      description: "Video and cinematography",
      imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop&crop=center&auto=format",
      icon: <CameraIcon className="w-8 h-8 text-blue-500" />,
      category: "Cinematography",
      photographerCount: 150
    }
  ];

  const handleCategoryClick = (category: string) => {
    console.log(`Category clicked: ${category}`);
    // TODO: Navigate to category page
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  // Filter categories based on active filter
  const filteredCategories = activeFilter === 'All' 
    ? allCategories 
    : allCategories.filter(cat => cat.category === activeFilter);

  return (
    <div>
      {/* Category Filter */}
      <CategoryFilter onFilterChange={handleFilterChange} />

      <div className="px-2 mt-4">
        <div className="grid grid-cols-2 gap-2">
          {filteredCategories.map((category, index) => (
              <CategoryCard
                key={index}
                title={category.title}
                description={category.description}
                imageUrl={category.imageUrl}
                icon={category.icon}
                photographerCount={category.photographerCount}
                category={category.category}
                onClick={() => handleCategoryClick(category.title)}
              />
          ))}
        </div>
      </div>
    </div>
  );
}
