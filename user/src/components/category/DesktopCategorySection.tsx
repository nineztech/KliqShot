'use client';

import { useState, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import CategoryFilter from './CategoryFilter';
import { categoryApi, getImageUrl } from '@/lib/api';
import { 
  HeartIcon, 
  UserGroupIcon, 
  CameraIcon,
  SparklesIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline';

interface Category {
  id: string;
  name: string;
  description: string | null;
  image: string | null;
  photographerCount: number;
  subCategories?: { id: string; name: string }[];
}

// Icon mapping based on category name
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes('wedding') || name.includes('haldi') || name.includes('mehendi')) {
    return <HeartIcon className="w-12 h-12 text-pink-600" />;
  } else if (name.includes('portrait') || name.includes('photo')) {
    return <CameraIcon className="w-12 h-12 text-indigo-600" />;
  } else if (name.includes('event') || name.includes('corporate')) {
    return <BriefcaseIcon className="w-12 h-12 text-green-600" />;
  } else if (name.includes('family') || name.includes('couple')) {
    return <UserGroupIcon className="w-12 h-12 text-blue-600" />;
  } else if (name.includes('product') || name.includes('maternity') || name.includes('fashion')) {
    return <SparklesIcon className="w-12 h-12 text-purple-600" />;
  } else if (name.includes('interior') || name.includes('sport')) {
    return <AcademicCapIcon className="w-12 h-12 text-orange-600" />;
  }
  return <CameraIcon className="w-12 h-12 text-gray-600" />;
};

// Generate placeholder image URL based on category name
const getPlaceholderImageUrl = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  const baseUrl = 'https://images.unsplash.com/photo';
  
  // Map categories to specific Unsplash images
  const imageMap: { [key: string]: string } = {
    'wedding': '1606800052052-a08af7148866?w=600&h=400&fit=crop&crop=center&auto=format',
    'portrait': '1494790108755-2616b612b786?w=600&h=400&fit=crop&crop=center&auto=format',
    'event': '1511578314322-379afb476865?w=600&h=400&fit=crop&crop=center&auto=format',
    'family': '1544005313-94ddf0286df2?w=600&h=400&fit=crop&crop=center&auto=format',
    'product': '1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center&auto=format',
    'maternity': '1524504388940-b1c1722653e1?w=600&h=400&fit=crop&crop=center&auto=format',
    'interior': '1586023492125-27b2c045efd7?w=600&h=400&fit=crop&crop=center&auto=format',
    'fashion': '1524504388940-b1c1722653e1?w=600&h=400&fit=crop&crop=center&auto=format',
    'sport': '1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center&auto=format',
    'video': '1492691527719-9d1e07e534b4?w=600&h=400&fit=crop&crop=center&auto=format'
  };
  
  // Find matching image or use a default
  for (const [key, value] of Object.entries(imageMap)) {
    if (name.includes(key)) {
      return `${baseUrl}-${value}`;
    }
  }
  
  // Default fallback image
  return `${baseUrl}-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop&crop=center&auto=format`;
};

export default function DesktopCategorySection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryApi.getAll(false); // Only fetch active categories
      
      if (response.success && response.data?.categories) {
        setCategories(response.data.categories);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load categories');
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    // Category click handler
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  // Filter categories based on active filter
  const filteredCategories = activeFilter === 'All' 
    ? categories 
    : categories.filter(cat => cat.name === activeFilter);

  return (
    <div>
      {/* Category Filter */}
      <CategoryFilter 
        onFilterChange={handleFilterChange} 
        categories={categories.map(cat => ({ id: cat.id, name: cat.name }))}
      />

      <div className="px-4 mt-6">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
            <p className="font-medium">Failed to load categories</p>
            <p className="text-sm mt-1">{error}</p>
            <button
              onClick={fetchCategories}
              className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Categories Grid */}
        {!loading && !error && (
          <>
            {filteredCategories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    title={category.name}
                    description={category.description || `Explore ${category.name} photography services`}
                    imageUrl={getImageUrl(category.image) || getPlaceholderImageUrl(category.name)}
                    icon={getCategoryIcon(category.name)}
                    photographerCount={category.photographerCount}
                    category={category.name}
                    categoryId={category.id}
                    subcategories={category.subCategories?.map(sub => sub.name) || []}
                    onClick={() => handleCategoryClick(category.name)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium">No categories found</p>
                <p className="text-sm mt-2">Please check back later</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
