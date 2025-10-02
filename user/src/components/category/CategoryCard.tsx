'use client';

import { useRouter } from 'next/navigation';

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  photographerCount?: number;
  category?: string;
  onClick?: () => void;
}

export default function CategoryCard({ 
  title, 
  description, 
  imageUrl, 
  icon, 
  photographerCount = 0,
  category,
  onClick 
}: CategoryCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (category) {
      // Navigate to categories page with the selected category
      router.push(`/categories?category=${category.toLowerCase()}`);
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
          <h3 className="text-white font-bold text-lg md:text-xl mb-2 group-hover:text-blue-300 transition-colors duration-300 drop-shadow-lg">
            {title}
          </h3>
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
