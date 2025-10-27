'use client';

import { useState, useRef } from 'react';
import CategoryCard from './CategoryCard';
import CategoryFilter from './CategoryFilter';
import { categories, Category } from '@/data/categories';
import { 
  HeartIcon, 
  UserGroupIcon, 
  CameraIcon,
  SparklesIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const categoryIconMap: { [key: string]: any } = {
  'Wedding': HeartIcon,
  'Portrait': CameraIcon,
  'Events': BriefcaseIcon,
  'Family': UserGroupIcon,
  'Maternity': SparklesIcon,
  'Product': SparklesIcon,
  'Interior': AcademicCapIcon,
  'Fashion': SparklesIcon,
  'Sports': AcademicCapIcon
};

const categoryColorMap: { [key: string]: string } = {
  'Wedding': 'text-pink-600',
  'Portrait': 'text-indigo-600',
  'Events': 'text-green-600',
  'Family': 'text-blue-600',
  'Maternity': 'text-pink-500',
  'Product': 'text-purple-600',
  'Interior': 'text-orange-600',
  'Fashion': 'text-purple-500',
  'Sports': 'text-red-600'
};

const categoryNameMap: { [key: string]: string } = {
  'Wedding': 'wedding',
  'Portrait': 'portrait',
  'Events': 'events',
  'Family': 'family',
  'Maternity': 'maternity',
  'Product': 'product',
  'Interior': 'interior',
  'Fashion': 'fashion',
  'Sports': 'sports'
};

export default function DesktopCategorySection() {
  const [activeFilter, setActiveFilter] = useState('Packages');
  const fixedPackagesRef = useRef<HTMLDivElement>(null);
  const customPackagesRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    console.log(`Category clicked: ${category}`);
    // TODO: Navigate to category page
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  // Check if Packages filter is selected
  const isPackagesView = activeFilter === 'Packages';

  // Find the selected category from the categories data
  const categoryId = categoryNameMap[activeFilter];
  const selectedCategoryData = categories.find(cat => cat.id === categoryId);
  
  // Create subcategory cards from the categories data
  const subcategoryCards = selectedCategoryData?.subCategories.map((subCategory) => {
    const IconComponent = categoryIconMap[activeFilter] || CameraIcon;
    const iconColor = categoryColorMap[activeFilter] || 'text-gray-600';
    return {
      title: subCategory.name,
      description: subCategory.description,
      imageUrl: subCategory.imageUrl,
      icon: <IconComponent className={`w-12 h-12 ${iconColor}`} />,
      photographerCount: subCategory.photographerCount,
      category: categoryId, // Use the actual category ID from categories.ts
      subcategoryId: subCategory.id, // Use the actual subcategory ID
      subcategories: []
    };
  }) || [];

  // Enhanced data for fixed packages with detailed content
  const fixedPackages = [
    { 
      name: 'Wedding', 
      imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&h=200&fit=crop&crop=center&auto=format', 
      startingPrice: 150000,
      valueProposition: 'Includes full-day coverage, 2 Photographers, 1 Drone Men, Premium album, Marriage Video',
      ctaText: 'View'
    },
    { 
      name: 'Pre-Wedding', 
      imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=200&fit=crop&crop=center&auto=format', 
      startingPrice: 75000,
      valueProposition: 'Includes full-day coverage, 2 Photographers, 1 Drone Men, Premium album, Cinematic Video',
      ctaText: 'View'
    },
    { 
      name: 'Maternity', 
      imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=200&fit=crop&crop=center&auto=format', 
      startingPrice: 45000,
      valueProposition: 'Includes maternity shoot, 1 Photographer, Professional editing, Premium prints, Digital gallery',
      ctaText: 'View'
    },
    { 
      name: 'New Born', 
      imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=200&fit=crop&crop=center&auto=format', 
      startingPrice: 35000,
      valueProposition: 'Includes newborn shoot, 1 Photographer, Safe props, Professional editing, Premium album',
      ctaText: 'View'
    },
    { 
      name: 'Product Shoot', 
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center&auto=format', 
      startingPrice: 25000,
      valueProposition: 'Includes product photography, 1 Photographer, Studio setup, Professional editing, High-res images',
      ctaText: 'View'
    },
    { 
      name: 'Real-Estate', 
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop&crop=center&auto=format', 
      startingPrice: 40000,
      valueProposition: 'Includes property photography, 1 Photographer, 1 Drone Men, Professional editing, Virtual tour',
      ctaText: 'View'
    }
  ];

  // Popular subcategories with customization
  const popularSubcategories = [
    { 
      name: 'Headshots', 
      category: 'Portrait', 
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center&auto=format',
      startingPrice: 10000,
      valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography',
      ctaText: 'View'
    },
    { 
      name: 'House Warming', 
      category: 'Events', 
      imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop&crop=center&auto=format',
      startingPrice: 8000,
      valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography',
      ctaText: 'View'
    },
    { 
      name: 'Baby Naam Karan', 
      category: 'Family', 
      imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=200&fit=crop&crop=center&auto=format',
      startingPrice: 12000,
      valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography',
      ctaText: 'View'
    },
    { 
      name: 'Product Shoot', 
      category: 'Product', 
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center&auto=format',
      startingPrice: 15000,
      valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography',
      ctaText: 'View'
    },
    { 
      name: 'Pre-Wedding Shoot', 
      category: 'Wedding', 
      imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=200&fit=crop&crop=center&auto=format',
      startingPrice: 25000,
      valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography',
      ctaText: 'View'
    },
    { 
      name: 'Mehendi', 
      category: 'Wedding', 
      imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=200&fit=crop&crop=center&auto=format',
      startingPrice: 10000,
      valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography',
      ctaText: 'View'
    },
    { 
      name: 'Corporate Events', 
      category: 'Events', 
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300&h=200&fit=crop&crop=center&auto=format',
      startingPrice: 18000,
      valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography',
      ctaText: 'View'
    },
    { 
      name: 'Family Portraits', 
      category: 'Family', 
      imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=200&fit=crop&crop=center&auto=format',
      startingPrice: 12000,
      valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography',
      ctaText: 'View'
    }
  ];

  if (isPackagesView) {
    return (
      <div>
        {/* Category Filter */}
        <CategoryFilter onFilterChange={handleFilterChange} />

        <div className="px-4 mt-6 space-y-8">
          {/* Fixed Packages Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fixed Packages</h2>
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={() => scrollLeft(fixedPackagesRef)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-100 -ml-4"
                aria-label="Scroll left"
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
              </button>

              {/* Swiper Container */}
              <div
                ref={fixedPackagesRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {fixedPackages.map((pkg, index) => (
                  <div key={index} className="flex-shrink-0 w-[380px]">
                    <CategoryCard
                      title={pkg.name}
                      description={pkg.valueProposition}
                      imageUrl={pkg.imageUrl}
                      photographerCount={0}
                      category="packages"
                      subcategories={[]}
                      onClick={() => handleCategoryClick(pkg.name)}
                      isPackage={true}
                      packagePrice={pkg.startingPrice}
                      packageCTA={pkg.ctaText}
                    />
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scrollRight(fixedPackagesRef)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-100 -mr-4"
                aria-label="Scroll right"
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>

          {/* Custom Packages Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Custom Packages</h2>
            <p className="text-gray-600 mb-4">Popular subcategories where customization is available</p>
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={() => scrollLeft(customPackagesRef)}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-100 -ml-4"
                aria-label="Scroll left"
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
              </button>

              {/* Swiper Container */}
              <div
                ref={customPackagesRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {popularSubcategories.map((subcategory, index) => (
                  <div key={index} className="flex-shrink-0 w-[380px]">
                    <CategoryCard
                      title={subcategory.name}
                      description={subcategory.valueProposition}
                      imageUrl={subcategory.imageUrl}
                      photographerCount={0}
                      category={subcategory.category}
                      subcategories={[]}
                      onClick={() => handleCategoryClick(subcategory.name)}
                      isPackage={true}
                      packagePrice={subcategory.startingPrice}
                      packageCTA={subcategory.ctaText}
                      showBadge={false}
                    />
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => scrollRight(customPackagesRef)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-100 -mr-4"
                aria-label="Scroll right"
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Category Filter */}
      <CategoryFilter onFilterChange={handleFilterChange} />

      <div className="px-4 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategoryCards.map((subcategory, index) => (
              <CategoryCard
                key={index}
                title={subcategory.title}
                description={subcategory.description}
                imageUrl={subcategory.imageUrl}
                icon={subcategory.icon}
                photographerCount={subcategory.photographerCount}
                category={subcategory.category}
                subcategoryId={subcategory.subcategoryId}
                subcategories={subcategory.subcategories}
                onClick={() => handleCategoryClick(subcategory.title)}
              />
          ))}
        </div>
      </div>
    </div>
  );
}
