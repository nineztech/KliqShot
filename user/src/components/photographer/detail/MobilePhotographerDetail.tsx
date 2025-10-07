'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, StarIcon as StarSolidIcon, StarIcon as StarOutlineIcon, MapPinIcon, ClockIcon, CameraIcon, HeartIcon, ShareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import { categories, type Category, type SubCategory } from '@/data/categories';

interface Photographer {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  experience: string;
  image: string;
  description: string;
  portfolio: string[];
  availability: string;
  languages: string[];
  equipment: string[];
  awards: string[];
}

interface MobilePhotographerDetailProps {
  photographer: Photographer;
  category?: string;
  subcategory?: string;
}

export default function MobilePhotographerDetail({ photographer, category, subcategory }: MobilePhotographerDetailProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activePortfolioCategory, setActivePortfolioCategory] = useState('Mehndi');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(photographer.rating);
    const hasHalfStar = photographer.rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarSolidIcon key={i} className="w-4 h-4 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <StarOutlineIcon className="w-4 h-4 text-gray-300" />
            <div className="absolute inset-0 w-2 h-4 overflow-hidden">
              <StarSolidIcon className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarOutlineIcon key={i} className="w-4 h-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  const getCurrentPortfolioImages = () => {
    // Create category-specific image sets
    const categoryImages = {
      'Mehndi': [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop"
      ],
      'Engagement': [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop"
      ],
      'Wedding': [
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop"
      ],
      'Haldi/Chooda': [
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop"
      ]
    };

    // If a category is selected, return its images, otherwise return all portfolio images
    if (activePortfolioCategory && categoryImages[activePortfolioCategory]) {
      return categoryImages[activePortfolioCategory];
    }
    
    return photographer.portfolio || [];
  };

  const handleBookNow = () => {
    // If no category is selected, show the category selection modal
    if (!category && !selectedCategory) {
      setShowCategoryModal(true);
      return;
    }

    // Create booking URL with category and subcategory information
    const bookingParams = new URLSearchParams();
    bookingParams.append('photographerId', photographer.id.toString());
    bookingParams.append('photographerName', photographer.name);
    bookingParams.append('price', photographer.price);
    
    const finalCategory = category || selectedCategory;
    const finalSubCategory = subcategory || selectedSubCategory;
    
    if (finalCategory) {
      bookingParams.append('category', finalCategory);
    }
    
    if (finalSubCategory) {
      bookingParams.append('subcategory', finalSubCategory);
    }
    
    // Navigate to booking page with parameters
    router.push(`/booking?${bookingParams.toString()}`);
  };

  const handleCategorySelection = () => {
    if (selectedCategory && selectedSubCategory) {
      setShowCategoryModal(false);
      // Now proceed with booking
      handleBookNow();
    }
  };

  const getSelectedCategoryData = () => {
    return categories.find(cat => cat.id === selectedCategory);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-1" />
              <span className="text-sm">Back</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-1 text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                {isFavorite ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
              </button>
              
              <button className="p-1 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-2 space-y-4">

             {/* Portfolio Gallery */}
             <div className="bg-white rounded-lg shadow-sm p-4">
               {/* Main Photo Carousel */}
               <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                 <Image
                   src={getCurrentPortfolioImages()[selectedImageIndex]}
                   alt="Featured portfolio image"
                   width={400}
                   height={225}
                   className="w-full h-full object-cover"
                 />
                 
                 {/* Carousel Navigation */}
                 <div className="absolute inset-0 flex items-center justify-between p-2">
                   <button
                     onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : getCurrentPortfolioImages().length - 1)}
                     className="w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                     </svg>
                   </button>
                   <button
                     onClick={() => setSelectedImageIndex(prev => prev < getCurrentPortfolioImages().length - 1 ? prev + 1 : 0)}
                     className="w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                   >
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                   </button>
                 </div>
                 
                 {/* Carousel Indicators */}
                 <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                   {getCurrentPortfolioImages().map((_, index) => (
                     <button
                       key={index}
                       onClick={() => setSelectedImageIndex(index)}
                       className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                         selectedImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
                       }`}
                     />
                   ))}
                 </div>
               </div>
               
               {/* Horizontal Category Cards */}
               <div className="flex space-x-3 justify-center">
                 {(() => {
                   const categories = [
                     { id: 1, name: "Mehndi", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=150&h=150&fit=crop" },
                     { id: 2, name: "Engagement", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=150&h=150&fit=crop" },
                     { id: 3, name: "Wedding", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=150&h=150&fit=crop" }
                   ];

                   return categories.map((category) => (
                     <div 
                       key={category.id} 
                       className={`relative w-12 h-12 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                         activePortfolioCategory === category.name ? 'ring-2 ring-blue-500 scale-110' : 'hover:scale-105'
                       }`}
                       onClick={() => setActivePortfolioCategory(category.name)}
                     >
                       <Image
                         src={category.image}
                         alt={category.name}
                         width={48}
                         height={48}
                         className="w-full h-full object-cover"
                       />
                       {/* Selection Indicator */}
                       {activePortfolioCategory === category.name && (
                         <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                           <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                             <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                           </svg>
                         </div>
                       )}
                     </div>
                   ));
                 })()}
               </div>
             </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">About {photographer.name}</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Experience</h3>
              <p className="text-gray-600 text-sm">{photographer.experience}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Availability</h3>
              <p className="text-gray-600 text-sm">{photographer.availability}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {photographer.languages.map((language, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {language}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Equipment</h3>
              <div className="flex flex-wrap gap-2">
                {photographer.equipment.map((item, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {photographer.awards.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Awards & Recognition</h3>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                {photographer.awards.map((award, index) => (
                  <li key={index}>{award}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Photographer Detail & Booking Card */}
        <div className="bg-white rounded-lg shadow-lg p-4 sticky bottom-4">
          {/* Photographer Header */}
          <div className="text-center mb-4">
            <h1 className="text-lg font-bold text-gray-900 mb-1">{photographer.name}</h1>
            <p className="text-blue-600 font-medium mb-2">{photographer.specialty}</p>
            
            <div className="flex items-center justify-center space-x-1 mb-2">
              {renderStars()}
              <span className="text-gray-600 text-sm ml-1">
                {photographer.rating} ({photographer.reviews})
              </span>
            </div>
            
            <div className="flex items-center justify-center text-gray-600 text-sm mb-3">
              <MapPinIcon className="w-4 h-4 mr-1" />
              <span>{photographer.location}</span>
            </div>
            
            <p className="text-gray-700 text-xs leading-relaxed mb-3">{photographer.description}</p>
          </div>
          
          {/* Pricing & Booking */}
          <div className="border-t border-gray-200 pt-3">
            <div className="text-center mb-3">
              <div className="text-2xl font-bold text-blue-600 mb-1">{photographer.price}</div>
              <div className="text-gray-500 text-sm">per session</div>
            </div>
            
            <button 
              onClick={handleBookNow}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Category Selection Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Select a Category</h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4">Please select a category to continue with your booking:</p>
              
              {/* Categories Grid */}
              <div className="space-y-3 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSelectedSubCategory('');
                    }}
                    className={`w-full border rounded-lg p-3 text-left transition-all duration-200 ${
                      selectedCategory === cat.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{cat.name}</h3>
                    <p className="text-xs text-gray-600">{cat.description}</p>
                    <p className="text-xs text-blue-600 mt-1">{cat.photographerCount} photographers</p>
                  </button>
                ))}
              </div>

              {/* Subcategories */}
              {selectedCategory && getSelectedCategoryData()?.subCategories && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-3">Select a Subcategory (Required):</h3>
                  <div className="space-y-2">
                    {getSelectedCategoryData()?.subCategories.map((subCat) => (
                      <button
                        key={subCat.id}
                        onClick={() => setSelectedSubCategory(subCat.id)}
                        className={`w-full border rounded-lg p-3 text-left transition-all duration-200 ${
                          selectedSubCategory === subCat.id
                            ? 'border-blue-500 bg-blue-50 shadow-sm'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{subCat.name}</h4>
                        <p className="text-xs text-gray-600">{subCat.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col space-y-2">
                <button
                  onClick={handleCategorySelection}
                  disabled={!selectedCategory || !selectedSubCategory}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    selectedCategory && selectedSubCategory
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Continue to Booking
                </button>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
