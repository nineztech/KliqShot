'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, StarIcon as StarSolidIcon, StarIcon as StarOutlineIcon, MapPinIcon, ClockIcon, CameraIcon, HeartIcon, ShareIcon, ChatBubbleLeftIcon, XMarkIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import { categories, type Category, type SubCategory } from '@/data/categories';
import { BestInCategory, InspiredByHistory } from '@/components/photographer';
import YourSearches from '@/components/common/YourSearches';
import BookingCalendar from '@/components/booking/BookingCalendar';

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
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [popupImageIndex, setPopupImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeAboutTab, setActiveAboutTab] = useState('about');
  const [showAllTeamMembers, setShowAllTeamMembers] = useState(false);
  const [showAvailabilityCalendar, setShowAvailabilityCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);

  // Auto-scroll carousel
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setSelectedImageIndex(prev => prev < getCurrentPortfolioImages().length - 1 ? prev + 1 : 0);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [selectedImageIndex, activePortfolioCategory, isPaused]);

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
                       className={`relative w-24 h-20 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
                  <p className="text-gray-600">{photographer.experience}</p>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Availability</h3>
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
                    <h3 className="font-semibold text-gray-900 mb-4">Team Overview</h3>
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
            <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-5 sticky top-24 relative">
              {/* Trusted Badge at Top Left */}
              <div className="absolute top-2 left-2">
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
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 mb-4 shadow-sm hover:shadow-md flex items-center justify-center space-x-2"
                >
                  <Image
                    src="/Logo_Icon.png"
                    alt="KliqShot Logo"
                    width={16}
                    height={16}
                    className="object-contain"
                  />
                  <span>Book Now</span>
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

      {/* Best in Category Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BestInCategory category={photographer.specialty} />
      </div>

      {/* Inspired by Browsing History Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
    </div>
  );
}
