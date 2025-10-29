'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import { HeartIcon, MapPinIcon, ClockIcon, CameraIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import CategoryTags from '../common/CategoryTags';
import { useWishlist } from '../wishlist/WishlistContext';

interface PhotographerCardProps {
  id: number;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  experience: string;
  image: string;
  category: string;
  subCategory?: string;
  categories?: string[];
  onClick?: () => void;
}

export default function PhotographerCard({
  id,
  name,
  specialty,
  location,
  rating,
  reviews,
  price,
  experience,
  image,
  category,
  subCategory,
  categories,
  onClick
}: PhotographerCardProps) {
  const router = useRouter();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showRatingHover, setShowRatingHover] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Generate sample portfolio images based on photographer's specialty
  const generatePortfolioImages = () => {
    // Large pool of wedding/event images
    const weddingImages = [
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1520854221256-17449cc91bf9?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1525258670393-d0b0d3a8724e?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1529636798458-92182e662485?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1545291730-faff8ca1d4b0?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=300&fit=crop&crop=center&auto=format"
    ];

    // Large pool of portrait images
    const portraitImages = [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1557862921-37829c790f19?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1588392382834-a891154bca4d?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=center&auto=format"
    ];

    // Large pool of general event images
    const eventImages = [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=400&h=300&fit=crop&crop=center&auto=format",
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400&h=300&fit=crop&crop=center&auto=format"
    ];
    
    // Select image pool based on specialty
    let imagePool = eventImages;
    if (specialty.toLowerCase().includes('wedding') || specialty.toLowerCase().includes('haldi') || specialty.toLowerCase().includes('mehendi') || specialty.toLowerCase().includes('reception') || specialty.toLowerCase().includes('pre-wedding')) {
      imagePool = weddingImages;
    } else if (specialty.toLowerCase().includes('portrait') || specialty.toLowerCase().includes('headshot') || specialty.toLowerCase().includes('portfolio') || specialty.toLowerCase().includes('linkedin')) {
      imagePool = portraitImages;
    }
    
    // Use photographer ID to select different images for each card
    const startIndex = (id * 3) % imagePool.length;
    const selectedImages = [];
    
    for (let i = 0; i < 5; i++) {
      const index = (startIndex + i) % imagePool.length;
      selectedImages.push(imagePool[index]);
    }
    
    // Custom first photos for specific photographers
    if (id === 2) { // Rajesh Kumar
      selectedImages[0] = "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&crop=center&auto=format";
    } else if (id === 22) { // Meera Patel
      selectedImages[0] = "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=300&fit=crop&crop=center&auto=format";
    } else if (id === 27) { // Suresh Iyer
      selectedImages[0] = "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=400&h=300&fit=crop&crop=center&auto=format";
    }
    
    return selectedImages;
  };

  const portfolioImages = generatePortfolioImages();

  // Generate tier label based on photographer ID
  const getTierLabel = () => {
    const tiers = ['Basic', 'Standard', 'Premium'];
    const tierColors = [
      'bg-gray-100 text-gray-600 border-gray-200',
      'bg-blue-100 text-blue-600 border-blue-200', 
      'bg-purple-100 text-purple-600 border-purple-200'
    ];
    
    const tierIndex = id % 3;
    return {
      label: tiers[tierIndex],
      colorClass: tierColors[tierIndex]
    };
  };

  const tierInfo = getTierLabel();

  // Generate recommended features based on photographer ID
  const getRecommendedFeatures = () => {
    const allFeatures = [
      'Fast Delivery',
      'Quick Response',
      'Professional',
      'Experienced',
      'Best Rated',
      'Top Seller',
      'Quality Work',
      'On Time',
      'Affordable',
      'Creative'
    ];
    
    // Select 2-3 features based on photographer ID
    const featureCount = 2 + (id % 2); // 2 or 3 features
    const features = [];
    const startIndex = (id * 2) % allFeatures.length;
    
    for (let i = 0; i < featureCount; i++) {
      const index = (startIndex + i) % allFeatures.length;
      features.push(allFeatures[index]);
    }
    
    return features;
  };

  const recommendedFeatures = getRecommendedFeatures();

  // Generate realistic rating breakdown based on overall rating
  const generateRatingBreakdown = () => {
    const totalReviews = reviews;
    const breakdown = [0, 0, 0, 0, 0]; // 1-star to 5-star counts
    
    // Distribute reviews based on rating
    if (rating >= 4.5) {
      breakdown[4] = Math.floor(totalReviews * 0.6); // 60% 5-star
      breakdown[3] = Math.floor(totalReviews * 0.25); // 25% 4-star
      breakdown[2] = Math.floor(totalReviews * 0.1);  // 10% 3-star
      breakdown[1] = Math.floor(totalReviews * 0.03); // 3% 2-star
      breakdown[0] = totalReviews - breakdown[4] - breakdown[3] - breakdown[2] - breakdown[1]; // Remaining 1-star
    } else if (rating >= 4.0) {
      breakdown[4] = Math.floor(totalReviews * 0.45); // 45% 5-star
      breakdown[3] = Math.floor(totalReviews * 0.35); // 35% 4-star
      breakdown[2] = Math.floor(totalReviews * 0.15); // 15% 3-star
      breakdown[1] = Math.floor(totalReviews * 0.03); // 3% 2-star
      breakdown[0] = totalReviews - breakdown[4] - breakdown[3] - breakdown[2] - breakdown[1]; // Remaining 1-star
    } else if (rating >= 3.5) {
      breakdown[4] = Math.floor(totalReviews * 0.3);  // 30% 5-star
      breakdown[3] = Math.floor(totalReviews * 0.35); // 35% 4-star
      breakdown[2] = Math.floor(totalReviews * 0.25); // 25% 3-star
      breakdown[1] = Math.floor(totalReviews * 0.07); // 7% 2-star
      breakdown[0] = totalReviews - breakdown[4] - breakdown[3] - breakdown[2] - breakdown[1]; // Remaining 1-star
    } else {
      breakdown[4] = Math.floor(totalReviews * 0.2);  // 20% 5-star
      breakdown[3] = Math.floor(totalReviews * 0.25); // 25% 4-star
      breakdown[2] = Math.floor(totalReviews * 0.3);  // 30% 3-star
      breakdown[1] = Math.floor(totalReviews * 0.15); // 15% 2-star
      breakdown[0] = totalReviews - breakdown[4] - breakdown[3] - breakdown[2] - breakdown[1]; // Remaining 1-star
    }
    
    return breakdown;
  };

  const ratingBreakdown = generateRatingBreakdown();

  // Check if component is mounted for portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-rotate images when hovered
  useEffect(() => {
    if (isHovered && portfolioImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % portfolioImages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isHovered, portfolioImages.length]);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const wishlistItem = {
      id,
      name,
      specialty,
      location,
      rating,
      reviews,
      price,
      experience,
      image,
      category,
      subCategory,
      categories,
      addedAt: Date.now()
    };

    if (isInWishlist(id)) {
      removeFromWishlist(id);
      setIsLiked(false);
    } else {
      addToWishlist(wishlistItem);
      setIsLiked(true);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(`/photographer/${id}`);
    }
  };
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarSolidIcon key={i} className="w-4 h-4 text-yellow-400 transition-all duration-200 group-hover:scale-110" />
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

  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer group"
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
         {/* Animated Image Gallery Section */}
        <div className="relative aspect-[3/2] sm:aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        {/* Main Image */}
        <div className="relative w-full h-full">
            <img
              src={portfolioImages[currentImageIndex]}
              alt={`${name} portfolio ${currentImageIndex + 1}`}
              className="w-full h-full object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-110"
            />
          
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Trusted Badge */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-purple-500/90 backdrop-blur-sm text-white px-1 sm:px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-lg">
              <ShieldCheckIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span className="text-[7px] sm:text-[8px] font-bold tracking-wide">TRUSTED</span>
            </div>
            
            {/* Like Button */}
          <button
            className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white/90 backdrop-blur-sm p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
            onClick={handleWishlistToggle}
          >
            {isInWishlist(id) ? (
              <HeartSolidIcon className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            )}
          </button>
          
          {/* Category Badge */}
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-blue-600/90 backdrop-blur-sm text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <CameraIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 inline mr-0.5 sm:mr-1" />
            {specialty}
          </div>
        </div>
        
        {/* Image Dots Indicator */}
        {portfolioImages.length > 1 && (
          <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {portfolioImages.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
         {/* Content Section */}
        <div className="p-2.5 sm:p-3">
         {/* Photographer Info */}
         <div className="flex items-start space-x-2 sm:space-x-3 mb-2 sm:mb-3">
           <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
               <div className="flex items-center gap-1 sm:gap-2">
                 <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
                   {name}
                 </h3>
                 <div className="relative group/verified">
                   <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                   </svg>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white text-gray-900 text-xs rounded-lg opacity-0 group-hover/verified:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-gray-200">
                      All details of this photographer are <span className="font-bold">verified</span>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                    </div>
                 </div>
               </div>
              <div className="relative flex items-center space-x-1 ml-2">
               <div 
                 className="flex items-center space-x-1 cursor-pointer"
                 onMouseEnter={(e) => {
                   const rect = e.currentTarget.getBoundingClientRect();
                   setHoverPosition({
                     x: rect.left,
                     y: rect.top - 10
                   });
                   setShowRatingHover(true);
                 }}
                 onMouseLeave={() => setShowRatingHover(false)}
               >
                 <span className="text-gray-600 text-xs sm:text-sm font-medium">
                   {rating}
                 </span>
                 <StarSolidIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400" />
               </div>
               
               {/* Rating Hover Component - Portal */}
               {showRatingHover && isMounted && createPortal(
                 <div 
                   className="fixed bg-white border border-gray-200 rounded-lg shadow-xl p-3 w-64 z-[999999] backdrop-blur-sm"
                   style={{ 
                     left: `${hoverPosition.x}px`,
                     top: `${hoverPosition.y}px`,
                     transform: 'translateY(-100%)'
                   }}
                 >
                   {/* Overall Rating */}
                   <div className="flex items-center mb-2">
                     <span className="text-lg font-semibold text-gray-900 mr-1">{rating}</span>
                     <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                     <span className="text-sm text-gray-600 ml-2">{reviews} Ratings & Reviews</span>
                   </div>
                   
                   {/* Star Breakdown */}
                   <div className="space-y-1">
                     {[5, 4, 3, 2, 1].map((star, index) => {
                       const count = ratingBreakdown[4 - index];
                       const percentage = reviews > 0 ? (count / reviews) * 100 : 0;
                       const barColor = star >= 4 ? 'bg-green-500' : star >= 3 ? 'bg-yellow-500' : 'bg-red-500';
                       
                       return (
                         <div key={star} className="flex items-center space-x-2">
                           <span className="text-xs text-gray-600 w-3">{star}★</span>
                           <div className="flex-1 bg-gray-200 rounded-full h-2">
                             <div 
                               className={`h-2 rounded-full ${barColor} transition-all duration-300`}
                               style={{ width: `${percentage}%` }}
                             />
                           </div>
                           <span className="text-xs text-gray-600 w-8 text-right">{count}</span>
                         </div>
                       );
                     })}
                   </div>
                   
                   {/* Arrow pointing down */}
                   <div className="absolute top-full left-4 border-4 border-transparent border-t-white"></div>
                 </div>,
                 document.body
               )}
             </div>
            </div>
            <div className="mb-1">
              <span className={`inline-flex items-center px-1 sm:px-1.5 py-0.5 rounded text-[8px] sm:text-[9px] font-semibold tracking-wider border ${tierInfo.colorClass} transition-all duration-200`}>
                {tierInfo.label}
              </span>
            </div>
             <div className="flex items-center justify-between mt-1">
               <div className="flex items-center">
                 <MapPinIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 mr-0.5 sm:mr-1" />
                 <span className="text-gray-500 text-[10px] sm:text-xs truncate">{location}</span>
               </div>
               <div className="flex items-center text-gray-500 text-[10px] sm:text-xs">
                 <ClockIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
                 {experience}
               </div>
             </div>
         </div>
       </div>

       {/* Category Tags */}
         <CategoryTags categories={categories || []} />
         
         {/* Recommended Features */}
         {recommendedFeatures.length > 0 && (
           <div className="mt-1.5 sm:mt-2">
             <span className="text-[9px] sm:text-[10px] text-gray-500 font-medium">Recommended for</span>
             <div className="flex flex-wrap gap-1 sm:gap-1.5 mt-1">
               {recommendedFeatures.map((feature, index) => (
                 <span
                   key={index}
                   className="inline-flex items-center px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-medium bg-gray-100 text-gray-600 border border-gray-200 transition-all duration-200 hover:bg-gray-200"
                 >
                   {feature}
                 </span>
               ))}
             </div>
           </div>
         )}
       </div>
    </div>
  );
}
