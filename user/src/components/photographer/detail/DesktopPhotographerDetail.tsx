'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, StarIcon as StarSolidIcon, StarIcon as StarOutlineIcon, MapPinIcon, ClockIcon, CameraIcon, HeartIcon, ShareIcon, ChatBubbleLeftIcon, XMarkIcon, CalendarDaysIcon, HandThumbUpIcon, HandThumbDownIcon, TicketIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, HandThumbUpIcon as HandThumbUpSolidIcon, HandThumbDownIcon as HandThumbDownSolidIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { categories, type Category, type SubCategory } from '@/data/categories';
import { BestInCategory, InspiredByHistory } from '@/components/photographer';
import YourSearches from '@/components/common/YourSearches';
import BookingCalendar from '@/components/bookingSession/BookingCalendar';
import { useCart } from '@/components/cart/CartContext';

interface PortfolioCategory {
  name: string;
  count: number;
  images: string[];
}

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
}

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
  portfolioCategories?: PortfolioCategory[];
  comments?: Comment[];
  availability: string;
  languages: string[];
  equipment: string[];
  awards: string[];
}

interface DesktopPhotographerDetailProps {
  photographer: Photographer;
  category?: string;
  subcategory?: string;
  packageParam?: string;
}

export default function DesktopPhotographerDetail({ photographer, category, subcategory, packageParam }: DesktopPhotographerDetailProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activePortfolioTab, setActivePortfolioTab] = useState('TOP PHOTOS');
  const [activePortfolioCategory, setActivePortfolioCategory] = useState('Mehndi');
  const [showAllAddons, setShowAllAddons] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categoryModalAction, setCategoryModalAction] = useState<'book' | 'cart'>('book');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageIndex, setPopupImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeAboutTab, setActiveAboutTab] = useState('about');
  const [showAllTeamMembers, setShowAllTeamMembers] = useState(false);
  const [showAvailabilityCalendar, setShowAvailabilityCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [showMoreExpertise, setShowMoreExpertise] = useState(false);
  const [showMoreCertificates, setShowMoreCertificates] = useState(false);
  const [imageReactions, setImageReactions] = useState<{ [key: string]: 'like' | 'dislike' | null }>({});
  const [imageLikeCounts, setImageLikeCounts] = useState<{ [key: string]: number }>({});
  const [imageDislikeCounts, setImageDislikeCounts] = useState<{ [key: string]: number }>({});

  // Generate tier label based on photographer ID
  const getTierLabel = () => {
    const tiers = ['Basic', 'Standard', 'Premium'];
    const tierColors = [
      'bg-gray-100 text-gray-600 border-gray-200',
      'bg-blue-100 text-blue-600 border-blue-200', 
      'bg-purple-100 text-purple-600 border-purple-200'
    ];
    
    const tierIndex = photographer.id % 3;
    return {
      label: tiers[tierIndex],
      colorClass: tierColors[tierIndex]
    };
  };

  const tierInfo = getTierLabel();

  // Auto-scroll carousel
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setSelectedImageIndex(prev => prev < getCurrentPortfolioImages().length - 1 ? prev + 1 : 0);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [selectedImageIndex, activePortfolioCategory, isPaused]);

  // Set first category as selected when modal opens
  useEffect(() => {
    if (showCategoryModal && !selectedCategory && categories.length > 0) {
      setSelectedCategory(categories[0].id);
      setSelectedSubCategory('');
    }
  }, [showCategoryModal]);

  const renderStars = (rating: number = photographer.rating, size: string = 'w-5 h-5') => {
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

  const getCurrentPortfolioImages = () => {
    // Create category-specific image sets
    const categoryImages: { [key: string]: string[] } = {
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
      ],
      'Haldi': [
        "https://images.unsplash.com/photo-1520854221256-17449cc91bf9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop"
      ],
      'Reception': [
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop"
      ],
      'Pre-Wedding': [
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop"
      ],
      'Portrait': [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop"
      ],
      'Family': [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop"
      ]
    };

    // If a category is selected, return its images, otherwise return all portfolio images
    if (activePortfolioCategory && categoryImages[activePortfolioCategory]) {
      return categoryImages[activePortfolioCategory];
    }
    
    return photographer.portfolio || [];
  };

  const handleBookNow = () => {
    // If package is present, skip category selection
    if (packageParam) {
      const bookingParams = new URLSearchParams();
      bookingParams.append('photographerId', photographer.id.toString());
      bookingParams.append('photographerName', photographer.name);
      bookingParams.append('price', photographer.price);
      bookingParams.append('package', packageParam);
      bookingParams.append('source', 'buynow');
      
      // Add selected date and time slots if available
      if (selectedDate) {
        bookingParams.append('selectedDate', selectedDate.toISOString());
      }
      if (selectedTimeSlots.length > 0) {
        bookingParams.append('selectedTimeSlots', selectedTimeSlots.join(','));
      }
      
      router.push(`/booking?${bookingParams.toString()}`);
      return;
    }

    // If no category is selected, show the category selection modal
    if (!category && !selectedCategory) {
      setCategoryModalAction('book');
      setShowCategoryModal(true);
      return;
    }

    // Create booking URL with category and subcategory information
    const bookingParams = new URLSearchParams();
    bookingParams.append('photographerId', photographer.id.toString());
    bookingParams.append('photographerName', photographer.name);
    bookingParams.append('price', photographer.price);
    bookingParams.append('source', 'buynow');
    
    const finalCategory = category || selectedCategory;
    const finalSubCategory = subcategory || selectedSubCategory;
    
    if (finalCategory) {
      bookingParams.append('category', finalCategory);
    }
    
    if (finalSubCategory) {
      bookingParams.append('subcategory', finalSubCategory);
    }
    
    // Add selected date and time slots if available
    if (selectedDate) {
      bookingParams.append('selectedDate', selectedDate.toISOString());
    }
    if (selectedTimeSlots.length > 0) {
      bookingParams.append('selectedTimeSlots', selectedTimeSlots.join(','));
    }
    
    // Navigate to booking page with parameters
    router.push(`/booking?${bookingParams.toString()}`);
  };

  const handleCategorySelection = () => {
    if (selectedCategory && selectedSubCategory) {
      setShowCategoryModal(false);
      if (categoryModalAction === 'cart') {
        // Navigate to booking with source=cart; actual add to cart occurs on booking page
        const finalCategory = selectedCategory;
        const finalSubCategory = selectedSubCategory;

        const bookingParams = new URLSearchParams();
        bookingParams.append('photographerId', photographer.id.toString());
        bookingParams.append('photographerName', photographer.name);
        bookingParams.append('price', photographer.price);
        bookingParams.append('source', 'cart');
        bookingParams.append('category', finalCategory);
        bookingParams.append('subcategory', finalSubCategory);

        if (selectedDate) {
          bookingParams.append('selectedDate', selectedDate.toISOString());
        }
        if (selectedTimeSlots.length > 0) {
          bookingParams.append('selectedTimeSlots', selectedTimeSlots.join(','));
        }

        router.push(`/booking?${bookingParams.toString()}`);
      } else {
        // Now proceed with booking
        handleBookNow();
      }
    }
  };

  const getSelectedCategoryData = () => {
    return categories.find(cat => cat.id === selectedCategory);
  };

  const handleAddToCart = () => {
    // If package is present, add directly to cart
    if (packageParam) {
      // Navigate to booking with source=cart
      const bookingParams = new URLSearchParams();
      bookingParams.append('photographerId', photographer.id.toString());
      bookingParams.append('photographerName', photographer.name);
      bookingParams.append('price', photographer.price);
      bookingParams.append('package', packageParam);
      bookingParams.append('source', 'cart');

      if (selectedDate) {
        bookingParams.append('selectedDate', selectedDate.toISOString());
      }
      if (selectedTimeSlots.length > 0) {
        bookingParams.append('selectedTimeSlots', selectedTimeSlots.join(','));
      }

      router.push(`/booking?${bookingParams.toString()}`);
      return;
    }

    // If no category is selected, show the category selection modal
    if (!category && !selectedCategory) {
      setCategoryModalAction('cart');
      setShowCategoryModal(true);
      return;
    }

    // Navigate to booking with category/subcategory; addition will happen on booking page
    const finalCategory = category || selectedCategory;
    const finalSubCategory = subcategory || selectedSubCategory;
    // Navigate to booking with source=cart
    const bookingParams = new URLSearchParams();
    bookingParams.append('photographerId', photographer.id.toString());
    bookingParams.append('photographerName', photographer.name);
    bookingParams.append('price', photographer.price);
    bookingParams.append('source', 'cart');

    if (finalCategory) {
      bookingParams.append('category', finalCategory);
    }
    if (finalSubCategory) {
      bookingParams.append('subcategory', finalSubCategory);
    }

    if (selectedDate) {
      bookingParams.append('selectedDate', selectedDate.toISOString());
    }
    if (selectedTimeSlots.length > 0) {
      bookingParams.append('selectedTimeSlots', selectedTimeSlots.join(','));
    }

    router.push(`/booking?${bookingParams.toString()}`);
  };

  const handleImageReaction = (imageUrl: string, reaction: 'like' | 'dislike') => {
    setImageReactions(prev => {
      const currentReaction = prev[imageUrl];
      if (currentReaction === reaction) {
        // If clicking the same reaction, remove it
        const newReactions = { ...prev };
        delete newReactions[imageUrl];
        return newReactions;
      } else {
        // Set new reaction
        return { ...prev, [imageUrl]: reaction };
      }
    });

    // Update like counts
    setImageLikeCounts(prev => {
      const currentCount = prev[imageUrl] || 200;
      const currentReaction = imageReactions[imageUrl];
      
      if (reaction === 'like') {
        if (currentReaction === 'like') {
          // Remove like
          return { ...prev, [imageUrl]: Math.max(0, currentCount - 1) };
        } else if (currentReaction === 'dislike') {
          // Change from dislike to like
          return { ...prev, [imageUrl]: currentCount + 1 };
        } else {
          // Add new like
          return { ...prev, [imageUrl]: currentCount + 1 };
        }
      } else {
        // Dislike clicked
        if (currentReaction === 'like') {
          // Change from like to dislike
          return { ...prev, [imageUrl]: Math.max(0, currentCount - 1) };
        }
        // If it was already dislike or no reaction, no change to count
        return prev;
      }
    });

    // Update dislike counts
    setImageDislikeCounts(prev => {
      const currentCount = prev[imageUrl] || 12;
      const currentReaction = imageReactions[imageUrl];
      
      if (reaction === 'dislike') {
        if (currentReaction === 'dislike') {
          // Remove dislike
          return { ...prev, [imageUrl]: Math.max(0, currentCount - 1) };
        } else if (currentReaction === 'like') {
          // Change from like to dislike
          return { ...prev, [imageUrl]: currentCount + 1 };
        } else {
          // Add new dislike
          return { ...prev, [imageUrl]: currentCount + 1 };
        }
      } else {
        // Like clicked
        if (currentReaction === 'dislike') {
          // Change from dislike to like
          return { ...prev, [imageUrl]: Math.max(0, currentCount - 1) };
        }
        // If it was already like or no reaction, no change to count
        return prev;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-9">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1.5" />
              <span className="text-xs">Back</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center space-x-1.5 text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                {isFavorite ? (
                  <HeartSolidIcon className="w-4 h-4 text-red-500" />
                ) : (
                  <HeartIcon className="w-4 h-4" />
                )}
                <span className="text-xs">Save</span>
              </button>
              
              <button className="flex items-center space-x-1.5 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <ShareIcon className="w-4 h-4" />
                <span className="text-xs">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">


             {/* Portfolio Gallery */}
             <div className="bg-white rounded-lg shadow-sm p-6">
               {/* Main Photo Carousel */}
               <div 
                 className="relative aspect-video rounded-lg overflow-hidden shadow-lg mb-6 cursor-pointer"
                 onClick={() => {
                   setPopupImageIndex(selectedImageIndex);
                   setShowImagePopup(true);
                 }}
                 onMouseEnter={() => setIsPaused(true)}
                 onMouseLeave={() => setIsPaused(false)}
               >
                 <Image
                   src={getCurrentPortfolioImages()[selectedImageIndex]}
                   alt="Featured portfolio image"
                   width={800}
                   height={450}
                   className="w-full h-full object-cover"
                 />
                 
                 {/* Carousel Navigation */}
                 <div className="absolute inset-0 flex items-center justify-between p-4">
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       setSelectedImageIndex(prev => prev > 0 ? prev - 1 : getCurrentPortfolioImages().length - 1);
                     }}
                     className="w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                     </svg>
                   </button>
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       setSelectedImageIndex(prev => prev < getCurrentPortfolioImages().length - 1 ? prev + 1 : 0);
                     }}
                     className="w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                   </button>
                 </div>
                 
                 {/* Like/Dislike Icons */}
                 <div className="absolute top-4 right-4 flex flex-col space-y-2">
                   <div className="flex space-x-2">
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         handleImageReaction(getCurrentPortfolioImages()[selectedImageIndex], 'like');
                       }}
                       className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                     >
                       {imageReactions[getCurrentPortfolioImages()[selectedImageIndex]] === 'like' ? (
                         <HandThumbUpSolidIcon className="w-4 h-4 text-green-600" />
                       ) : (
                         <HandThumbUpIcon className="w-4 h-4" />
                       )}
                     </button>
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         handleImageReaction(getCurrentPortfolioImages()[selectedImageIndex], 'dislike');
                       }}
                       className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                     >
                       {imageReactions[getCurrentPortfolioImages()[selectedImageIndex]] === 'dislike' ? (
                         <HandThumbDownSolidIcon className="w-4 h-4 text-red-600" />
                       ) : (
                         <HandThumbDownIcon className="w-4 h-4" />
                       )}
                     </button>
                   </div>
                   {/* Like/Dislike Count */}
                   <div className="bg-white bg-opacity-90 rounded-full px-2 py-1 shadow-lg">
                     <div className="flex items-center space-x-2 text-xs font-semibold text-gray-700">
                       <span className="text-green-600">{imageLikeCounts[getCurrentPortfolioImages()[selectedImageIndex]] || 200}</span>
                       <span>•</span>
                       <span className="text-red-600">{imageDislikeCounts[getCurrentPortfolioImages()[selectedImageIndex]] || 12}</span>
                     </div>
                   </div>
                 </div>

                 {/* Carousel Indicators */}
                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                   {getCurrentPortfolioImages().map((_: string, index: number) => (
                     <button
                       key={index}
                       onClick={(e) => {
                         e.stopPropagation();
                         setSelectedImageIndex(index);
                       }}
                       className={`w-2 h-2 rounded-full transition-all duration-200 ${
                         selectedImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
                       }`}
                     />
                   ))}
                 </div>
               </div>
               
               {/* Horizontal Category Cards with Carousel */}
               <div className="relative">
                 <div 
                   className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
                   style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                 >
                   {(() => {
                     const categories = [
                       { id: 1, name: "Mehndi", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=150&h=150&fit=crop" },
                       { id: 2, name: "Engagement", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=150&h=150&fit=crop" },
                       { id: 3, name: "Wedding", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=150&h=150&fit=crop" },
                       { id: 4, name: "Haldi", image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=150&h=150&fit=crop" },
                       { id: 5, name: "Reception", image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=150&h=150&fit=crop" },
                       { id: 6, name: "Pre-Wedding", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=150&h=150&fit=crop" },
                       { id: 7, name: "Portrait", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop" },
                       { id: 8, name: "Family", image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=150&h=150&fit=crop" }
                     ];

                     return categories.map((category) => (
                       <div 
                         key={category.id} 
                         className={`relative w-24 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 flex-shrink-0 ${
                           activePortfolioCategory === category.name ? 'ring-2 ring-blue-500 scale-110' : 'hover:scale-105 hover:shadow-lg'
                         }`}
                         onClick={() => setActivePortfolioCategory(category.name)}
                       >
                         <Image
                           src={category.image}
                           alt={category.name}
                           width={96}
                           height={80}
                           className="w-full h-full object-cover"
                         />
                         {/* Dark overlay */}
                         <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                         
                         {/* Category text */}
                         <div className="absolute bottom-0 left-0 right-0 p-2 text-center">
                           <p className="text-white text-xs font-semibold drop-shadow-lg">{category.name}</p>
                         </div>
                         
                         {/* Selection Indicator */}
                         {activePortfolioCategory === category.name && (
                           <div className="absolute top-1 right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                             <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                             </svg>
                           </div>
                         )}
                       </div>
                     ));
                   })()}
                 </div>
                 
                 {/* Scroll indicators */}
                 <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-gradient-to-r from-white to-transparent flex items-center justify-center pointer-events-none">
                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                   </svg>
                 </div>
                 <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-12 bg-gradient-to-l from-white to-transparent flex items-center justify-center pointer-events-none">
                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </div>
               </div>
             </div>

            {/* About Section with Tabs */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About {photographer.name}</h2>
              
              {/* Tab Navigation */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveAboutTab('about')}
                  className={`px-4 py-3 font-medium text-sm transition-colors duration-200 ${
                    activeAboutTab === 'about'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => setActiveAboutTab('teams')}
                  className={`px-4 py-3 font-medium text-sm transition-colors duration-200 ${
                    activeAboutTab === 'teams'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Teams
                </button>
              </div>

              {/* Tab Content */}
              {activeAboutTab === 'about' && (
              <div className="space-y-8">
                {/* Brief Section */}
                <div>
                  <h2 className="font-semibold text-gray-900 mb-3">Introduction</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {photographer.name} is a premium photography service primarily focused on wedding photography and films, 
                    also excelling in candid and classic styles. With over {photographer.experience} of experience in wedding 
                    photography, we have the ability to be hired anywhere in India, located in the {photographer.location} region. 
                    Our emphasis is on capturing ideal moments, with weddings being our main focus. We specialize in total event 
                    production, managing everything from conception to follow-up for events like grandiose weddings, corporate 
                    conferences, or gala dinners. Our work is driven by innovation, technological know-how, and extensive industry 
                    expertise. We offer flexible, tailored pricing solutions starting from {photographer.price} per hour, with 
                    customizable packages to suit various needs and budgets.
                  </p>
                </div>

                {/* Additional Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">Experience</h2>
                  <p className="text-gray-600">{photographer.experience}</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-semibold text-gray-900">Availability</h2>
                    <button
                      onClick={() => setShowAvailabilityCalendar(true)}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                      title="View Availability Calendar"
                    >
                      <CalendarDaysIcon className="w-4 h-4" />
                      <span className="text-xs">View Calendar</span>
                    </button>
                  </div>
                  <p className="text-gray-600">{photographer.availability}</p>
                </div>
                
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">Expertise</h2>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Wedding Photography",
                      "Portrait Photography", 
                      "Event Photography",
                      "Pre-Wedding Shoots",
                      "Corporate Events",
                      "Fashion Photography"
                    ].slice(0, showMoreExpertise ? 6 : 3).map((expertise, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {expertise}
                      </span>
                    ))}
                    {[
                      "Wedding Photography",
                      "Portrait Photography", 
                      "Event Photography",
                      "Pre-Wedding Shoots",
                      "Corporate Events",
                      "Fashion Photography"
                    ].length > 3 && (
                      <button
                        onClick={() => setShowMoreExpertise(!showMoreExpertise)}
                        className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition-colors duration-200"
                      >
                        {showMoreExpertise ? "Show less" : "+3 more"}
                      </button>
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">Languages</h2>
                  <div className="flex flex-wrap gap-2">
                    {photographer.languages.map((language, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">Equipment</h2>
                  <div className="flex flex-wrap gap-2">
                    {photographer.equipment.map((item, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="font-semibold text-gray-900 mb-2">Certificates</h2>
                  <div className="space-y-2">
                    {[
                      "Professional Photography Certification (PPC)",
                      "Wedding Photography Masterclass",
                      "Adobe Lightroom Expert",
                      "Canon Professional Services Member",
                      "FAA Part 107 Drone License",
                      "CPP - Certified Professional Photographer"
                    ].slice(0, showMoreCertificates ? 6 : 3).map((certificate, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{certificate}</span>
                      </div>
                    ))}
                    {[
                      "Professional Photography Certification (PPC)",
                      "Wedding Photography Masterclass",
                      "Adobe Lightroom Expert",
                      "Canon Professional Services Member",
                      "FAA Part 107 Drone License",
                      "CPP - Certified Professional Photographer"
                    ].length > 3 && (
                      <button
                        onClick={() => setShowMoreCertificates(!showMoreCertificates)}
                        className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-100 transition-colors duration-200 mt-2"
                      >
                        {showMoreCertificates ? "Show less" : "+3 more"}
                      </button>
                    )}
                  </div>
                  </div>
                </div>
              </div>
              )}

              {activeAboutTab === 'teams' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Team Members */}
                    {(() => {
                      const allTeamMembers = [
                        {
                          id: 1,
                          name: "Rajesh Kumar",
                          role: "Lead Photographer",
                          specialization: "Wedding & Portrait Photography",
                          experience: "8+ years",
                          skills: ["Portrait Photography", "Event Coverage", "Photo Editing"]
                        },
                        {
                          id: 2,
                          name: "Priya Sharma",
                          role: "Drone Operator",
                          specialization: "Aerial Photography & Videography",
                          experience: "5+ years",
                          skills: ["Drone Photography", "Aerial Videography", "Safety Management"]
                        },
                        {
                          id: 3,
                          name: "Amit Patel",
                          role: "Video Editor",
                          specialization: "Cinematic Video Editing",
                          experience: "6+ years",
                          skills: ["Video Editing", "Color Grading", "Motion Graphics"]
                        },
                        {
                          id: 4,
                          name: "Sneha Reddy",
                          role: "Assistant Photographer",
                          specialization: "Candid & Lifestyle Photography",
                          experience: "4+ years",
                          skills: ["Candid Photography", "Second Shooter", "Equipment Management"]
                        },
                        {
                          id: 5,
                          name: "Vikram Singh",
                          role: "Photo Editor",
                          specialization: "Post-Processing & Retouching",
                          experience: "7+ years",
                          skills: ["Photo Retouching", "Color Correction", "Album Design"]
                        },
                        {
                          id: 6,
                          name: "Kavya Gupta",
                          role: "Event Coordinator",
                          specialization: "Wedding Planning & Coordination",
                          experience: "5+ years",
                          skills: ["Event Planning", "Client Communication", "Timeline Management"]
                        },
                        {
                          id: 7,
                          name: "Rohit Mehta",
                          role: "Lighting Specialist",
                          specialization: "Studio & Outdoor Lighting",
                          experience: "6+ years",
                          skills: ["Studio Lighting", "Natural Light", "Flash Photography"]
                        },
                        {
                          id: 8,
                          name: "Anita Joshi",
                          role: "Makeup Artist",
                          specialization: "Bridal & Event Makeup",
                          experience: "9+ years",
                          skills: ["Bridal Makeup", "Photo Makeup", "Hair Styling"]
                        },
                        {
                          id: 9,
                          name: "Suresh Kumar",
                          role: "Equipment Manager",
                          specialization: "Technical Support & Maintenance",
                          experience: "10+ years",
                          skills: ["Equipment Setup", "Technical Support", "Maintenance"]
                        },
                        {
                          id: 10,
                          name: "Deepika Singh",
                          role: "Client Relations Manager",
                          specialization: "Customer Service & Coordination",
                          experience: "5+ years",
                          skills: ["Client Communication", "Booking Management", "Customer Service"]
                        },
                        {
                          id: 11,
                          name: "Manoj Agarwal",
                          role: "Second Shooter",
                          specialization: "Event Coverage & Backup Photography",
                          experience: "4+ years",
                          skills: ["Event Photography", "Candid Shots", "Backup Coverage"]
                        },
                        {
                          id: 12,
                          name: "Pooja Verma",
                          role: "Album Designer",
                          specialization: "Photo Album & Print Design",
                          experience: "6+ years",
                          skills: ["Album Design", "Print Layout", "Creative Design"]
                        }
                      ];

                      const displayedMembers = showAllTeamMembers ? allTeamMembers : allTeamMembers.slice(0, 6);

                      return displayedMembers.map((member) => (
                        <div key={member.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                          <div className="mb-3">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1">{member.name}</h4>
                            <p className="text-blue-600 font-medium text-xs mb-1">{member.role}</p>
                            <p className="text-gray-500 text-xs">{member.specialization}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-xs text-gray-600">
                              <ClockIcon className="w-3 h-3 mr-1" />
                              <span>{member.experience}</span>
                            </div>
                            
                            <div>
                              <p className="text-xs font-medium text-gray-700 mb-1">Skills:</p>
                              <div className="flex flex-wrap gap-1">
                                {member.skills.map((skill, index) => (
                                  <span key={index} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>

                  {/* Show More Button */}
                  {!showAllTeamMembers && (
                    <div className="text-center">
                      <button
                        onClick={() => setShowAllTeamMembers(true)}
                        className="bg-blue-50 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200 border border-blue-200"
                      >
                        Show More Team Members
                      </button>
                    </div>
                  )}
                  
                  {/* Team Stats */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                    <h2 className="font-semibold text-gray-900 mb-4">Team Overview</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-gray-600">Team Members</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">75+</div>
                        <div className="text-sm text-gray-600">Years Combined</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">500+</div>
                        <div className="text-sm text-gray-600">Events Covered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-gray-600">Support Available</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeAboutTab === 'about' && photographer.awards.length > 0 && (
                <div className="mt-6">
                  <h2 className="font-semibold text-gray-900 mb-2">Awards & Recognition</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {photographer.awards.map((award, index) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeAboutTab === 'about' && (
                <div className="mt-6">
                  <h2 className="font-semibold text-gray-900 mb-3">Projects Done</h2>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Wedding</span>
                      <span className="font-medium">25</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Maternity</span>
                      <span className="font-medium">45</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Pre-Wedding</span>
                      <span className="font-medium">38</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Portrait</span>
                      <span className="font-medium">52</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Events</span>
                      <span className="font-medium">30</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-700">
                      <span>Family</span>
                      <span className="font-medium">18</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Add-ons Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Add-ons & Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(() => {
                  const allAddons = [
                    {
                      id: 1,
                      name: "Extra Hours",
                      price: "₹500/hour",
                      description: "Extend your photography session with additional hours"
                    },
                    {
                      id: 2,
                      name: "Drone Photography",
                      price: "₹2,000",
                      description: "Aerial shots and cinematic drone footage"
                    },
                    {
                      id: 3,
                      name: "Photo Album",
                      price: "₹1,500",
                      description: "Premium printed photo album with 50 pages"
                    },
                    {
                      id: 4,
                      name: "Video Coverage",
                      price: "₹3,000",
                      description: "Professional video recording and editing"
                    },
                    {
                      id: 5,
                      name: "Same Day Delivery",
                      price: "₹800",
                      description: "Get your photos delivered on the same day"
                    },
                    {
                      id: 6,
                      name: "Makeup Artist",
                      price: "₹2,500",
                      description: "Professional makeup artist for the session"
                    }
                  ];

                  const displayedAddons = showAllAddons ? allAddons : allAddons.slice(0, 4);

                  return displayedAddons.map((addon) => (
                    <div key={addon.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="font-semibold text-gray-900">{addon.name}</h2>
                        <span className="text-blue-600 font-bold">{addon.price}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{addon.description}</p>
                    </div>
                  ));
                })()}
              </div>
              
              {!showAllAddons && (
                <div className="text-center mt-6">
                  <button
                    onClick={() => setShowAllAddons(true)}
                    className="bg-blue-50 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-100 transition-colors duration-200"
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-bold text-gray-900">Comments & Reviews</h2>
                <div className="flex items-center space-x-2">
                  <ChatBubbleLeftIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">{photographer.reviews} reviews</span>
                </div>
              </div>
              
              <div className="space-y-6 max-h-96 overflow-y-auto scrollbar-hide">
                {(() => {
                  const comments = photographer.comments || [];
                  
                  // If no comments but there are reviews, show sample comments for demonstration
                  if (comments.length === 0 && photographer.reviews > 0) {
                    const sampleComments = [
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
                        ]
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
                          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=300&fit=crop"
                        ]
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
                        images: [
                          "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&h=300&fit=crop"
                        ]
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
                          "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=300&fit=crop",
                          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=300&h=300&fit=crop",
                          "https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=300&fit=crop"
                        ]
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
                        ]
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
                        images: [
                          "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=300&h=300&fit=crop"
                        ]
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
                          "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=300&fit=crop",
                          "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=300&h=300&fit=crop"
                        ]
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
                        images: [
                          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=300&h=300&fit=crop"
                        ]
                      }
                    ];
                    // Show only first 7 reviews on detail page
                    return sampleComments.slice(0, 7);
                  }
                  
                  return comments;
                })().map((comment) => (
                  <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-start space-x-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={comment.user.avatar}
                          alt={comment.user.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-gray-900">{comment.user.name}</h4>
                            <div className="flex items-center space-x-1 mt-1">
                              {renderStars(comment.rating, 'w-4 h-4')}
                              <span className="text-sm text-gray-600 ml-1">{comment.rating}</span>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{comment.date}</span>
                        </div>
                        
                        <p className="text-gray-700 leading-relaxed mb-4">{comment.comment}</p>
                        
                        {comment.images.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {comment.images.map((image, index) => (
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
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {photographer.reviews === 0 && (
                <div className="text-center py-8">
                  <ChatBubbleLeftIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
                </div>
              )}

              {/* More Reviews Button */}
              {photographer.reviews > 0 && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      const params = new URLSearchParams();
                      params.append('name', photographer.name);
                      params.append('reviews', photographer.reviews.toString());
                      params.append('rating', photographer.rating.toString());
                      router.push(`/photographer/${photographer.id}/reviews?${params.toString()}`);
                    }}
                    className="w-full bg-white border-2 border-blue-600 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    <span>See All {photographer.reviews} Reviews</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Photographer Detail & Booking Card */}
          <div className="lg:col-span-1">
             <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-4 pt-3 sticky top-24 relative">
              {/* Trusted Badge at Top Left */}
              <div className="absolute top-1 left-2">
                <div className="bg-purple-500/90 backdrop-blur-sm text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-md">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-[8px] font-bold tracking-wide">TRUSTED</span>
                </div>
              </div>
              
               {/* Photographer Header */}
               <div className="text-center mb-4">
                 <div className="flex items-center justify-center gap-2 mb-2">
                   <h1 className="text-xl font-bold text-gray-900">{photographer.name}</h1>
                   <div className="relative group/verified">
                     <svg className="w-5 h-5 text-green-500 flex-shrink-0 cursor-help" fill="currentColor" viewBox="0 0 20 20">
                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                     </svg>
                     <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white text-gray-900 text-xs rounded-lg opacity-0 group-hover/verified:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50 shadow-lg border border-gray-200">
                       All details of this photographer are <span className="font-bold">verified</span>
                       <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                     </div>
                   </div>
                 </div>
                 <div className="mb-2">
                   <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold tracking-wider border ${tierInfo.colorClass} transition-all duration-200`}>
                     {tierInfo.label}
                   </span>
                 </div>
                 <p className="text-lg text-blue-600 font-medium mb-3">{photographer.specialty}</p>
                
                <div className="flex items-center justify-center space-x-1 mb-2">
                  {renderStars()}
                  <span className="text-gray-600 ml-2 text-sm">
                    {photographer.rating} ({photographer.reviews} reviews)
                  </span>
                </div>
                
                <div className="flex items-center justify-center text-gray-600 text-sm mb-3">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  <span>{photographer.location}</span>
                </div>
                
                {/* Availability with Calendar Icon */}
                <div className="flex items-center justify-center text-gray-600 text-sm mb-3">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span className="flex-1">{photographer.availability}</span>
                  <button
                    onClick={() => setShowAvailabilityCalendar(true)}
                    className="ml-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                    title="View Availability Calendar"
                  >
                    <CalendarDaysIcon className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{photographer.description}</p>
              </div>
              
              {/* Package Details in Sidebar (sticky) */}
              {packageParam && (() => {
                const packageDetailsMap: { [key: string]: { name: string; startingPrice: number; valueProposition: string } } = {
                  wedding: {
                    name: 'Wedding',
                    startingPrice: 150000,
                    valueProposition: 'Includes full-day coverage, 2 Photographers, 1 Drone Men, Premium album, Marriage Video'
                  },
                  'pre-wedding': {
                    name: 'Pre-Wedding',
                    startingPrice: 75000,
                    valueProposition: 'Includes full-day coverage, 2 Photographers, 1 Drone Men, Premium album, Cinematic Video'
                  },
                  maternity: {
                    name: 'Maternity',
                    startingPrice: 45000,
                    valueProposition: 'Includes maternity shoot, 1 Photographer, Professional editing, Premium prints, Digital gallery'
                  },
                  newborn: {
                    name: 'New Born',
                    startingPrice: 35000,
                    valueProposition: 'Includes newborn shoot, 1 Photographer, Safe props, Professional editing, Premium album'
                  },
                  productshoot: {
                    name: 'Product Shoot',
                    startingPrice: 25000,
                    valueProposition: 'Includes product photography, 1 Photographer, Studio setup, Professional editing, High-res images'
                  },
                  'real-estate': {
                    name: 'Real-Estate',
                    startingPrice: 40000,
                    valueProposition: 'Includes property photography, 1 Photographer, 1 Drone Men, Professional editing, Virtual tour'
                  },
                  headshots: {
                    name: 'Headshots',
                    startingPrice: 10000,
                    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
                  },
                  housewarming: {
                    name: 'House Warming',
                    startingPrice: 8000,
                    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
                  },
                  babynaamkaran: {
                    name: 'Baby Naam Karan',
                    startingPrice: 12000,
                    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
                  },
                  'pre-weddingshoot': {
                    name: 'Pre-Wedding Shoot',
                    startingPrice: 25000,
                    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
                  },
                  mehendi: {
                    name: 'Mehendi',
                    startingPrice: 10000,
                    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
                  },
                  corporateevents: {
                    name: 'Corporate Events',
                    startingPrice: 18000,
                    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
                  },
                  familyportraits: {
                    name: 'Family Portraits',
                    startingPrice: 12000,
                    valueProposition: 'From Experienced Photographer to Unmatched skill for high-end Photography'
                  }
                };
                const packageKey = packageParam.toLowerCase().replace(/\s+/g, '');
                const packageInfo = packageDetailsMap[packageKey];
                return packageInfo ? (
                  <div className="mb-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-300 rounded-lg p-3">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <TicketIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <h4 className="font-bold text-gray-900 text-sm">{packageInfo.name} Package</h4>
                          <span className="inline-flex items-center text-[10px] font-bold text-purple-700 bg-white border border-purple-300 px-1.5 py-0.5 rounded-md">
                            ALL-INCLUSIVE
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed mb-2">{packageInfo.valueProposition}</p>
                       
                      </div>
                    </div>
                  </div>
                ) : null;
              })()}

              {/* Pricing & Booking */}
              <div className="border-t border-gray-200 pt-4">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-3xl font-bold text-blue-600">{photographer.price}</span>
                    <span className="text-gray-500 text-sm ml-2">per hour</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-4">
                  <button 
                    onClick={handleBookNow}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-1.5 px-2 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center space-x-1.5"
                  >
                    <Image
                      src="/Logo_Icon.png"
                      alt="KliqShot Logo"
                      width={14}
                      height={14}
                      className="object-contain"
                    />
                    <span>Book Now</span>
                  </button>

                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 py-1.5 px-2 rounded-md text-xs transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center space-x-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>Add to Cart</span>
                  </button>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    🔒 Secure booking with instant confirmation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Best in Category Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <BestInCategory category={photographer.specialty} />
      </div>

      {/* Inspired by Browsing History Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <InspiredByHistory userHistory={[photographer.specialty, "Portrait Photography", "Event Photography"]} />
      </div>

      {/* Your Searches Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <YourSearches />
      </div>

      {/* Image Popup Modal */}
      {showImagePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 backdrop-blur-sm" onClick={() => setShowImagePopup(false)}>
          <button
            onClick={() => setShowImagePopup(false)}
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 transition-colors z-10"
          >
            <XMarkIcon className="w-8 h-8" />
          </button>
          
          <div className="relative max-w-6xl max-h-[90vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
            {/* Large Image */}
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={getCurrentPortfolioImages()[popupImageIndex]}
                alt="Portfolio image"
                width={1200}
                height={800}
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              />
              
              {/* Like/Dislike Icons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleImageReaction(getCurrentPortfolioImages()[popupImageIndex], 'like')}
                    className="w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                  >
                    {imageReactions[getCurrentPortfolioImages()[popupImageIndex]] === 'like' ? (
                      <HandThumbUpSolidIcon className="w-5 h-5 text-green-600" />
                    ) : (
                      <HandThumbUpIcon className="w-5 h-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleImageReaction(getCurrentPortfolioImages()[popupImageIndex], 'dislike')}
                    className="w-10 h-10 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg"
                  >
                    {imageReactions[getCurrentPortfolioImages()[popupImageIndex]] === 'dislike' ? (
                      <HandThumbDownSolidIcon className="w-5 h-5 text-red-600" />
                    ) : (
                      <HandThumbDownIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {/* Like/Dislike Count */}
                <div className="bg-white bg-opacity-95 rounded-full px-3 py-2 shadow-lg">
                  <div className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <span className="text-green-600">{imageLikeCounts[getCurrentPortfolioImages()[popupImageIndex]] || 200}</span>
                    <span>•</span>
                    <span className="text-red-600">{imageDislikeCounts[getCurrentPortfolioImages()[popupImageIndex]] || 12}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Arrows */}
            <button
              onClick={() => setPopupImageIndex(prev => prev > 0 ? prev - 1 : getCurrentPortfolioImages().length - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-100 bg-opacity-80 hover:bg-opacity-100 text-gray-700 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setPopupImageIndex(prev => prev < getCurrentPortfolioImages().length - 1 ? prev + 1 : 0)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-gray-100 bg-opacity-80 hover:bg-opacity-100 text-gray-700 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-100 bg-opacity-90 text-gray-700 px-4 py-2 rounded-full text-sm backdrop-blur-sm shadow-lg">
              {popupImageIndex + 1} / {getCurrentPortfolioImages().length}
            </div>
          </div>
        </div>
      )}

      {/* Category Selection Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Select a Category</h2>
              <button
                onClick={() => setShowCategoryModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 mb-6">Please select a category to continue with your booking:</p>
              
              {/* Two Column Layout: Categories on Left, Subcategories on Right */}
              <div className="grid grid-cols-2 gap-6 h-[500px]">
                {/* Left Side - Categories */}
                <div className="border-r border-gray-200 pr-6 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent" style={{ scrollbarWidth: 'thin' }}>
                  <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          if (selectedCategory === category.id) {
                            setSelectedCategory('');
                            setSelectedSubCategory('');
                          } else {
                            setSelectedCategory(category.id);
                            setSelectedSubCategory('');
                          }
                        }}
                        className={`w-full border rounded-lg p-3 text-left transition-all duration-200 ${
                          selectedCategory === category.id
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1 text-sm">{category.name}</h4>
                            <p className="text-xs text-gray-600 mb-1">{category.description}</p>
                            <p className="text-xs text-blue-600">{category.photographerCount} photographers</p>
                          </div>
                          {selectedCategory === category.id && (
                            <svg className="w-5 h-5 text-blue-500 flex-shrink-0 ml-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right Side - Subcategories */}
                <div className="overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent" style={{ scrollbarWidth: 'thin' }}>
                  {selectedCategory && (() => {
                    const selectedCat = categories.find(cat => cat.id === selectedCategory);
                    return selectedCat?.subCategories ? (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Subcategories</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {selectedCat.subCategories.map((subCat) => (
                            <button
                              key={subCat.id}
                              onClick={() => setSelectedSubCategory(subCat.id)}
                              className={`border rounded-lg p-3 text-left transition-all duration-200 ${
                                selectedSubCategory === subCat.id
                                  ? 'border-blue-500 bg-blue-100 shadow-sm'
                                  : 'border-gray-200 hover:border-blue-300 bg-white'
                              }`}
                            >
                              <div className="flex flex-col">
                                <div className="flex items-start justify-between mb-1">
                                  <h5 className="font-medium text-gray-900 text-sm">{subCat.name}</h5>
                                  {selectedSubCategory === subCat.id && (
                                    <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600 line-clamp-2">{subCat.description}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Select a category to view subcategories</p>
                      </div>
                    );
                  })()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCategorySelection}
                  disabled={!selectedCategory || !selectedSubCategory}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory && selectedSubCategory
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {categoryModalAction === 'cart' ? 'Continue to Add to Cart' : 'Continue to Booking'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Availability Calendar Modal */}
      {showAvailabilityCalendar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full">
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between rounded-t-lg">
              <h2 className="text-lg font-bold text-gray-900">Availability Calendar - {photographer.name}</h2>
              <button
                onClick={() => setShowAvailabilityCalendar(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              {/* Compact Calendar */}
              <BookingCalendar
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                selectedTimeSlots={selectedTimeSlots}
                onTimeSlotSelect={(timeSlot) => {
                  if (selectedTimeSlots.includes(timeSlot)) {
                    setSelectedTimeSlots(prev => prev.filter(slot => slot !== timeSlot));
                  } else {
                    setSelectedTimeSlots(prev => [...prev, timeSlot]);
                  }
                }}
                compact={true}
              />
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-end space-x-3">
                  <button
                    onClick={() => setShowAvailabilityCalendar(false)}
                    className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  {selectedDate && selectedTimeSlots.length > 0 && (
                    <button
                      onClick={() => {
                        setShowAvailabilityCalendar(false);
                        handleBookNow();
                      }}
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Book Selected Time
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
