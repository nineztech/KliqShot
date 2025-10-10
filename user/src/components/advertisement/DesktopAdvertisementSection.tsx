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
