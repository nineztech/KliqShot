'use client';

import { useRouter } from 'next/navigation';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

interface PhotographerCardProps {
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
  onClick?: () => void;
}

export default function PhotographerCard({
  id,
  name,
  specialty,
  location,
  rating,
  reviews,
  price,
  experience,
  image,
  description,
  onClick
}: PhotographerCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/photographer/${id}`);
    }
  };
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarSolidIcon key={i} className="w-4 h-4 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <StarOutlineIcon className="w-4 h-4 text-gray-300" />
            <div className="absolute inset-0 w-2 h-4 overflow-hidden">
              <StarSolidIcon className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarOutlineIcon key={i} className="w-4 h-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden group"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        {/* Photographer Info */}
        <div className="flex items-start space-x-3 mb-3">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <h3 className="card-title card-title-mobile md:card-title-desktop group-hover:text-blue-600 transition-colors duration-200 truncate">
              {name}
            </h3>
            <p className="text-blue-600 font-medium text-sm truncate">{specialty}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {renderStars()}
          </div>
          <span className="text-gray-600 text-sm">
            {rating} ({reviews} reviews)
          </span>
        </div>

        {/* Description */}
        <p className="card-description card-description-mobile md:card-description-desktop line-clamp-2 mb-3">
          {description}
        </p>

        {/* Location and Experience */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <span className="text-gray-500 text-xs">Location</span>
            <p className="font-medium text-gray-900 text-xs truncate">{location}</p>
          </div>
          <div>
            <span className="text-gray-500 text-xs">Experience</span>
            <p className="font-medium text-gray-900 text-xs">{experience}</p>
          </div>
        </div>

        {/* Price and Book Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-blue-600">{price}</span>
            <span className="text-gray-500 text-sm ml-1">per session</span>
          </div>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Handle booking
              console.log(`Book ${name}`);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
