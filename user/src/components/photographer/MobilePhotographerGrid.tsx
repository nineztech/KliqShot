'use client';

import PhotographerCard from './PhotographerCard';

interface Photographer {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  experience: string;
  image: string;
  description: string;
}

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
      <div className="text-center mb-4">
        <h1 className="section-title section-title-mobile mb-2">{categoryName} Photographers</h1>
        <p className="section-description section-description-mobile">
          {photographers.length} photographer{photographers.length !== 1 ? 's' : ''} available in your area
        </p>
      </div>

      {/* Photographer Grid */}
      <div className="grid grid-cols-1 gap-4">
        {photographers.map((photographer) => (
          <PhotographerCard
            key={photographer.id}
            {...photographer}
            onClick={() => onPhotographerClick(photographer)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {photographers.length > 0 && (
        <div className="text-center mt-6">
          <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
            Load More Photographers
          </button>
        </div>
      )}
    </div>
  );
}
