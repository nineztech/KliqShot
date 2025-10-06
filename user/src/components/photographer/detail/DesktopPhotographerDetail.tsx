'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, StarIcon as StarSolidIcon, StarIcon as StarOutlineIcon, MapPinIcon, ClockIcon, CameraIcon, HeartIcon, ShareIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Navbar from '@/components/navbar';

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
    if (activePortfolioTab === 'TOP PHOTOS') {
      return photographer.portfolio || [];
    } else {
      // For ALL FUNCTIONS tab, show category-specific images
      const categories = photographer.portfolioCategories || [];
      const category = categories.find(cat => cat.name === activePortfolioCategory);
      
      // If category exists and has images, return them; otherwise return empty array
      if (category && category.images && category.images.length > 0) {
        return category.images;
      }
      
      // Fallback: if no specific category images, return main portfolio
      return photographer.portfolio || [];
    }
  };

  const handleBookNow = () => {
    // Create booking URL with category and subcategory information
    const bookingParams = new URLSearchParams();
    bookingParams.append('photographerId', photographer.id.toString());
    bookingParams.append('photographerName', photographer.name);
    bookingParams.append('price', photographer.price);
    
    if (category) {
      bookingParams.append('category', category);
    }
    
    if (subcategory) {
      bookingParams.append('subcategory', subcategory);
    }
    
    // Navigate to booking page with parameters
    router.push(`/booking?${bookingParams.toString()}`);
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photographer Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={photographer.image}
                    alt={photographer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{photographer.name}</h1>
                  <p className="text-xl text-blue-600 font-medium mb-3">{photographer.specialty}</p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {renderStars()}
                      <span className="text-gray-600 ml-2">
                        {photographer.rating} ({photographer.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span>{photographer.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{photographer.description}</p>
                </div>
              </div>
            </div>

            {/* Portfolio Gallery */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h2>
              
              {/* Portfolio Tabs */}
              <div className="mb-6">
                <div className="flex border-b border-gray-200 mb-4">
                  <button
                    onClick={() => setActivePortfolioTab('TOP PHOTOS')}
                    className={`px-4 py-2 font-medium text-sm transition-colors duration-200 relative ${
                      activePortfolioTab === 'TOP PHOTOS'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    TOP PHOTOS
                  </button>
                  <button
                    onClick={() => setActivePortfolioTab('ALL FUNCTIONS')}
                    className={`px-4 py-2 font-medium text-sm transition-colors duration-200 relative ${
                      activePortfolioTab === 'ALL FUNCTIONS'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    ALL FUNCTIONS
                  </button>
                </div>
                
                {activePortfolioTab === 'ALL FUNCTIONS' && (
                  <div className="flex space-x-6 mb-4">
                    {(photographer.portfolioCategories && photographer.portfolioCategories.length > 0 
                      ? photographer.portfolioCategories 
                      : [
                          { name: 'Mehndi', count: 38, images: [] },
                          { name: 'Engagement', count: 37, images: [] },
                          { name: 'Wedding', count: 24, images: [] },
                          { name: 'Haldi/Chooda', count: 0, images: [] }
                        ]
                    ).map((category) => (
                      <button
                        key={category.name}
                        onClick={() => setActivePortfolioCategory(category.name)}
                        className={`font-medium text-sm transition-colors duration-200 ${
                          activePortfolioCategory === category.name
                            ? 'text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {getCurrentPortfolioImages().map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                      selectedImageIndex === index ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                ))}
              </div>
              
              {/* Featured Image */}
              <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={getCurrentPortfolioImages()[selectedImageIndex]}
                  alt="Featured portfolio image"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
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

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg shadow-md border border-gray-100 p-4 sticky top-24">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center mb-1">
                  <span className="text-3xl font-bold text-blue-600">{photographer.price}</span>
                  <span className="text-gray-500 text-sm ml-2">per hour</span>
                </div>
                <div className="flex items-center justify-center mt-2">
                  {renderStars()}
                  <span className="text-gray-600 ml-2 text-xs">
                    {photographer.rating} ({photographer.reviews} reviews)
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-3 rounded-md font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 mb-2 shadow-sm hover:shadow-md text-sm"
              >
                📸 Book Now
              </button>
              
              <button className="w-full bg-white border border-gray-200 text-gray-700 py-2 px-3 rounded-md font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 mb-4 text-sm">
                💬 Send Message
              </button>
              
              <div className="bg-blue-50 rounded-md p-3 mb-4">
                <div className="flex items-center text-blue-700 font-medium mb-1">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span className="text-sm">Quick Response</span>
                </div>
                <p className="text-blue-600 text-xs">Usually responds within 2 hours</p>
              </div>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center text-gray-600 p-2 bg-gray-50 rounded-md">
                  <CameraIcon className="w-4 h-4 mr-2 text-blue-500" />
                  <span className="font-medium">Professional equipment included</span>
                </div>
                
                <div className="flex items-center text-gray-600 p-2 bg-gray-50 rounded-md">
                  <MapPinIcon className="w-4 h-4 mr-2 text-green-500" />
                  <span className="font-medium">Travels to your location</span>
                </div>
                
                <div className="flex items-center text-gray-600 p-2 bg-gray-50 rounded-md">
                  <HeartIcon className="w-4 h-4 mr-2 text-red-500" />
                  <span className="font-medium">Free consultation call</span>
                </div>
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
  );
}
