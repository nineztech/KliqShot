'use client';

import { useState } from 'react';
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
}

export default function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const router = useRouter();

  const filters = [
    { id: 'All', label: 'All', icon: CameraIcon },
    { id: 'Wedding', label: 'Wedding', icon: HeartIcon },
    { id: 'Portrait', label: 'Portrait', icon: UserGroupIcon },
    { id: 'Family', label: 'Family', icon: UserGroupIcon },
    { id: 'Events', label: 'Events', icon: BriefcaseIcon },
    { id: 'Maternity', label: 'Maternity', icon: SparklesIcon },
    { id: 'Product', label: 'Product', icon: ShoppingBagIcon },
    { id: 'Interior', label: 'Interior', icon: HomeIcon },
    { id: 'Fashion', label: 'Fashion', icon: SparklesIcon },
    { id: 'Sports', label: 'Sports', icon: TrophyIcon },
    // { id: 'Cinematography', label: 'Video', icon: VideoCameraIcon },
    { id: 'More', label: 'More', icon: Bars3Icon, isMoreButton: true }
  ];

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
