export interface Photographer {
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
  category: string;
}

export const photographersData: Photographer[] = [
  // Wedding Photography
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Wedding Photography",
    location: "Mumbai, India",
    rating: 4.9,
    reviews: 156,
    price: "₹15,000",
    experience: "5+ years",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    description: "Specialized in capturing beautiful wedding moments with a creative and artistic approach.",
    category: "Wedding"
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    specialty: "Wedding Photography",
    location: "Delhi, India",
    rating: 4.8,
    reviews: 203,
    price: "₹12,000",
    experience: "7+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Expert in traditional and modern wedding photography with stunning candid moments.",
    category: "Wedding"
  },
  {
    id: 3,
    name: "Priya Sharma",
    specialty: "Wedding Photography",
    location: "Bangalore, India",
    rating: 4.9,
    reviews: 189,
    price: "₹18,000",
    experience: "6+ years",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    description: "Passionate about capturing precious wedding moments with warmth and authenticity.",
    category: "Wedding"
  },

  // Portrait Photography
  {
    id: 4,
    name: "Amit Patel",
    specialty: "Portrait Photography",
    location: "Chennai, India",
    rating: 4.7,
    reviews: 134,
    price: "₹10,000",
    experience: "4+ years",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "Professional portrait photographer with experience in headshots and personal branding.",
    category: "Portrait"
  },
  {
    id: 5,
    name: "Deepika Singh",
    specialty: "Portrait Photography",
    location: "Kolkata, India",
    rating: 4.8,
    reviews: 167,
    price: "₹8,000",
    experience: "3+ years",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    description: "Creative portrait photographer specializing in natural light and studio photography.",
    category: "Portrait"
  },
  {
    id: 6,
    name: "Vikram Mehta",
    specialty: "Portrait Photography",
    location: "Pune, India",
    rating: 4.6,
    reviews: 98,
    price: "₹12,000",
    experience: "5+ years",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    description: "Professional headshot and portrait photographer with modern editing techniques.",
    category: "Portrait"
  },

  // Corporate Events
  {
    id: 7,
    name: "Arjun Reddy",
    specialty: "Corporate Events",
    location: "Hyderabad, India",
    rating: 4.7,
    reviews: 145,
    price: "₹20,000",
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face",
    description: "Professional corporate photographer with experience in business events and conferences.",
    category: "Corporate"
  },
  {
    id: 8,
    name: "Neha Gupta",
    specialty: "Corporate Events",
    location: "Ahmedabad, India",
    rating: 4.8,
    reviews: 112,
    price: "₹15,000",
    experience: "6+ years",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face",
    description: "Expert in corporate photography with focus on professional event documentation.",
    category: "Corporate"
  },

  // Creative Photography
  {
    id: 9,
    name: "Rohit Verma",
    specialty: "Creative Photography",
    location: "Jaipur, India",
    rating: 4.9,
    reviews: 178,
    price: "₹25,000",
    experience: "9+ years",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
    description: "Creative photographer specializing in artistic and conceptual photography projects.",
    category: "Creative"
  },
  {
    id: 10,
    name: "Anjali Joshi",
    specialty: "Creative Photography",
    location: "Indore, India",
    rating: 4.7,
    reviews: 89,
    price: "₹18,000",
    experience: "4+ years",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
    description: "Artistic photographer with unique perspective on creative and experimental photography.",
    category: "Creative"
  },

  // Family Photography
  {
    id: 11,
    name: "Suresh Kumar",
    specialty: "Family Photography",
    location: "Kochi, India",
    rating: 4.8,
    reviews: 156,
    price: "₹14,000",
    experience: "7+ years",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    description: "Family photographer specializing in capturing precious family moments and milestones.",
    category: "Family"
  },
  {
    id: 12,
    name: "Meera Iyer",
    specialty: "Family Photography",
    location: "Coimbatore, India",
    rating: 4.9,
    reviews: 134,
    price: "₹16,000",
    experience: "5+ years",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    description: "Passionate about capturing beautiful family memories with natural and candid shots.",
    category: "Family"
  }
];

// Pre-compute category mapping for faster lookups
const categoryMap = new Map<string, Photographer[]>();
photographersData.forEach(photographer => {
  if (!categoryMap.has(photographer.category)) {
    categoryMap.set(photographer.category, []);
  }
  categoryMap.get(photographer.category)!.push(photographer);
});

export const getPhotographersByCategory = (category: string): Photographer[] => {
  return categoryMap.get(category) || [];
};

export const getCategories = (): string[] => {
  return Array.from(new Set(photographersData.map(photographer => photographer.category)));
};
