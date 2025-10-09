'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { categories, SubCategory } from '@/data/categories';
import { photographersData, Photographer } from '@/data/photographers';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';
import PhotographerCard from '@/components/photographer/PhotographerCard';

export default function MobileSearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [matchedSubCategories, setMatchedSubCategories] = useState<SubCategory[]>([]);
  const [matchedPhotographers, setMatchedPhotographers] = useState<Photographer[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const allSubCategories: SubCategory[] = [];
      let foundCategoryName = '';

      // Search for matching category
      categories.forEach((category) => {
        if (category.name.toLowerCase().includes(query)) {
          foundCategoryName = category.name;
          allSubCategories.push(...category.subCategories);
        }
      });

      setMatchedSubCategories(allSubCategories);
      setCategoryName(foundCategoryName);

      // Get all photographers from matched subcategories
      const allPhotographers = photographersData.filter((photographer) => {
        return allSubCategories.some(
          (subCat) => photographer.subCategory === subCat.id
        );
      });
      
      setMatchedPhotographers(allPhotographers);
    }
  }, [searchQuery]);

  const handleSubCategoryClick = (subCategory: SubCategory) => {
    // Find the parent category
    const parentCategory = categories.find((cat) =>
      cat.subCategories.some((sub) => sub.id === subCategory.id)
    );
    
    if (parentCategory) {
      router.push(`/categories?category=${parentCategory.id}&subcategory=${subCategory.id}`);
    }
  };

  const handlePhotographerClick = (photographer: Photographer) => {
    router.push(`/photographer/${photographer.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="px-4 py-6">
        {/* Search Header */}
        <div className="mb-6">
          <div className="flex items-start gap-2 mb-2">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200 flex-shrink-0"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>

            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mt-1" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 mb-1">
                Search Results
              </h1>
              <p className="text-sm text-gray-600">"{searchQuery}"</p>
            </div>
          </div>
          
          {categoryName && (
            <p className="text-sm text-gray-600 ml-8">
              Category: <span className="font-semibold text-gray-900">{categoryName}</span>
            </p>
          )}
        </div>

        {/* Subcategories Swiper */}
        {matchedSubCategories.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Subcategories</h2>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
              {matchedSubCategories.map((subCategory) => (
                <div
                  key={subCategory.id}
                  onClick={() => handleSubCategoryClick(subCategory)}
                  className="flex-shrink-0 cursor-pointer"
                >
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-md active:shadow-xl transition-all duration-300 relative">
                    <img
                      src={subCategory.imageUrl}
                      alt={subCategory.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-2 text-center w-28">
                    <h3 className="font-semibold text-gray-900 text-xs mb-1 line-clamp-2">
                      {subCategory.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {subCategory.photographerCount}+
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photographer Cards */}
        {matchedPhotographers.length > 0 ? (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              All Photographers ({matchedPhotographers.length})
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {matchedPhotographers.map((photographer) => (
                <PhotographerCard
                  key={photographer.id}
                  id={photographer.id}
                  name={photographer.name}
                  specialty={photographer.specialty}
                  location={photographer.location}
                  rating={photographer.rating}
                  reviews={photographer.reviews}
                  price={photographer.price}
                  experience={photographer.experience}
                  image={photographer.image}
                  category={photographer.category}
                  subCategory={photographer.subCategory}
                  categories={photographer.categories}
                  onClick={() => handlePhotographerClick(photographer)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mb-4">
              <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">No Results Found</h2>
            <p className="text-sm text-gray-600 mb-6 px-4">
              We couldn't find any photographers matching "{searchQuery}".
            </p>
            <button
              onClick={() => router.push('/categories')}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium active:bg-blue-700 transition-colors duration-200"
            >
              Browse All Categories
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

