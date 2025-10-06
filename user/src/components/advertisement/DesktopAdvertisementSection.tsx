'use client';

import PhotographerCard from '../photographer/PhotographerCard';

export default function DesktopAdvertisementSection() {
  const photographers = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "Mumbai, India",
      rating: 4.9,
      reviews: 156,
      price: "₹15,000",
      specialty: "Wedding Photography",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
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
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
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
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
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
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      experience: "4+ years",
      description: "Professional corporate photographer with experience in business events and conferences.",
      category: "Corporate",
      categories: ["Corporate", "Event", "Business"]
    }
  ];

  return (
    <div className="px-4">
      <div className="text-center">
        <h2 className="section-title section-title-desktop mb-1">Featured Photographers</h2>
        <p className="section-description section-description-desktop max-w-lg mx-auto">
          Discover top-rated professional photographers in your area
        </p>
      </div>

      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
          {photographers.map((photographer) => (
            <PhotographerCard
              key={photographer.id}
              {...photographer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
