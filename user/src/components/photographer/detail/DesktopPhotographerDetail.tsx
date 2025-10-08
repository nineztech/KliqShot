'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, StarIcon as StarSolidIcon, StarIcon as StarOutlineIcon, MapPinIcon, ClockIcon, CameraIcon, HeartIcon, ShareIcon, ChatBubbleLeftIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import { categories, type Category, type SubCategory } from '@/data/categories';

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
}

export default function DesktopPhotographerDetail({ photographer, category, subcategory }: DesktopPhotographerDetailProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activePortfolioTab, setActivePortfolioTab] = useState('TOP PHOTOS');
  const [activePortfolioCategory, setActivePortfolioCategory] = useState('Mehndi');
  const [showAllAddons, setShowAllAddons] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                {isFavorite ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span className="text-sm">Save</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <ShareIcon className="w-5 h-5" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">

             {/* Portfolio Gallery */}
             <div className="bg-white rounded-lg shadow-sm p-6">
               {/* Main Photo Carousel */}
               <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg mb-6">
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
                     onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : getCurrentPortfolioImages().length - 1)}
                     className="w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                     </svg>
                   </button>
                   <button
                     onClick={() => setSelectedImageIndex(prev => prev < getCurrentPortfolioImages().length - 1 ? prev + 1 : 0)}
                     className="w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                   >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                   </button>
                 </div>
                 
                 {/* Carousel Indicators */}
                 <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                   {getCurrentPortfolioImages().map((_, index) => (
                     <button
                       key={index}
                       onClick={() => setSelectedImageIndex(index)}
                       className={`w-2 h-2 rounded-full transition-all duration-200 ${
                         selectedImageIndex === index ? 'bg-white' : 'bg-white bg-opacity-50'
                       }`}
                     />
                   ))}
                 </div>
               </div>
               
               {/* Horizontal Category Cards */}
               <div className="flex space-x-4 justify-center">
                 {(() => {
                   const categories = [
                     { id: 1, name: "Mehndi", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=150&h=150&fit=crop" },
                     { id: 2, name: "Engagement", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=150&h=150&fit=crop" },
                     { id: 3, name: "Wedding", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=150&h=150&fit=crop" }
                   ];

                   return categories.map((category) => (
                     <div 
                       key={category.id} 
                       className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                         activePortfolioCategory === category.name ? 'ring-2 ring-blue-500 scale-110' : 'hover:scale-105 hover:shadow-lg'
                       }`}
                       onClick={() => setActivePortfolioCategory(category.name)}
                     >
                       <Image
                         src={category.image}
                         alt={category.name}
                         width={80}
                         height={80}
                         className="w-full h-full object-cover"
                       />
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
             </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {photographer.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
                  <p className="text-gray-600">{photographer.experience}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Availability</h3>
                  <p className="text-gray-600">{photographer.availability}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {photographer.languages.map((language, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Equipment</h3>
                  <div className="flex flex-wrap gap-2">
                    {photographer.equipment.map((item, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {photographer.awards.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Awards & Recognition</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {photographer.awards.map((award, index) => (
                      <li key={index}>{award}</li>
                    ))}
                  </ul>
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
                        <h3 className="font-semibold text-gray-900">{addon.name}</h3>
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
              <div className="flex items-center justify-between mb-6">
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
                          "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=300&h=300&fit=crop"
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
                        images: []
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
                        images: []
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
                        images: []
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
                        ]
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
                        images: []
                      }
                    ];
                    return sampleComments;
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
            </div>
          </div>

          {/* Right Column - Photographer Detail & Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-5 sticky top-24">
              {/* Photographer Header */}
              <div className="text-center mb-4">
                <h1 className="text-xl font-bold text-gray-900 mb-2">{photographer.name}</h1>
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
                
                <p className="text-gray-700 text-sm leading-relaxed mb-4">{photographer.description}</p>
              </div>
              
              {/* Pricing & Booking */}
              <div className="border-t border-gray-200 pt-4">
                <div className="text-center mb-4">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-3xl font-bold text-blue-600">{photographer.price}</span>
                    <span className="text-gray-500 text-sm ml-2">per hour</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleBookNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 mb-4 shadow-sm hover:shadow-md"
                >
                  📸 Book Now
                </button>
                
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
              
              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setSelectedSubCategory('');
                    }}
                    className={`border rounded-lg p-4 text-left transition-all duration-200 ${
                      selectedCategory === cat.id
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                    <p className="text-sm text-gray-600">{cat.description}</p>
                    <p className="text-xs text-blue-600 mt-2">{cat.photographerCount} photographers</p>
                  </button>
                ))}
              </div>

              {/* Subcategories */}
              {selectedCategory && getSelectedCategoryData()?.subCategories && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Select a Subcategory (Required):</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {getSelectedCategoryData()?.subCategories.map((subCat) => (
                      <button
                        key={subCat.id}
                        onClick={() => setSelectedSubCategory(subCat.id)}
                        className={`border rounded-lg p-3 text-left transition-all duration-200 ${
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
                  Continue to Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
