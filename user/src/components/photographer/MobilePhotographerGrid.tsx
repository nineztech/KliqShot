'use client';

import PhotographerCard from './PhotographerCard';
import type { Photographer } from '@/data/photographers';

interface MobilePhotographerGridProps {
  photographers: Photographer[];
  categoryName: string;
  onPhotographerClick: (photographer: Photographer) => void;
}

export default function MobilePhotographerGrid({ 
  photographers, 
  categoryName, 
  onPhotographerClick 
}: MobilePhotographerGridProps) {
  return (
    <div className="px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{categoryName} Photographers</h1>
        <p className="text-gray-600 text-sm">
          {photographers.length} talented photographer{photographers.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Photographer Grid */}
      <div className="grid grid-cols-1 gap-6">
        {photographers.map((photographer, index) => (
          <div 
            key={photographer.id}
            className="animate-fade-in-up"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <PhotographerCard
              {...photographer}
              onClick={() => onPhotographerClick(photographer)}
            />
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {photographers.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            Load More Photographers
          </button>
        </div>
      )}
    </div>
  );
}
