'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeftIcon, StarIcon as StarSolidIcon, StarIcon as StarOutlineIcon, FunnelIcon, CheckIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import BestInCategory from '@/components/common/BestInCategory';
import InspiredByHistory from '@/components/common/InspiredByHistory';
import YourSearches from '@/components/common/YourSearches';

interface Comment {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
  images: string[];
  verified?: boolean;
}

export default function ReviewsClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const photographerName = searchParams.get('name') || 'Photographer';
  const totalReviews = searchParams.get('reviews') || '0';
  const overallRating = searchParams.get('rating') || '0';
  
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('recent');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showReviewersDropdown, setShowReviewersDropdown] = useState(false);
  const [showStarsDropdown, setShowStarsDropdown] = useState(false);
  const [showVariantsDropdown, setShowVariantsDropdown] = useState(false);
  const [showContentDropdown, setShowContentDropdown] = useState(false);

  // Function to close all dropdowns
  const closeAllDropdowns = () => {
    setShowSortDropdown(false);
    setShowReviewersDropdown(false);
    setShowStarsDropdown(false);
    setShowVariantsDropdown(false);
    setShowContentDropdown(false);
  };

  // Function to open specific dropdown and close others
  const openDropdown = (dropdownName: string) => {
    closeAllDropdowns();
    switch (dropdownName) {
      case 'sort':
        setShowSortDropdown(true);
        break;
      case 'reviewers':
        setShowReviewersDropdown(true);
        break;
      case 'stars':
        setShowStarsDropdown(true);
        break;
      case 'variants':
        setShowVariantsDropdown(true);
        break;
      case 'content':
        setShowContentDropdown(true);
        break;
    }
  };

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        closeAllDropdowns();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sample reviews data (same as in detail page)
  const allReviews: Comment[] = [
    {
      id: 1,
      user: {
        name: "Priya Sharma",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
      },
      rating: 5,
      comment: "Absolutely amazing photographer! Captured every special moment of our wedding beautifully. Highly professional and creative. Would definitely recommend!",
      date: "2 days ago",
      images: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=300&h=300&fit=crop"
      ],
      verified: true
    },
    {
      id: 2,
      user: {
        name: "Rajesh Kumar",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
      },
      rating: 5,
      comment: "Outstanding work! The photographer was very patient and captured candid moments perfectly. The final photos exceeded our expectations.",
      date: "1 week ago",
      images: [
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=300&h=300&fit=crop"
      ],
      verified: true
    },
    {
      id: 3,
      user: {
        name: "Sneha Patel",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
      },
      rating: 4,
      comment: "Great experience! Professional service and beautiful photos. The team was very responsive and delivered on time.",
      date: "2 weeks ago",
      images: [],
      verified: true
    },
    {
      id: 4,
      user: {
        name: "Arjun Mehta",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
      },
      rating: 5,
      comment: "Exceptional photography skills! The photographer made us feel comfortable throughout the session. The engagement photos came out absolutely stunning. Worth every penny!",
      date: "3 weeks ago",
      images: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=300&fit=crop"
      ],
      verified: true
    },
    {
      id: 5,
      user: {
        name: "Kavya Reddy",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face"
      },
      rating: 5,
      comment: "Perfect photographer for our destination wedding! Captured the essence of both traditional and modern elements beautifully. The team was punctual and very organized.",
      date: "1 month ago",
      images: [
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&h=300&fit=crop"
      ],
      verified: true
    },
    {
      id: 6,
      user: {
        name: "Vikram Singh",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
      },
      rating: 4,
      comment: "Good quality work with reasonable pricing. The photographer was professional and the final delivery was on time. Some photos were exceptional!",
      date: "1 month ago",
      images: [],
      verified: true
    },
    {
      id: 7,
      user: {
        name: "Ananya Gupta",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face"
      },
      rating: 5,
      comment: "Amazing pre-wedding shoot experience! The photographer has a great eye for detail and knows how to capture natural emotions. Highly recommend for any special occasion!",
      date: "2 months ago",
      images: [
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=300&fit=crop"
      ],
      verified: true
    },
    {
      id: 8,
      user: {
        name: "Rohit Agarwal",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop&crop=face"
      },
      rating: 5,
      comment: "Fantastic work on our anniversary photoshoot! The photographer was creative with poses and lighting. The final album exceeded our expectations completely.",
      date: "2 months ago",
      images: [],
      verified: false
    },
    {
      id: 9,
      user: {
        name: "Deepika Joshi",
        avatar: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=100&h=100&fit=crop&crop=face"
      },
      rating: 4,
      comment: "Very professional and friendly photographer. The candid shots were the best part of our wedding album. Would definitely book again for future events.",
      date: "3 months ago",
      images: [
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=300&h=300&fit=crop",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&h=300&fit=crop"
      ],
      verified: true
    },
    {
      id: 10,
      user: {
        name: "Suresh Nair",
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face"
      },
      rating: 5,
      comment: "Excellent photographer with great attention to detail. The Mehndi ceremony photos were captured beautifully with vibrant colors and emotions. Highly satisfied!",
      date: "3 months ago",
      images: [],
      verified: true
    }
  ];

  const renderStars = (rating: number, size: string = 'w-5 h-5') => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarSolidIcon key={i} className={`${size} text-yellow-400 fill-current`} />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className={`relative ${size}`}>
            <StarOutlineIcon className={`${size} text-gray-300`} />
            <div className={`absolute inset-0 ${size.includes('w-4') ? 'w-2' : 'w-2.5'} ${size.includes('h-4') ? 'h-4' : 'h-5'} overflow-hidden`}>
              <StarSolidIcon className={`${size} text-yellow-400 fill-current`} />
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

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = allReviews.filter(r => Math.floor(r.rating) === star).length;
    const percentage = (count / allReviews.length) * 100;
    return { star, count, percentage };
  });

  // Filter reviews
  const filteredReviews = filterRating 
    ? allReviews.filter(r => Math.floor(r.rating) === filterRating)
    : allReviews;

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === 'recent') return a.id - b.id;
    if (sortBy === 'helpful') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
         
            </button>
            
            <h1 className="text-2xl font-bold text-gray-900">
              Customer Reviews for {photographerName}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Rating Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Customer Reviews</h2>
              
              {/* Overall Rating */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(parseFloat(overallRating))}
                  <span className="text-2xl font-bold text-gray-900">{overallRating}</span>
                  <span className="text-gray-600">out of 5</span>
                </div>
                <p className="text-sm text-gray-600">{totalReviews} global ratings</p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2 mb-6">
                {ratingDistribution.map(({ star, count, percentage }) => (
                  <button
                    key={star}
                    onClick={() => setFilterRating(filterRating === star ? null : star)}
                    className={`w-full flex items-center space-x-3 text-sm hover:bg-gray-50 p-2 rounded transition-colors ${
                      filterRating === star ? 'bg-blue-50' : ''
                    }`}
                  >
                    <span className="text-blue-600 font-medium w-10">{star} star</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-5 overflow-hidden">
                      <div 
                        className="bg-yellow-400 h-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-gray-600 w-8">{percentage.toFixed(0)}%</span>
                  </button>
                ))}
              </div>

              {/* Filter Badge */}
              {filterRating && (
                <div className="mb-4">
                  <div className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    <span>Filtered by {filterRating} star</span>
                    <button
                      onClick={() => setFilterRating(null)}
                      className="ml-2 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}

              {/* Book Now */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Book this photographer</h3>
                <p className="text-sm text-gray-600 mb-4">Ready to capture your special moments</p>
                <button 
                  onClick={() => router.push(`/photographer/${searchParams.get('id') || '1'}`)}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  📸 Book Now
                </button>
              </div>
            </div>
          </div>

           {/* Right Content - Reviews List */}
           <div className="lg:col-span-2">
              {/* Filter Bar - All dropdowns in one line */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
                <div className="flex items-center space-x-4 flex-wrap gap-2">
                  {/* Sort Dropdown */}
                  <div className="relative dropdown-container">
                    <button
                      onClick={() => openDropdown('sort')}
                      className="flex items-center space-x-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors"
                    >
                      <span className="text-sm font-medium">
                        {sortBy === 'recent' ? 'Most recent' : 'Most helpful'}
                      </span>
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {showSortDropdown && (
                      <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => {
                            setSortBy('recent');
                            closeAllDropdowns();
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                        >
                          <span>Most recent</span>
                          {sortBy === 'recent' && <CheckIcon className="w-4 h-4 text-blue-600" />}
                        </button>
                        <button
                          onClick={() => {
                            setSortBy('helpful');
                            closeAllDropdowns();
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                        >
                          <span>Most helpful</span>
                          {sortBy === 'helpful' && <CheckIcon className="w-4 h-4 text-blue-600" />}
                        </button>
                      </div>
                    )}
                  </div>

                 {/* All Reviewers */}
                 <div className="relative dropdown-container">
                   <button 
                     onClick={() => openDropdown('reviewers')}
                     className="flex items-center space-x-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors"
                   >
                     <span className="text-sm font-medium">All reviewers</span>
                     <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </button>
                   
                   {showReviewersDropdown && (
                     <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                       <button 
                         onClick={() => closeAllDropdowns()}
                         className="w-full text-left px-4 py-2 hover:bg-gray-50"
                       >
                         <span>All reviewers</span>
                       </button>
                       <button 
                         onClick={() => closeAllDropdowns()}
                         className="w-full text-left px-4 py-2 hover:bg-gray-50"
                       >
                         <span>Verified purchases</span>
                       </button>
                     </div>
                   )}
                 </div>

                 {/* All Stars */}
                 <div className="relative dropdown-container">
                   <button 
                     onClick={() => openDropdown('stars')}
                     className="flex items-center space-x-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors"
                   >
                     <span className="text-sm font-medium">
                       {filterRating ? `${filterRating} star${filterRating > 1 ? 's' : ''}` : 'All stars'}
                     </span>
                     <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </button>
                   
                   {showStarsDropdown && (
                     <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                       <button 
                         onClick={() => {
                           setFilterRating(null);
                           closeAllDropdowns();
                         }}
                         className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                       >
                         <span>All stars</span>
                         {!filterRating && <CheckIcon className="w-4 h-4 text-blue-600" />}
                       </button>
                       {[5, 4, 3, 2, 1].map((star) => (
                         <button
                           key={star}
                           onClick={() => {
                             setFilterRating(filterRating === star ? null : star);
                             closeAllDropdowns();
                           }}
                           className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between"
                         >
                           <span>{star} star{star > 1 ? 's' : ''}</span>
                           {filterRating === star && <CheckIcon className="w-4 h-4 text-blue-600" />}
                         </button>
                       ))}
                     </div>
                   )}
                 </div>

                 {/* All Variants */}
                 <div className="relative dropdown-container">
                   <button 
                     onClick={() => openDropdown('variants')}
                     className="flex items-center space-x-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors"
                   >
                     <span className="text-sm font-medium">All variants</span>
                     <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </button>
                   
                   {showVariantsDropdown && (
                     <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                       <button 
                         onClick={() => closeAllDropdowns()}
                         className="w-full text-left px-4 py-2 hover:bg-gray-50"
                       >
                         <span>All variants</span>
                       </button>
                       <button 
                         onClick={() => closeAllDropdowns()}
                         className="w-full text-left px-4 py-2 hover:bg-gray-50"
                       >
                         <span>Wedding Photography</span>
                       </button>
                       <button 
                         onClick={() => closeAllDropdowns()}
                         className="w-full text-left px-4 py-2 hover:bg-gray-50"
                       >
                         <span>Portrait Photography</span>
                       </button>
                     </div>
                   )}
                 </div>

                 {/* All text, image and video reviews */}
                 <div className="relative dropdown-container">
                   <button 
                     onClick={() => openDropdown('content')}
                     className="flex items-center space-x-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors"
                   >
                     <span className="text-sm font-medium">Text Only</span>
                     <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                   </button>
                   
                   {showContentDropdown && (
                     <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                       <button 
                         onClick={() => closeAllDropdowns()}
                         className="w-full text-left px-4 py-2 hover:bg-gray-50"
                       >
                         <span>All text, image and video reviews</span>
                       </button>
                       <button 
                         onClick={() => closeAllDropdowns()}
                         className="w-full text-left px-4 py-2 hover:bg-gray-50"
                       >
                         <span>Text reviews only</span>
                       </button>
                       <button 
                         onClick={() => closeAllDropdowns()}
                         className="w-full text-left px-4 py-2 hover:bg-gray-50"
                       >
                         <span>Image reviews only</span>
                       </button>
                       <button 
                         onClick={() => closeAllDropdowns()}
                         className="w-full text-left px-4 py-2 hover:bg-gray-50"
                       >
                         <span>Video reviews only</span>
                       </button>
                     </div>
                   )}
                 </div>
               </div>
             </div>

            {/* Reviews List */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 space-y-4">
                {sortedReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0 hover:bg-gray-50 transition-colors duration-200 p-4 rounded-lg">
                  {/* Review Header */}
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={review.user.avatar}
                        alt={review.user.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{review.user.name}</h4>
                      {review.verified && (
                        <div className="flex items-center text-xs text-green-600 mt-1">
                          <CheckIcon className="w-3 h-3 mr-1" />
                          Verified Booking
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Rating and Date */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating, 'w-5 h-5')}
                    </div>
                    <span className="text-sm text-gray-600">{review.date}</span>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>

                  {/* Review Images */}
                  {review.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
                      {review.images.map((image, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
                        >
                          <Image
                            src={image}
                            alt={`Review image ${index + 1}`}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Review Actions */}
                  <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
                    <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      Helpful
                    </button>
                    <button className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      Report
                    </button>
                  </div>
                </div>
                ))}
              </div>

              {/* No Reviews Message */}
              {filteredReviews.length === 0 && (
                <div className="p-12 text-center">
                  <StarOutlineIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
                  <p className="text-gray-600">Try adjusting your filters to see more reviews</p>
                  {filterRating && (
                    <button
                      onClick={() => setFilterRating(null)}
                      className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}

              {/* Pagination */}
              {filteredReviews.length > 0 && (
                <div className="border-t border-gray-200 p-4 flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1-10</span> of <span className="font-medium">{filteredReviews.length}</span> reviews
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                      Previous
                    </button>
                    
                    <div className="flex space-x-1">
                      <button className="px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                        1
                      </button>
                      <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        2
                      </button>
                      <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        3
                      </button>
                      <span className="px-3 py-2 text-sm text-gray-500">...</span>
                      <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                        5
                      </button>
                    </div>
                    
                    <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Best in Category Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BestInCategory category={photographerName} />
      </div>

      {/* Inspired by Browsing History Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <InspiredByHistory userHistory={["Wedding Photography", "Portrait Photography", "Event Photography"]} />
      </div>

      {/* Your Searches Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <YourSearches />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

