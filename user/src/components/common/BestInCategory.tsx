'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPinIcon, StarIcon as StarSolidIcon, StarIcon as StarOutlineIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Photographer {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  experience: string;
}

interface BestInCategoryProps {
  category?: string;
}

const BestInCategory = ({ category = "Wedding Photography" }: BestInCategoryProps) => {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const renderStars = (rating: number, size: string = 'w-4 h-4') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarSolidIcon key={i} className={`${size} text-yellow-400`} />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className={`relative ${size}`}>
            <StarOutlineIcon className={`${size} text-gray-300`} />
            <div className={`absolute inset-0 ${size.includes('w-4') ? 'w-2' : 'w-2.5'} ${size.includes('h-4') ? 'h-4' : 'h-5'} overflow-hidden`}>
              <StarSolidIcon className={`${size} text-yellow-400`} />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarOutlineIcon key={i} className={`${size} text-gray-300`} />
        );
      }
    }
    return stars;
  };

  const bestPhotographers: Photographer[] = [
    {
      id: 5,
      name: "Rohit Agarwal",
      specialty: "Wedding Photography",
      location: "Delhi, DL",
      rating: 4.9,
      reviews: 234,
      price: "₹450",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=face",
      experience: "9 years"
    },
    {
      id: 6,
      name: "Deepika Joshi",
      specialty: "Wedding Photography",
      location: "Mumbai, MH",
      rating: 4.8,
      reviews: 189,
      price: "₹380",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop&crop=face",
      experience: "7 years"
    },
    {
      id: 7,
      name: "Vikram Singh",
      specialty: "Wedding Photography",
      location: "Bangalore, KA",
      rating: 4.7,
      reviews: 156,
      price: "₹320",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face",
      experience: "6 years"
    },
    {
      id: 8,
      name: "Priya Sharma",
      specialty: "Wedding Photography",
      location: "Jaipur, RJ",
      rating: 4.9,
      reviews: 201,
      price: "₹400",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=face",
      experience: "8 years"
    },
    {
      id: 9,
      name: "Arjun Mehta",
      specialty: "Wedding Photography",
      location: "Pune, MH",
      rating: 4.8,
      reviews: 178,
      price: "₹360",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=face",
      experience: "7 years"
    },
    {
      id: 10,
      name: "Neha Kapoor",
      specialty: "Wedding Photography",
      location: "Chandigarh, CH",
      rating: 4.7,
      reviews: 145,
      price: "₹340",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=face",
      experience: "6 years"
    }
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320; // Approximate width of one card plus gap
      const newScrollPosition = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Best in {category}</h2>
          <p className="text-gray-600 mt-1">Top-rated photographers in your category</p>
        </div>
        <div className="hidden md:block">
          <button 
            onClick={() => router.push(`/photographers?category=${encodeURIComponent(category)}`)}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            View All →
          </button>
        </div>
      </div>
      
      {/* Desktop Slider - 4 cards per row */}
      <div className="hidden lg:block relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
          aria-label="Scroll left"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-600" />
        </button>
        
        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-200"
          aria-label="Scroll right"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-600" />
        </button>

        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bestPhotographers.map((photographer) => (
            <div 
              key={photographer.id} 
              className="flex-none w-[calc(25%-18px)] border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
              onClick={() => router.push(`/photographer/${photographer.id}`)}
            >
              {/* Photographer Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photographer.image}
                  alt={photographer.name}
                  width={300}
                  height={225}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Top Badge */}
                <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Best in Category
                </div>
              </div>
              
              {/* Photographer Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                      {photographer.name}
                    </h3>
                    <p className="text-blue-600 text-xs font-medium">{photographer.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-bold text-blue-600">{photographer.price}</div>
                    <div className="text-[10px] text-gray-500">per hour</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(photographer.rating, 'w-3.5 h-3.5')}
                  <span className="text-xs text-gray-600 ml-1">
                    {photographer.rating} ({photographer.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center">
                    <MapPinIcon className="w-3.5 h-3.5 mr-1" />
                    <span>{photographer.location}</span>
                  </div>
                  <span>{photographer.experience}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet View - 2 cards per row */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
        {bestPhotographers.slice(0, 4).map((photographer) => (
          <div 
            key={photographer.id} 
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => router.push(`/photographer/${photographer.id}`)}
          >
            {/* Photographer Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={photographer.image}
                alt={photographer.name}
                width={300}
                height={225}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Top Badge */}
              <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Best in Category
              </div>
            </div>
            
            {/* Photographer Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                    {photographer.name}
                  </h3>
                  <p className="text-blue-600 text-xs font-medium">{photographer.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-blue-600">{photographer.price}</div>
                  <div className="text-[10px] text-gray-500">per hour</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 mb-2">
                {renderStars(photographer.rating, 'w-3.5 h-3.5')}
                <span className="text-xs text-gray-600 ml-1">
                  {photographer.rating} ({photographer.reviews} reviews)
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className="w-3.5 h-3.5 mr-1" />
                  <span>{photographer.location}</span>
                </div>
                <span>{photographer.experience}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile View - 1 card per row */}
      <div className="grid grid-cols-1 md:hidden gap-6">
        {bestPhotographers.slice(0, 3).map((photographer) => (
          <div 
            key={photographer.id} 
            className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
            onClick={() => router.push(`/photographer/${photographer.id}`)}
          >
            {/* Photographer Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={photographer.image}
                alt={photographer.name}
                width={300}
                height={225}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Top Badge */}
              <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                Best in Category
              </div>
            </div>
            
            {/* Photographer Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-gray-900 text-base group-hover:text-blue-600 transition-colors">
                    {photographer.name}
                  </h3>
                  <p className="text-blue-600 text-xs font-medium">{photographer.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-bold text-blue-600">{photographer.price}</div>
                  <div className="text-[10px] text-gray-500">per hour</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 mb-2">
                {renderStars(photographer.rating, 'w-3.5 h-3.5')}
                <span className="text-xs text-gray-600 ml-1">
                  {photographer.rating} ({photographer.reviews} reviews)
                </span>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className="w-3.5 h-3.5 mr-1" />
                  <span>{photographer.location}</span>
                </div>
                <span>{photographer.experience}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Mobile View All Button */}
      <div className="text-center mt-6 md:hidden">
        <button 
          onClick={() => router.push(`/photographers?category=${encodeURIComponent(category)}`)}
          className="bg-blue-50 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200"
        >
          View All in {category}
        </button>
      </div>
    </div>
  );
};

export default BestInCategory;
