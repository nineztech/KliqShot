'use client';

import { useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import PhotographerCard from '@/components/photographer/PhotographerCard';

interface Photographer {
  id: number;
  name: string;
  specialty: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
  location: string;
  experience: string;
  category: string;
  verified: boolean;
  categories: string[];
}

interface TopRatedPhotographersProps {
  className?: string;
}


const topRatedPhotographers: Photographer[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    specialty: 'Wedding Photography',
    image: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=300&fit=crop&crop=center&auto=format',
    price: '₹8,500',
    rating: 4.9,
    reviews: 247,
    location: 'Mumbai, MH',
    experience: '12 years',
    category: 'Wedding Photography',
    verified: true,
    categories: ['Wedding', 'Pre-Wedding', 'Reception']
  },
  {
    id: 2,
    name: 'Priya Sharma',
    specialty: 'Portrait Photography',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop&crop=center&auto=format',
    price: '₹6,200',
    rating: 4.8,
    reviews: 189,
    location: 'Delhi, DL',
    experience: '8 years',
    category: 'Portrait Photography',
    verified: true,
    categories: ['Portrait', 'Headshot', 'Fashion']
  },
  {
    id: 3,
    name: 'Amit Patel',
    specialty: 'Event Photography',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop&crop=center&auto=format',
    price: '₹7,800',
    rating: 4.9,
    reviews: 156,
    location: 'Ahmedabad, GJ',
    experience: '10 years',
    category: 'Event Photography',
    verified: true,
    categories: ['Event', 'Corporate', 'Birthday']
  },
  {
    id: 4,
    name: 'Sneha Reddy',
    specialty: 'Pre Wedding Photography',
    image: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=300&fit=crop&crop=center&auto=format',
    price: '₹9,200',
    rating: 4.7,
    reviews: 203,
    location: 'Hyderabad, TS',
    experience: '6 years',
    category: 'Pre Wedding Photography',
    verified: true,
    categories: ['Pre-Wedding', 'Engagement', 'Couple']
  },
  {
    id: 5,
    name: 'Vikram Singh',
    specialty: 'Commercial Photography',
    image: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?w=400&h=300&fit=crop&crop=center&auto=format',
    price: '₹11,500',
    rating: 4.8,
    reviews: 134,
    location: 'Bangalore, KA',
    experience: '15 years',
    category: 'Commercial Photography',
    verified: true,
    categories: ['Commercial', 'Product', 'Business']
  },
  {
    id: 6,
    name: 'Anita Joshi',
    specialty: 'Baby Photography',
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=300&fit=crop&crop=center&auto=format',
    price: '₹4,800',
    rating: 4.9,
    reviews: 178,
    location: 'Pune, MH',
    experience: '7 years',
    category: 'Baby Photography',
    verified: true,
    categories: ['Baby', 'Newborn', 'Family']
  }
];

export default function TopRatedPhotographers({ className = '' }: TopRatedPhotographersProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <div className={`bg-white rounded-lg shadow-sm p-6 relative ${className}`}>
      <div className="mb-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Top Rated Photographers</h2>
          <p className="text-gray-600 mt-1">Highest rated photographers with exceptional reviews</p>
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
          {topRatedPhotographers.map((photographer) => (
            <div key={photographer.id} className="flex-none w-[calc(25%-18px)]">
              <PhotographerCard
                id={photographer.id}
                name={photographer.name}
                specialty={photographer.specialty}
                location={photographer.location}
                rating={photographer.rating}
                reviews={photographer.reviews}
                price={photographer.price}
                experience={photographer.experience}
                image={photographer.image}
                category={photographer.category}
                categories={photographer.categories}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Tablet View - 2 cards per row */}
      <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
        {topRatedPhotographers.slice(0, 4).map((photographer) => (
          <PhotographerCard
            key={photographer.id}
            id={photographer.id}
            name={photographer.name}
            specialty={photographer.specialty}
            location={photographer.location}
            rating={photographer.rating}
            reviews={photographer.reviews}
            price={photographer.price}
            experience={photographer.experience}
            image={photographer.image}
            category={photographer.category}
          />
        ))}
      </div>

      {/* Mobile View - 1 card per row */}
      <div className="grid grid-cols-1 md:hidden gap-6">
        {topRatedPhotographers.slice(0, 3).map((photographer) => (
          <PhotographerCard
            key={photographer.id}
            id={photographer.id}
            name={photographer.name}
            specialty={photographer.specialty}
            location={photographer.location}
            rating={photographer.rating}
            reviews={photographer.reviews}
            price={photographer.price}
            experience={photographer.experience}
            image={photographer.image}
            category={photographer.category}
          />
        ))}
      </div>
    </div>
  );
}
