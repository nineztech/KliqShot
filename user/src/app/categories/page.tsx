'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import PhotographerGrid from '@/components/photographer';
import { categories, Category, SubCategory, getCategoryById, getSubCategoryById } from '@/data/categories';
import { getPhotographersByCategory, getPhotographersBySubCategory } from '@/data/photographers';
import type { Photographer } from '@/data/photographers';
import { 
  HeartIcon, 
  CameraIcon, 
  UserGroupIcon, 
  SparklesIcon, 
  BriefcaseIcon,
  ShoppingBagIcon,
  HomeIcon,
  TrophyIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';

const iconMap = {
  HeartIcon,
  CameraIcon,
  UserGroupIcon,
  SparklesIcon,
  BriefcaseIcon,
  ShoppingBagIcon,
  HomeIcon,
  TrophyIcon,
  VideoCameraIcon
};

export default function CategoriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const subCategoryParam = searchParams.get('subcategory');
    
    if (categoryParam) {
      const category = getCategoryById(categoryParam);
      if (category) {
        setSelectedCategory(category);
        
        // If subcategory is specified, find and set it
        if (subCategoryParam) {
          const subCategory = category.subCategories.find(sub => sub.id === subCategoryParam);
          if (subCategory) {
            setSelectedSubCategory(subCategory);
            // Get photographers for this specific subcategory
            const subCategoryPhotographers = getPhotographersBySubCategory(category.id, subCategoryParam);
            setPhotographers(subCategoryPhotographers);
          }
        } else {
          setSelectedSubCategory(null);
          setPhotographers([]);
        }
      }
    } else if (categories.length > 0) {
      setSelectedCategory(categories[0]);
      setSelectedSubCategory(null);
      setPhotographers([]);
    }
  }, [searchParams]);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setPhotographers([]);
    router.push(`/categories?category=${category.id}`);
  };

  const handleSubCategorySelect = (subCategory: SubCategory) => {
    setSelectedSubCategory(subCategory);
    // Update URL with subcategory as query parameter
    const currentCategory = selectedCategory?.id || '';
    router.push(`/categories?category=${currentCategory}&subcategory=${subCategory.id}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  const handlePhotographerClick = (photographer: Photographer) => {
    router.push(`/photographer/${photographer.id}`);
  };

  // If we have a subcategory selected, show photographers for that subcategory
  if (selectedSubCategory) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto">

          {/* Subcategory Content */}
          <div className="py-4">
            {photographers.length > 0 ? (
              <PhotographerGrid
                photographers={photographers}
                categoryName={selectedSubCategory.name}
                onPhotographerClick={handlePhotographerClick}
              />
            ) : (
              <div className="px-4">
                <div className="text-center py-16">
                  <div className="mb-6">
                    <svg className="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">No Photographers Found</h2>
                  <p className="text-gray-600 mb-8">
                    Sorry, we couldn't find any photographers for {selectedSubCategory.name}.
                  </p>
                  <button
                    onClick={() => router.push(`/categories?category=${selectedCategory?.id}`)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                  >
                    Browse Other Subcategories
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    );
  }

  // Default categories page view (when no subcategory is selected)
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="py-4 px-4">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 px-4 pb-8">
          {/* Left Sidebar - Categories */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
              <h2 className="text-xl font-bold text-gray-900 mb-6">All Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || CameraIcon;
                  const isSelected = selectedCategory?.id === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                        isSelected
                          ? 'bg-blue-50 border-2 border-blue-200 text-blue-900'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isSelected ? 'bg-blue-100' : 'bg-gray-100'
                      }`}>
                        <IconComponent className={`w-5 h-5 ${
                          isSelected ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{category.name}</h3>
                        <p className="text-xs text-gray-500 truncate">{category.description}</p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {category.photographerCount}+
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Content - Subcategories */}
          <div className="lg:w-2/3">
            {selectedCategory ? (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedCategory.name}</h1>
                  <p className="text-gray-600">{selectedCategory.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedCategory.subCategories.map((subCategory) => (
                    <div
                      key={subCategory.id}
                      onClick={() => handleSubCategorySelect(subCategory)}
                      className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 hover:border-blue-300"
                    >
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                        <img
                          src={subCategory.imageUrl}
                          alt={subCategory.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-semibold text-lg mb-1">{subCategory.name}</h3>
                          <p className="text-white/90 text-sm mb-2">{subCategory.description}</p>
                          <div className="inline-flex items-center bg-blue-600/90 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {subCategory.photographerCount}+ photographers
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="text-center py-16">
                  <div className="mb-6">
                    <svg className="w-24 h-24 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Select a Category</h2>
                  <p className="text-gray-600">
                    Choose a category from the sidebar to explore subcategories and photographers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}