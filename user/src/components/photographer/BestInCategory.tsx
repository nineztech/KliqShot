'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPinIcon, StarIcon as StarSolidIcon, StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

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
    }
  ];

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bestPhotographers.map((photographer) => (
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
                  <h3 className="font-semibold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">
                    {photographer.name}
                  </h3>
                  <p className="text-blue-600 text-sm font-medium">{photographer.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{photographer.price}</div>
                  <div className="text-xs text-gray-500">per hour</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-1 mb-2">
                {renderStars(photographer.rating, 'w-4 h-4')}
                <span className="text-sm text-gray-600 ml-1">
                  {photographer.rating} ({photographer.reviews} reviews)
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-1" />
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
