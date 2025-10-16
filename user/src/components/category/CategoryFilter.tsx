'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  CameraIcon, 
  HeartIcon, 
  UserGroupIcon, 
  SparklesIcon, 
  BriefcaseIcon,
  ShoppingBagIcon,
  HomeIcon,
  TrophyIcon,
  VideoCameraIcon,
  Bars3Icon
} from '@heroicons/react/24/outline';

interface CategoryFilterProps {
  onFilterChange: (filter: string) => void;
  categories?: { id: string; name: string }[];
}

// Icon mapping based on category name
const getCategoryFilterIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes('wedding') || name.includes('haldi') || name.includes('mehendi')) {
    return HeartIcon;
  } else if (name.includes('portrait') || name.includes('photo')) {
    return UserGroupIcon;
  } else if (name.includes('event') || name.includes('corporate')) {
    return BriefcaseIcon;
  } else if (name.includes('family') || name.includes('couple')) {
    return UserGroupIcon;
  } else if (name.includes('maternity')) {
    return SparklesIcon;
  } else if (name.includes('product')) {
    return ShoppingBagIcon;
  } else if (name.includes('interior') || name.includes('real estate')) {
    return HomeIcon;
  } else if (name.includes('fashion')) {
    return SparklesIcon;
  } else if (name.includes('sport')) {
    return TrophyIcon;
  } else if (name.includes('video') || name.includes('cinema')) {
    return VideoCameraIcon;
  }
  return CameraIcon;
};

export default function CategoryFilter({ onFilterChange, categories = [] }: CategoryFilterProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [filters, setFilters] = useState<any[]>([
    { id: 'All', label: 'All', icon: CameraIcon }
  ]);
  const router = useRouter();

  useEffect(() => {
    if (categories.length > 0) {
      // Build dynamic filters from categories
      const dynamicFilters = [
        { id: 'All', label: 'All', icon: CameraIcon },
        ...categories.slice(0, 9).map(cat => ({
          id: cat.name,
          label: cat.name,
          icon: getCategoryFilterIcon(cat.name)
        })),
        { id: 'More', label: 'More', icon: Bars3Icon, isMoreButton: true }
      ];
      setFilters(dynamicFilters);
    }
  }, [categories]);

  const handleFilterClick = (filterId: string, isMoreButton?: boolean) => {
    if (isMoreButton) {
      router.push('/categories');
    } else {
      setActiveFilter(filterId);
      onFilterChange(filterId);
    }
  };

  return (
    <div className="px-2 sm:px-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => {
          const Icon = filter.icon;
          const isActive = activeFilter === filter.id;
          
          return (
            <button
              key={filter.id}
              onClick={() => handleFilterClick(filter.id, filter.isMoreButton)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                filter.isMoreButton
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : isActive
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive || filter.isMoreButton ? 'text-white' : 'text-gray-600'}`} />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
