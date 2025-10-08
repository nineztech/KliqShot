'use client';

import { useState } from 'react';
import PhotographerCard from './PhotographerCard';
import FilterSidebar from './FilterSidebar';
import type { Photographer } from '@/data/photographers';

interface DesktopPhotographerGridProps {
  photographers: Photographer[];
  categoryName: string;
  onPhotographerClick: (photographer: Photographer) => void;
}

export default function DesktopPhotographerGrid({ 
  photographers, 
  categoryName, 
  onPhotographerClick 
}: DesktopPhotographerGridProps) {
  const [filteredPhotographers, setFilteredPhotographers] = useState(photographers);
  const [sortBy, setSortBy] = useState('relevance');

  const handleFilterChange = (filters: any) => {
    let filtered = [...photographers];

    // Apply price filter
    if (filters.priceRange) {
      filtered = filtered.filter(photographer => {
        const price = parseInt(photographer.price.replace(/[₹,]/g, ''));
        return price >= filters.priceRange[0] && price <= filters.priceRange[1];
      });
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(photographer => photographer.rating >= filters.rating);
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(photographer => 
        photographer.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply specialty filter
    if (filters.specialty) {
      filtered = filtered.filter(photographer => 
        photographer.specialty.toLowerCase().includes(filters.specialty.toLowerCase())
      );
    }

    // Apply experience filter
    if (filters.experience) {
      filtered = filtered.filter(photographer => 
        photographer.experience.includes(filters.experience)
      );
    }

    setFilteredPhotographers(filtered);
  };

  const handleSortChange = (sortType: string) => {
    setSortBy(sortType);
    let sorted = [...filteredPhotographers];

    switch (sortType) {
      case 'price-low':
        sorted.sort((a, b) => parseInt(a.price.replace(/[₹,]/g, '')) - parseInt(b.price.replace(/[₹,]/g, '')));
        break;
      case 'price-high':
        sorted.sort((a, b) => parseInt(b.price.replace(/[₹,]/g, '')) - parseInt(a.price.replace(/[₹,]/g, '')));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        sorted.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        sorted = [...photographers];
    }

    setFilteredPhotographers(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 mr-4"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{categoryName} Photographers</h1>
                <p className="text-gray-600 mt-1">
                  {filteredPhotographers.length} photographer{filteredPhotographers.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>
            
            {/* Sort Dropdown */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-4">
          {/* Left Sidebar - Filters */}
          <div className="w-64 flex-shrink-0">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Right Content - Photographer Cards */}
          <div className="flex-1 bg-white min-h-screen p-6">
            {filteredPhotographers.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredPhotographers.map((photographer, index) => (
                  <div 
                    key={photographer.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    <PhotographerCard
                      {...photographer}
                      onClick={() => onPhotographerClick(photographer)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mb-6">
                  <svg className="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">No Photographers Found</h2>
                <p className="text-gray-600 mb-8">
                  Try adjusting your filters to see more results.
                </p>
                <button
                  onClick={() => handleFilterChange({
                    priceRange: [0, 50000],
                    rating: 0,
                    location: '',
                    experience: '',
                    specialty: ''
                  })}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {filteredPhotographers.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Load More Photographers
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}