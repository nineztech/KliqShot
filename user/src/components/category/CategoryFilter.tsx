'use client';

import { useState } from 'react';
import { 
  CameraIcon, 
  HeartIcon, 
  UserGroupIcon, 
  SparklesIcon, 
  BuildingOffice2Icon, 
  PaintBrushIcon 
} from '@heroicons/react/24/outline';

interface CategoryFilterProps {
  onFilterChange: (filter: string) => void;
}

export default function CategoryFilter({ onFilterChange }: CategoryFilterProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = [
    { id: 'All', label: 'All', icon: CameraIcon },
    { id: 'Wedding', label: 'Wedding', icon: HeartIcon },
    { id: 'Portrait', label: 'Portrait', icon: UserGroupIcon },
    { id: 'Newborn', label: 'Newborn', icon: SparklesIcon },
    { id: 'Corporate', label: 'Corporate', icon: BuildingOffice2Icon },
    { id: 'Creative', label: 'Creative', icon: PaintBrushIcon }
  ];

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
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
              onClick={() => handleFilterClick(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
              <span>{filter.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
