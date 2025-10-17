'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { 
  HeartIcon, 
  MapPinIcon, 
  ClockIcon, 
  CameraIcon, 
  ShieldCheckIcon,
  ArrowLeftIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { useWishlist } from '@/components/wishlist/WishlistContext';

export default function WishlistPage() {
  const router = useRouter();
  const { items, removeFromWishlist, clearWishlist } = useWishlist();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleRemoveFromWishlist = (id: number) => {
    removeFromWishlist(id);
  };

  const handleViewPhotographer = (id: number) => {
    router.push(`/photographer/${id}`);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          </div>

          {/* Empty Wishlist */}
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <HeartIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save photographers you love to your wishlist!</p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Browse Photographers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist ({items.length} items)</h1>
          </div>
          <button
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
          >
            Clear All
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer group transform hover:-translate-y-2 hover:scale-[1.02]"
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={item.image}
                  alt={`${item.name} portfolio`}
                  className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Trusted Badge */}
                <div className="absolute top-3 left-3 bg-purple-500/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-lg">
                  <ShieldCheckIcon className="w-3 h-3" />
                  <span className="text-[8px] font-bold tracking-wide">TRUSTED</span>
                </div>
                
                {/* Remove from Wishlist Button */}
                <button
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFromWishlist(item.id);
                  }}
                >
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                </button>
                
                {/* Category Badge */}
                <div className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <CameraIcon className="w-3 h-3 inline mr-1" />
                  {item.specialty}
                </div>

                {/* Added Date */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Added {formatDate(item.addedAt)}
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-4">
                {/* Photographer Info */}
                <div className="flex items-start space-x-3 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                          {item.name}
                        </h3>
                        <div className="relative group/verified">
                          <svg className="w-4 h-4 text-green-500 flex-shrink-0 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white text-gray-900 text-xs rounded-lg opacity-0 group-hover/verified:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-gray-200">
                            All details of this photographer are <span className="font-bold">verified</span>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                          </div>
                        </div>
                      </div>
                      <div className="relative flex items-center space-x-1 ml-2">
                        <span className="text-gray-600 text-sm font-medium">
                          {item.rating}
                        </span>
                        <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center">
                        <MapPinIcon className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-gray-500 text-xs truncate">{item.location}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <ClockIcon className="w-3 h-3 mr-1" />
                        {item.experience}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <span className="text-lg font-bold text-blue-600">{item.price}</span>
                  <span className="text-gray-500 text-sm ml-1">per hour</span>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                  <button 
                    className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md text-xs font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewPhotographer(item.id);
                    }}
                  >
                    <EyeIcon className="w-3 h-3" />
                    View
                  </button>
                  <button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 py-2 rounded-md text-xs font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewPhotographer(item.id);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
