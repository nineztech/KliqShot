'use client';

import { useState } from 'react';
import { 
  FunnelIcon, 
  StarIcon, 
  MapPinIcon, 
  CurrencyRupeeIcon,
  ClockIcon,
  CameraIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [filters, setFilters] = useState({
    priceRange: [0, 50000],
    rating: 0,
    location: '',
    experience: '',
    specialty: ''
  });

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const removeFilter = (filterKey: string) => {
    const clearedFilters = { ...filters };
    
    if (filterKey === 'priceRange') {
      clearedFilters.priceRange = [0, 50000];
    } else if (filterKey === 'rating') {
      clearedFilters.rating = 0;
    } else {
      (clearedFilters as any)[filterKey] = '';
    }
    
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: [0, 50000],
      rating: 0,
      location: '',
      experience: '',
      specialty: ''
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const getAppliedFilters = () => {
    const applied: { key: string; label: string; value: string }[] = [];
    
    if (filters.priceRange[1] < 50000) {
      applied.push({
        key: 'priceRange',
        label: `Price up to ₹${filters.priceRange[1].toLocaleString()}`,
        value: 'priceRange'
      });
    }
    
    if (filters.rating > 0) {
      applied.push({
        key: 'rating',
        label: `${filters.rating}+ Stars`,
        value: 'rating'
      });
    }
    
    if (filters.location) {
      applied.push({
        key: 'location',
        label: filters.location,
        value: 'location'
      });
    }
    
    if (filters.experience) {
      applied.push({
        key: 'experience',
        label: filters.experience,
        value: 'experience'
      });
    }
    
    if (filters.specialty) {
      applied.push({
        key: 'specialty',
        label: filters.specialty,
        value: 'specialty'
      });
    }
    
    return applied;
  };

  const locations = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Pune', 'Hyderabad'];
  const specialties = ['Wedding', 'Portrait', 'Corporate', 'Family', 'Events', 'Creative'];
  const experienceLevels = ['1-2 years', '3-5 years', '5+ years', '10+ years'];

  const appliedFilters = getAppliedFilters();

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 p-4 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
      {/* Header */}
      <div className="flex items-center mb-4">
        <FunnelIcon className="w-5 h-5 text-gray-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
      </div>

      {/* Applied Filters */}
      {appliedFilters.length > 0 && (
        <div className="mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900">Applied Filters</h3>
            <button
              onClick={clearAllFilters}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              CLEAR ALL
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {appliedFilters.map((filter) => (
              <div
                key={filter.key}
                className="flex items-center bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-xs"
              >
                <span className="text-blue-700 font-medium">{filter.label}</span>
                <button
                  onClick={() => removeFilter(filter.key)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
          <CurrencyRupeeIcon className="w-4 h-4 mr-1" />
          Price Range
        </h3>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="50000"
            step="1000"
            value={filters.priceRange[1]}
            onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-600">
            <span>₹{filters.priceRange[0].toLocaleString()}</span>
            <span>₹{filters.priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
          <StarIcon className="w-4 h-4 mr-1" />
          Customer Reviews
        </h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={(e) => handleFilterChange('rating', parseInt(e.target.value))}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 transition-all duration-200 ${
                filters.rating === rating 
                  ? 'border-blue-600 bg-blue-600' 
                  : 'border-gray-300 group-hover:border-blue-400'
              }`}>
                {filters.rating === rating && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                )}
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-700">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
          <MapPinIcon className="w-4 h-4 mr-1" />
          Location
        </h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {locations.map((location) => (
            <label key={location} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.location === location}
                onChange={(e) => handleFilterChange('location', e.target.checked ? location : '')}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded border-2 mr-3 transition-all duration-200 ${
                filters.location === location 
                  ? 'border-blue-600 bg-blue-600' 
                  : 'border-gray-300 group-hover:border-blue-400'
              }`}>
                {filters.location === location && (
                  <svg className="w-2 h-2 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                {location}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Specialty Filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
          <CameraIcon className="w-4 h-4 mr-1" />
          Specialty
        </h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {specialties.map((specialty) => (
            <label key={specialty} className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.specialty === specialty}
                onChange={(e) => handleFilterChange('specialty', e.target.checked ? specialty : '')}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded border-2 mr-3 transition-all duration-200 ${
                filters.specialty === specialty 
                  ? 'border-blue-600 bg-blue-600' 
                  : 'border-gray-300 group-hover:border-blue-400'
              }`}>
                {filters.specialty === specialty && (
                  <svg className="w-2 h-2 text-white m-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                {specialty}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience Filter */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
          <ClockIcon className="w-4 h-4 mr-1" />
          Experience
        </h3>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center cursor-pointer group">
              <input
                type="radio"
                name="experience"
                value={level}
                checked={filters.experience === level}
                onChange={(e) => handleFilterChange('experience', e.target.value)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 transition-all duration-200 ${
                filters.experience === level 
                  ? 'border-blue-600 bg-blue-600' 
                  : 'border-gray-300 group-hover:border-blue-400'
              }`}>
                {filters.experience === level && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                )}
              </div>
              <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors duration-200">
                {level}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={clearAllFilters}
        className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
      >
        Clear All Filters
      </button>
    </div>
  );
}
