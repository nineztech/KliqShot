'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { PhotographerGrid } from '@/components/photographer';
import { categoryApi, getImageUrl } from '@/lib/api';
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

interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
  icon?: string;
  photographerCount: number;
  subCategories: SubCategory[];
}

interface SubCategory {
  id: string;
  name: string;
  description: string;
  image?: string;
  photographerCount: number;
  categoryId: string;
}

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

// Helper function to get icon component based on category name
const getCategoryIcon = (categoryName: string) => {
  const name = categoryName.toLowerCase();
  if (name.includes('wedding')) return HeartIcon;
  if (name.includes('portrait')) return UserGroupIcon;
  if (name.includes('event')) return SparklesIcon;
  if (name.includes('product')) return ShoppingBagIcon;
  if (name.includes('interior') || name.includes('real estate')) return HomeIcon;
  if (name.includes('sports')) return TrophyIcon;
  if (name.includes('video') || name.includes('cinematography')) return VideoCameraIcon;
  if (name.includes('corporate') || name.includes('business')) return BriefcaseIcon;
  return CameraIcon;
};

// Helper function to get placeholder image URL
const getPlaceholderImageUrl = (name: string): string => {
  const categoryMap: { [key: string]: string } = {
    'wedding': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
    'portrait': 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop',
    'event': 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
    'family': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
    'product': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    'maternity': 'https://images.unsplash.com/photo-1493894473891-10fc1e5dbd22?w=800&h=600&fit=crop',
    'interior': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'fashion': 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=600&fit=crop',
    'sports': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
    'video': 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop'
  };
  
  const lowerName = name.toLowerCase();
  for (const [key, url] of Object.entries(categoryMap)) {
    if (lowerName.includes(key)) {
      return url;
    }
  }
  
  return 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop';
};

function CategoriesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [photographers, setPhotographers] = useState<Photographer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle category/subcategory selection from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const subCategoryParam = searchParams.get('subcategory');
    
    if (categoryParam && categories.length > 0) {
      const category = categories.find(cat => cat.id === categoryParam);
      if (category) {
        setSelectedCategory(category);
        
        // If subcategory is specified, find and set it
        if (subCategoryParam) {
          const subCategory = category.subCategories.find(sub => sub.id === subCategoryParam);
          if (subCategory) {
            setSelectedSubCategory(subCategory);
            // TODO: Fetch photographers for this specific subcategory
            setPhotographers([]);
          }
        } else {
          setSelectedSubCategory(null);
          setPhotographers([]);
        }
      }
    } else if (categories.length > 0 && !categoryParam) {
      setSelectedCategory(categories[0]);
      setSelectedSubCategory(null);
      setPhotographers([]);
    }
  }, [searchParams, categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryApi.getAll(false);
      
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
    router.push('/');
  };

  const handlePhotographerClick = (photographer: Photographer) => {
    const params = new URLSearchParams();
    if (selectedCategory) {
      params.append('category', selectedCategory.id);
    }
    if (selectedSubCategory) {
      params.append('subcategory', selectedSubCategory.id);
    }
    
    const queryString = params.toString();
    const url = `/photographer/${photographer.id}${queryString ? `?${queryString}` : ''}`;
    router.push(url);
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
              
              {loading && (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              {error && (
                <div className="text-center py-8">
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={fetchCategories}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {!loading && !error && categories.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>No categories available</p>
                </div>
              )}

              {!loading && !error && categories.length > 0 && (
                <div className="space-y-2">
                  {categories.map((category) => {
                    const IconComponent = getCategoryIcon(category.name);
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
              )}
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
                  {selectedCategory.subCategories.map((subCategory) => {
                    const subCategoryImageUrl = getImageUrl(subCategory.image) || getPlaceholderImageUrl(subCategory.name);
                    
                    return (
                      <div
                        key={subCategory.id}
                        onClick={() => handleSubCategorySelect(subCategory)}
                        className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200 hover:border-blue-300"
                      >
                        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                          <img
                            src={subCategoryImageUrl}
                            alt={subCategory.name}
                            className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = getPlaceholderImageUrl(subCategory.name);
                            }}
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
                    );
                  })}
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

export default function CategoriesPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <CategoriesContent />
    </Suspense>
  );
}