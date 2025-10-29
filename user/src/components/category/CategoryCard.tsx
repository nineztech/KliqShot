'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  photographerCount?: number;
  category?: string;
  subcategoryId?: string;
  subcategories?: string[];
  onClick?: () => void;
  isPackage?: boolean;
  packagePrice?: number;
  packageCTA?: string;
  showBadge?: boolean;
  discountPercentage?: number;
}

export default function CategoryCard({ 
  title, 
  description, 
  imageUrl, 
  icon, 
  photographerCount = 0,
  category,
  subcategoryId,
  subcategories = [],
  onClick,
  isPackage = false,
  packagePrice,
  packageCTA,
  showBadge = true,
  discountPercentage
}: CategoryCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(subcategories.length);

  // Calculate how many subcategories fit in one line
  useEffect(() => {
    if (subcategories.length <= 3) {
      setVisibleCount(subcategories.length);
    } else {
      // Show first 3 items if there are more than 3
      setVisibleCount(3);
    }
  }, [subcategories]);

  const handleMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('More button clicked, expanding:', !isExpanded);
    setIsExpanded(!isExpanded);
  };

  const handleClick = () => {
    if (isPackage) {
      // Navigate to categories page with package parameter
      const packageParam = title.toLowerCase().replace(/\s+/g, '');
      router.push(`/categories?package=${packageParam}`);
    } else if (category && subcategoryId) {
      // Use the exact IDs from categories.ts for proper routing
      router.push(`/categories?category=${category}&subcategory=${subcategoryId}`);
    } else if (onClick) {
      onClick();
    }
  };

  // Enhanced Package Card Design
  if (isPackage && packagePrice && packageCTA) {
    return (
      <div 
        className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        onClick={handleClick}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </div>

        {/* Black Shadow Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/30 to-black/10"></div>

        {/* Discount Badge - Left Side */}
        {discountPercentage && (
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-md">
              {discountPercentage}% OFF
            </div>
          </div>
        )}

        {/* ALL-INCLUSIVE Badge */}
        {showBadge && (
          <div className="absolute top-3 right-3 z-20">
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-md">
              ALL-INCLUSIVE
            </div>
          </div>
        )}

        {/* Content Overlay - Similar to Hero Section */}
        <div className="absolute inset-0 flex flex-col justify-end p-3 pb-2">
          {/* Category Title */}
          <h3 className="text-base font-bold text-white mb-1 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]">
            {title}
          </h3>

          {/* Value Proposition */}
          <p className="text-xs text-white/90 mb-2 leading-relaxed line-clamp-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
            {description}
          </p>

          {/* Price and CTA */}
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="text-white/80 text-[10px] block">Starting From</span>
              <div className="flex items-center gap-2">
                {discountPercentage && discountPercentage > 0 ? (
                  <>
                    <span className="text-sm text-white/60 line-through drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                      ₹{Math.round(packagePrice / (1 - discountPercentage / 100)).toLocaleString('en-US')}
                    </span>
                    <div className="text-xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                      ₹{packagePrice.toLocaleString('en-US')}
                    </div>
                  </>
                ) : (
                  <div className="text-xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                    ₹{packagePrice.toLocaleString('en-US')}
                  </div>
                )}
              </div>
            </div>
            <button className="px-3 py-1.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 text-xs whitespace-nowrap shadow-lg">
              {packageCTA}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Original Category Card Design
  return (
    <div 
      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={handleClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            {icon ? (
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                {icon}
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            )}
          </div>
        )}
      </div>

      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-95 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-bold text-lg md:text-xl mb-1 group-hover:text-blue-300 transition-colors duration-300 drop-shadow-lg">
            {title}
          </h3>
           {subcategories.length > 0 && (
             <div className="mb-2" onClick={(e) => e.stopPropagation()}>
               <div className="text-white/80 text-xs md:text-sm drop-shadow-md">
                 {isExpanded ? (
                   // Show all subcategories in multiple lines when expanded
                   <div>
                     {subcategories.map((sub, index) => (
                       <span key={index}>
                         {sub}
                         {index < subcategories.length - 1 && (
                           <span className="mx-1">|</span>
                         )}
                         {/* Add line break every 3 items when expanded */}
                         {(index + 1) % 3 === 0 && index < subcategories.length - 1 && (
                           <br />
                         )}
                       </span>
                     ))}
                   </div>
                 ) : (
                   // Show limited subcategories in one line
                   <span>
                     {subcategories.slice(0, visibleCount).join(' | ')}
                     {subcategories.length > visibleCount && (
                       <button
                         onClick={handleMoreClick}
                         className="text-white/90 text-xs md:text-sm font-medium hover:text-blue-300 transition-colors duration-200 ml-2 cursor-pointer relative z-10"
                         style={{ pointerEvents: 'auto' }}
                       >
                         +{subcategories.length - visibleCount} more
                       </button>
                     )}
                   </span>
                 )}
               </div>
               {isExpanded && subcategories.length > visibleCount && (
                 <button
                   onClick={handleMoreClick}
                   className="text-white/90 text-xs md:text-sm font-medium hover:text-blue-300 transition-colors duration-200 mt-1 cursor-pointer relative z-10"
                   style={{ pointerEvents: 'auto' }}
                 >
                   Show less
                 </button>
               )}
             </div>
           )}
          <p className="text-white/90 text-sm md:text-base mb-3 line-clamp-2 drop-shadow-md">
            {description}
          </p>
          
          {photographerCount > 0 && (
            <div className="inline-flex items-center bg-blue-600/90 backdrop-blur-sm text-white text-xs md:text-sm font-semibold px-3 py-2 rounded-full group-hover:bg-blue-500 transition-all duration-300 shadow-lg">
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              {photographerCount}+ photographers
            </div>
          )}
        </div>
      </div>

      {/* Subtle border glow effect */}
      <div className="absolute inset-0 rounded-xl border border-white/20 group-hover:border-white/40 transition-colors duration-300"></div>
    </div>
  );
}
