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
  return (
    <div className="px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="section-title section-title-desktop mb-4">{categoryName} Photographers</h1>
        <p className="section-description section-description-desktop max-w-2xl mx-auto">
          {photographers.length} photographer{photographers.length !== 1 ? 's' : ''} available in your area
        </p>
      </div>

      {/* Photographer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="text-center mt-12">
          <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
            Load More Photographers
          </button>
        </div>
      )}
    </div>
  );
}
