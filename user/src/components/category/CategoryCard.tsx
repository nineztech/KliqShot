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
      // Use replace for instant navigation without adding to history stack
      router.push(`/category/${category.toLowerCase()}`);
    } else if (onClick) {
      onClick();
    }
  };
  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer overflow-hidden group"
      onClick={handleClick}
    >
      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center">
            {icon ? (
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                {icon}
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            )}
          </div>
        )}
      </div>
      
          <div className="p-4">
            <h3 className="card-title card-title-mobile md:card-title-desktop mb-1 group-hover:text-blue-600 transition-colors duration-200">
              {title}
            </h3>
            <p className="card-description card-description-mobile md:card-description-desktop line-clamp-2 mb-2">
              {description}
            </p>
        {photographerCount > 0 && (
          <div className="flex items-center text-xs text-blue-600 font-medium">
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            {photographerCount} photographer{photographerCount !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}
