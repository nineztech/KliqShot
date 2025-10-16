'use client';

import { useRef } from 'react';
import PhotographerCard from '../photographer/PhotographerCard';

export default function DesktopAdvertisementSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const photographers = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Mumbai, India",
      rating: 4.9,
      reviews: 156,
      price: "₹15,000",
      specialty: "Wedding Photography",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=300&fit=crop&crop=center&auto=format",
      experience: "5+ years",
      description: "Specialized in capturing beautiful wedding moments with a creative and artistic approach.",
      category: "Wedding",
      categories: ["Wedding", "Portrait", "Event"]
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi, India",
      rating: 4.8,
      reviews: 203,
      price: "₹12,000",
      specialty: "Portrait Photography",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&crop=center&auto=format",
      experience: "7+ years",
      description: "Expert in professional portraits and headshots with stunning lighting techniques.",
      category: "Portrait",
      categories: ["Portrait", "Corporate", "Headshot"]
    },
    {
      id: 3,
      name: "Priya Sharma",
      location: "Bangalore, India",
      rating: 4.9,
      reviews: 189,
      price: "₹18,000",
      specialty: "Family Photography",
      image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop&crop=center&auto=format",
      experience: "6+ years",
      description: "Passionate about capturing precious family moments with warmth and authenticity.",
      category: "Family",
      categories: ["Family", "Portrait", "Lifestyle"]
    },
    {
      id: 4,
      name: "Amit Patel",
      location: "Chennai, India",
      rating: 4.7,
      reviews: 134,
      price: "₹10,000",
      specialty: "Corporate Events",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop&crop=center&auto=format",
      experience: "4+ years",
      description: "Professional corporate photographer with experience in business events and conferences.",
      category: "Corporate",
      categories: ["Corporate", "Event", "Business"]
    },
    {
      id: 5,
      name: "Neha Gupta",
      location: "Pune, India",
      rating: 4.9,
      reviews: 178,
      price: "₹16,000",
      specialty: "Fashion Photography",
      image: "https://images.unsplash.com/photo-1492681290082-e932832941e6?w=400&h=300&fit=crop&crop=center&auto=format",
      experience: "8+ years",
      description: "Fashion and lifestyle photographer with an eye for detail and creative compositions.",
      category: "Fashion",
      categories: ["Fashion", "Portrait", "Lifestyle"]
    },
    {
      id: 6,
      name: "Vikram Singh",
      location: "Jaipur, India",
      rating: 4.8,
      reviews: 145,
      price: "₹14,000",
      specialty: "Event Photography",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center&auto=format",
      experience: "6+ years",
      description: "Capturing memorable moments at events, parties, and celebrations with creative flair.",
      category: "Event",
      categories: ["Event", "Wedding", "Corporate"]
    },
    {
      id: 7,
      name: "Ananya Reddy",
      location: "Hyderabad, India",
      rating: 4.9,
      reviews: 192,
      price: "₹17,000",
      specialty: "Product Photography",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop&crop=center&auto=format",
      experience: "5+ years",
      description: "Specialized in high-quality product photography for e-commerce and advertising.",
      category: "Product",
      categories: ["Product", "Commercial", "Advertising"]
    },
    {
      id: 8,
      name: "Karan Mehta",
      location: "Kolkata, India",
      rating: 4.7,
      reviews: 167,
      price: "₹13,000",
      specialty: "Nature Photography",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop&crop=center&auto=format",
      experience: "9+ years",
      description: "Award-winning nature and wildlife photographer with stunning landscape portfolios.",
      category: "Nature",
      categories: ["Nature", "Wildlife", "Landscape"]
    },
    {
      id: 9,
      name: "Shreya Iyer",
      location: "Ahmedabad, India",
      rating: 4.8,
      reviews: 141,
      price: "₹11,000",
      specialty: "Baby Photography",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop&crop=center&auto=format",
      experience: "4+ years",
      description: "Gentle and patient photographer specializing in newborn and baby photography.",
      category: "Baby",
      categories: ["Baby", "Family", "Portrait"]
    },
    {
      id: 10,
      name: "Arjun Nair",
      location: "Kochi, India",
      rating: 4.9,
      reviews: 215,
      price: "₹19,000",
      specialty: "Architectural Photography",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop&crop=center&auto=format",
      experience: "10+ years",
      description: "Expert in architectural and interior photography for real estate and design firms.",
      category: "Architecture",
      categories: ["Architecture", "Interior", "Real Estate"]
    },
    {
      id: 11,
      name: "Kavya Desai",
      location: "Surat, India",
      rating: 4.8,
      reviews: 158,
      price: "₹15,500",
      specialty: "Food Photography",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop&crop=center&auto=format",
      experience: "5+ years",
      description: "Creative food photographer making dishes look absolutely delicious and appealing.",
      category: "Food",
      categories: ["Food", "Product", "Commercial"]
    },
    {
      id: 12,
      name: "Rohan Malhotra",
      location: "Chandigarh, India",
      rating: 4.7,
      reviews: 124,
      price: "₹12,500",
      specialty: "Sports Photography",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop&crop=center&auto=format",
      experience: "7+ years",
      description: "Dynamic sports photographer capturing action-packed moments with precision.",
      category: "Sports",
      categories: ["Sports", "Event", "Action"]
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
    <div className="px-4">
      <div className="text-center">
        <h2 className="section-title section-title-desktop mb-1">Featured Photographers</h2>
        <p className="section-description section-description-desktop max-w-lg mx-auto">
          Discover top-rated professional photographers in your area
        </p>
      </div>

      <div className="mt-6 relative">
        {/* Navigation Buttons */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 z-10 group"
          aria-label="Previous slide"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 text-gray-800 rounded-full p-3 shadow-lg transition-all duration-200 z-10 group"
          aria-label="Next slide"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Carousel Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {photographers.map((photographer) => (
            <div key={photographer.id} className="flex-none w-[calc(25%-12px)]">
              <PhotographerCard
                {...photographer}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
