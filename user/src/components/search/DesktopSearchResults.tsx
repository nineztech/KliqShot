'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { categories, SubCategory } from '@/data/categories';
import { photographersData, Photographer } from '@/data/photographers';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { StarIcon, MapPinIcon } from '@heroicons/react/24/solid';
import PhotographerCard from '@/components/photographer/PhotographerCard';

export default function DesktopSearchResults() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [matchedSubCategories, setMatchedSubCategories] = useState<SubCategory[]>([]);
  const [matchedPhotographers, setMatchedPhotographers] = useState<Photographer[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const swiperRef = useRef<HTMLDivElement>(null);

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

  const scrollLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (swiperRef.current) {
      swiperRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            
            </button>

            {/* <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" /> */}
            <h1 className="text-3xl font-bold text-gray-900">
              Search Results for "{searchQuery}"
            </h1>
          </div>
          
          {/* {categoryName && (
            <p className="text-gray-600 ml-9">
              Found in category: <span className="font-semibold text-gray-900">{categoryName}</span>
            </p>
          )} */}
        </div>

        {/* Subcategories Swiper */}
        {matchedSubCategories.length > 0 && (
          <div className="mb-3">
            {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">Subcategories</h2> */}
            
            <div className="relative group">
              {/* Left Arrow */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -ml-4"
                aria-label="Scroll left"
              >
                <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
              </button>

              {/* Swiper Container */}
              <div
                ref={swiperRef}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {matchedSubCategories.map((subCategory) => (
                  <div
                    key={subCategory.id}
                    onClick={() => handleSubCategoryClick(subCategory)}
                    className="flex-shrink-0 cursor-pointer group/card"
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 shadow-md hover:shadow-xl transition-all duration-300 relative group-hover/card:scale-105">
                      <img
                        src={subCategory.imageUrl}
                        alt={subCategory.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="mt-3 text-center">
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">
                        {subCategory.name}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {subCategory.photographerCount}+ photographers
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 -mr-4"
                aria-label="Scroll right"
              >
                <ChevronRightIcon className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        )}

        {/* Photographer Cards */}
        {matchedPhotographers.length > 0 ? (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              All Photographers ({matchedPhotographers.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <div className="text-center py-16">
            <div className="mb-6">
              <MagnifyingGlassIcon className="w-24 h-24 text-gray-300 mx-auto" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Found</h2>
            <p className="text-gray-600 mb-8">
              We couldn't find any photographers matching "{searchQuery}". Try searching for a different category.
            </p>
            <button
              onClick={() => router.push('/categories')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
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

