'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon, MapPinIcon, ClockIcon, CameraIcon } from '@heroicons/react/24/outline';

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
  category: string;
  subCategory?: string;
  categories?: string[];
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
  category,
  subCategory,
  categories,
  onClick
}: PhotographerCardProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showRatingPopup, setShowRatingPopup] = useState(false);

  // Generate sample portfolio images based on photographer's specialty
  const generatePortfolioImages = () => {
    const baseImages = [
      image, // Main profile image
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop&crop=center&auto=format"
    ];
    
    // Add specialty-specific images
    if (specialty.toLowerCase().includes('wedding') || specialty.toLowerCase().includes('haldi') || specialty.toLowerCase().includes('mehendi')) {
      return [
        ...baseImages,
        "https://images.unsplash.com/photo-1520854221256-17449cc91bf9?w=400&h=300&fit=crop&crop=center&auto=format",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&crop=center&auto=format"
      ];
    } else if (specialty.toLowerCase().includes('portrait') || specialty.toLowerCase().includes('headshot')) {
      return [
        ...baseImages,
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&auto=format",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=center&auto=format"
      ];
    }
    
    return baseImages;
  };

  const portfolioImages = generatePortfolioImages();

  // Auto-rotate images when hovered
  useEffect(() => {
    if (isHovered && portfolioImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % portfolioImages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered, portfolioImages.length]);

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
          <StarSolidIcon key={i} className="w-4 h-4 text-yellow-400 transition-all duration-200 group-hover:scale-110" />
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
      className="bg-white border border-gray-200 rounded-xl hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer  group transform hover:-translate-y-2 hover:scale-[1.02]"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
         {/* Animated Image Gallery Section */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Main Image */}
        <div className="relative w-full h-full">
            <img
              src={portfolioImages[currentImageIndex]}
              alt={`${name} portfolio ${currentImageIndex + 1}`}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-110"
            />
          
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Trusted Badge */}
            <div className="absolute top-3 left-3 text-cyan-400 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                <path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="white"/>
              </svg>
              <span className="italic text-[10px] font-bold">TRUSTED</span>
            </div>
            
            {/* Like Button */}
          <button
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
          >
            <HeartIcon className={`w-5 h-5 transition-colors duration-200 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </button>
          
          {/* Category Badge */}
          <div className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <CameraIcon className="w-3 h-3 inline mr-1" />
            {specialty}
          </div>
        </div>
        
        {/* Image Dots Indicator */}
        {portfolioImages.length > 1 && (
          <div className="absolute bottom-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {portfolioImages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
         {/* Content Section */}
        <div className="p-3">
         {/* Photographer Info */}
         <div className="flex items-start space-x-3 mb-3">
           <div className="flex-1 min-w-0">
             <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                    {name}
                  </h3>
                  <div className="relative group/verified">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                     <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white text-gray-900 text-xs rounded-lg opacity-0 group-hover/verified:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-gray-200">
                       All details of this photographer are <span className="font-bold">verified</span>
                       <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                     </div>
                  </div>
                </div>
               <div
                 className="relative flex items-center space-x-1 ml-2 cursor-pointer"
                 onMouseEnter={() => setShowRatingPopup(true)}
                 onMouseLeave={() => setShowRatingPopup(false)}
               >
                 <span className="text-gray-600 text-sm font-medium">
                   {rating}
                 </span>
                 <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                 {showRatingPopup && (
                   <div className="absolute z-10 top-full right-0 mt-2 p-3 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px]">
                     <div className="flex items-center mb-2">
                       <span className="text-lg font-bold text-gray-900 mr-2">{rating}</span>
                       <div className="flex items-center">
                         {renderStars()}
                       </div>
                     </div>
                     <div className="text-sm text-gray-600">
                       {reviews} Ratings & Reviews
                     </div>
                     <div className="mt-2 space-y-1">
                       {[5, 4, 3, 2, 1].map((star) => {
                         const percentage = Math.random() * 100; // In real app, this would be actual data
                         return (
                           <div key={star} className="flex items-center text-xs">
                             <span className="w-6">{star}★</span>
                             <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                               <div 
                                 className={`h-2 rounded-full ${
                                   star >= 4 ? 'bg-green-500' : star >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                                 }`}
                                 style={{ width: `${percentage}%` }}
                               ></div>
                             </div>
                             <span className="w-8 text-gray-600">{Math.floor(percentage * reviews / 100)}</span>
                           </div>
                         );
                       })}
                     </div>
                   </div>
                 )}
               </div>
             </div>
             <div className="flex items-center justify-between mt-1">
               <div className="flex items-center">
                 <MapPinIcon className="w-3 h-3 text-gray-400 mr-1" />
                 <span className="text-gray-500 text-xs truncate">{location}</span>
               </div>
               <div className="flex items-center text-gray-500 text-xs">
                 <ClockIcon className="w-3 h-3 mr-1" />
                 {experience}
               </div>
             </div>
         </div>
       </div>

       {/* Category Tags */}
         {categories && categories.length > 0 && (
           <div className="mb-3">
             <div className="flex flex-wrap gap-1">
               {categories.slice(0, 3).map((cat, index) => (
                 <span
                   key={index}
                   className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
                 >
                   {cat}
                 </span>
               ))}
               {categories.length > 3 && (
                 <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
                   +{categories.length - 3} more
                 </span>
               )}
             </div>
           </div>
         )}

         {/* View Details and Book Button */}
         <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <button 
            className="flex-1 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/photographer/${id}`);
            }}
          >
            View 
          </button>
          <button 
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to photographer detail page where booking logic will handle category selection
              router.push(`/photographer/${id}`);
            }}
          >
            Book Now
          </button>
         </div>
       </div>
    </div>
  );
}
