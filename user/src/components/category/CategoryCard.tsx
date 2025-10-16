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
  categoryId?: string;
  subcategories?: string[];
  onClick?: () => void;
}

export default function CategoryCard({ 
  title, 
  description, 
  imageUrl, 
  icon,
  photographerCount = 0,
  category,
  categoryId,
  subcategories = [],
  onClick
}: CategoryCardProps) {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(subcategories.length);
  const [imageError, setImageError] = useState(false);

  // Calculate how many subcategories fit in one line
  useEffect(() => {
    if (subcategories.length <= 3) {
      setVisibleCount(subcategories.length);
    } else {
      // Show first 3 items if there are more than 3
      setVisibleCount(3);
    }
  }, [subcategories]);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleClick = () => {
    if (categoryId) {
      // Navigate to categories page with the selected category ID
      router.push(`/categories?category=${categoryId}`);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      onClick={handleClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {imageUrl && !imageError ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
            onError={handleImageError}
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
