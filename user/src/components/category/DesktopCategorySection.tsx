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

export default function DesktopCategorySection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const allCategories = [
    {
      title: "Wedding Photography",
      description: "Capture your special day with professional wedding photography services that tell your unique love story",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&h=300&fit=crop&crop=center",
      icon: <HeartIcon className="w-12 h-12 text-pink-600" />,
      category: "Wedding",
      photographerCount: 45
    },
    {
      title: "Engagement Shoot",
      description: "Romantic engagement photo sessions for couples in love, creating beautiful memories",
      imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&h=300&fit=crop&crop=center",
      icon: <SparklesIcon className="w-12 h-12 text-purple-600" />,
      category: "Wedding",
      photographerCount: 32
    },
    {
      title: "Family Portraits",
      description: "Beautiful family moments captured by professional photographers for generations to cherish",
      imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=300&fit=crop&crop=center",
      icon: <UserGroupIcon className="w-12 h-12 text-blue-600" />,
      category: "Portrait",
      photographerCount: 28
    },
    {
      title: "Corporate Events",
      description: "Professional photography for business events, conferences, and corporate gatherings",
      imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=500&h=300&fit=crop&crop=center",
      icon: <BriefcaseIcon className="w-12 h-12 text-green-600" />,
      category: "Corporate",
      photographerCount: 15
    },
    {
      title: "Graduation Photos",
      description: "Celebrate your academic achievements with professional graduation photography",
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=300&fit=crop&crop=center",
      icon: <AcademicCapIcon className="w-12 h-12 text-yellow-600" />,
      category: "Creative",
      photographerCount: 22
    },
    {
      title: "Portrait Sessions",
      description: "Professional headshots and personal portrait photography for all occasions",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop&crop=center",
      icon: <CameraIcon className="w-12 h-12 text-indigo-600" />,
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

      <div className="px-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
