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
      title: "Wedding Photography",
      description: "Capture your special day with professional wedding photography services",
      imageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop&crop=center",
      icon: <HeartIcon className="w-8 h-8 text-pink-600" />,
      category: "Wedding",
      photographerCount: 45
    },
    {
      title: "Engagement Shoot",
      description: "Romantic engagement photo sessions for couples in love",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop&crop=center",
      icon: <SparklesIcon className="w-8 h-8 text-purple-600" />,
      category: "Wedding",
      photographerCount: 32
    },
    {
      title: "Family Portraits",
      description: "Beautiful family moments captured by professional photographers",
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=400&fit=crop&crop=center",
      icon: <UserGroupIcon className="w-8 h-8 text-blue-600" />,
      category: "Portrait",
      photographerCount: 28
    },
    {
      title: "Corporate Events",
      description: "Professional photography for business events and conferences",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&crop=center",
      icon: <BriefcaseIcon className="w-8 h-8 text-green-600" />,
      category: "Corporate",
      photographerCount: 15
    },
    {
      title: "Graduation Photos",
      description: "Celebrate your achievements with graduation photography",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop&crop=center",
      icon: <AcademicCapIcon className="w-8 h-8 text-yellow-600" />,
      category: "Creative",
      photographerCount: 22
    },
    {
      title: "Portrait Sessions",
      description: "Professional headshots and personal portrait photography",
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=400&fit=crop&crop=center",
      icon: <CameraIcon className="w-8 h-8 text-indigo-600" />,
      category: "Portrait",
      photographerCount: 38
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
