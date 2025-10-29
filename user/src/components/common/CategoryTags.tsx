'use client';

interface CategoryTagsProps {
  categories: string[];
  maxVisible?: number;
  className?: string;
}

export default function CategoryTags({ 
  categories, 
  maxVisible = 3, 
  className = "" 
}: CategoryTagsProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <div className={`mb-2 sm:mb-3 ${className}`}>
      <div className="flex flex-wrap gap-1">
        {categories.slice(0, maxVisible).map((cat, index) => (
          <span
            key={index}
            className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200"
          >
            {cat}
          </span>
        ))}
        {categories.length > maxVisible && (
          <span className="inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200">
            +{categories.length - maxVisible} more
          </span>
        )}
      </div>
    </div>
  );
}
