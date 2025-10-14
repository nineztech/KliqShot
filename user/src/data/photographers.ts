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
  subCategory?: string; // Optional subcategory field
  categories?: string[]; // Additional categories photographer works in
}

export const photographersData: Photographer[] = [
  // Wedding Photography - Haldi Subcategory
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Haldi Photography",
    location: "Mumbai, India",
    rating: 4.9,
    reviews: 156,
    price: "₹15,000",
    experience: "5+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Specialized in capturing beautiful haldi ceremony moments with vibrant colors and emotions.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "portrait", "family"]
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    specialty: "Haldi Photography",
    location: "Delhi, India",
    rating: 4.8,
    reviews: 203,
    price: "₹12,000",
    experience: "7+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Expert in traditional haldi ceremonies with stunning candid moments and cultural authenticity.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "events", "professional"]
  },
  {
    id: 21,
    name: "Arjun Singh",
    specialty: "Haldi Photography",
    location: "Bangalore, India",
    rating: 4.7,
    reviews: 89,
    price: "₹18,000",
    experience: "4+ years",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "Creative haldi photographer specializing in artistic compositions and vibrant color palettes.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "portrait", "sports", "creative"]
  },
  {
    id: 22,
    name: "Meera Patel",
    specialty: "Haldi Photography",
    location: "Chennai, India",
    rating: 4.9,
    reviews: 134,
    price: "₹16,500",
    experience: "6+ years",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    description: "Passionate about capturing the joy and laughter during haldi ceremonies with natural lighting.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "family", "events"]
  },
  {
    id: 23,
    name: "Vikram Reddy",
    specialty: "Haldi Photography",
    location: "Hyderabad, India",
    rating: 4.6,
    reviews: 67,
    price: "₹14,000",
    experience: "3+ years",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    description: "Modern approach to haldi photography with contemporary styling and candid moments.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "portrait", "professional"]
  },
  {
    id: 24,
    name: "Kavya Nair",
    specialty: "Haldi Photography",
    location: "Kolkata, India",
    rating: 4.8,
    reviews: 98,
    price: "₹17,000",
    experience: "5+ years",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    description: "Specialized in traditional Bengali haldi ceremonies with cultural authenticity and warmth.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "family", "cultural"]
  },
  {
    id: 25,
    name: "Rohit Agarwal",
    specialty: "Haldi Photography",
    location: "Pune, India",
    rating: 4.5,
    reviews: 76,
    price: "₹13,500",
    experience: "4+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Expert in capturing the playful and emotional moments of haldi ceremonies.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "events", "portrait"]
  },
  {
    id: 26,
    name: "Anita Desai",
    specialty: "Haldi Photography",
    location: "Mumbai, India",
    rating: 4.9,
    reviews: 187,
    price: "₹19,000",
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    description: "Award-winning haldi photographer with expertise in luxury wedding ceremonies.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "luxury", "professional", "events"]
  },
  {
    id: 27,
    name: "Suresh Iyer",
    specialty: "Haldi Photography",
    location: "Bangalore, India",
    rating: 4.7,
    reviews: 112,
    price: "₹15,500",
    experience: "5+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Creative storyteller capturing the essence of South Indian haldi traditions.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "cultural", "traditional"]
  },
  {
    id: 28,
    name: "Divya Sharma",
    specialty: "Haldi Photography",
    location: "Jaipur, India",
    rating: 4.6,
    reviews: 87,
    price: "₹13,000",
    experience: "3+ years",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    description: "Young and vibrant photographer specializing in modern haldi celebrations.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "modern", "creative"]
  },
  {
    id: 29,
    name: "Pradeep Kumar",
    specialty: "Haldi Photography",
    location: "Lucknow, India",
    rating: 4.8,
    reviews: 145,
    price: "₹16,000",
    experience: "6+ years",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
    description: "Traditional haldi photographer with expertise in North Indian ceremonies.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "traditional", "cultural"]
  },
  {
    id: 30,
    name: "Shilpa Nair",
    specialty: "Haldi Photography",
    location: "Kochi, India",
    rating: 4.9,
    reviews: 178,
    price: "₹18,500",
    experience: "7+ years",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
    description: "Award-winning photographer specializing in luxury haldi ceremonies.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "luxury", "premium"]
  },
  {
    id: 31,
    name: "Rajesh Verma",
    specialty: "Haldi Photography",
    location: "Chandigarh, India",
    rating: 4.5,
    reviews: 65,
    price: "₹12,500",
    experience: "2+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Emerging talent in haldi photography with fresh perspective and creative approach.",
    category: "wedding",
    subCategory: "haldi",
    categories: ["wedding", "creative", "emerging"]
  },

  // Wedding Photography - Mehendi Subcategory
  {
    id: 3,
    name: "Priya Sharma",
    specialty: "Mehendi Photography",
    location: "Bangalore, India",
    rating: 4.9,
    reviews: 189,
    price: "₹18,000",
    experience: "6+ years",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    description: "Passionate about capturing beautiful mehendi designs and intimate moments.",
    category: "wedding",
    subCategory: "mehendi",
    categories: ["wedding", "portrait", "artistic"]
  },
  {
    id: 13,
    name: "Kavya Reddy",
    specialty: "Mehendi Photography",
    location: "Hyderabad, India",
    rating: 4.7,
    reviews: 134,
    price: "₹14,000",
    experience: "4+ years",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    description: "Specialized in mehendi ceremony photography with focus on intricate designs and emotions.",
    category: "wedding",
    subCategory: "mehendi",
    categories: ["wedding", "cultural", "traditional"]
  },
  {
    id: 32,
    name: "Ravi Sharma",
    specialty: "Mehendi Photography",
    location: "Indore, India",
    rating: 4.6,
    reviews: 98,
    price: "₹13,500",
    experience: "3+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Creative mehendi photographer capturing the artistry and beauty of henna designs.",
    category: "wedding",
    subCategory: "mehendi",
    categories: ["wedding", "artistic", "creative"]
  },
  {
    id: 33,
    name: "Sunita Patel",
    specialty: "Mehendi Photography",
    location: "Surat, India",
    rating: 4.8,
    reviews: 167,
    price: "₹16,500",
    experience: "6+ years",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    description: "Expert in capturing detailed mehendi designs with artistic lighting and composition.",
    category: "wedding",
    subCategory: "mehendi",
    categories: ["wedding", "artistic", "professional"]
  },
  {
    id: 34,
    name: "Manoj Singh",
    specialty: "Mehendi Photography",
    location: "Bhopal, India",
    rating: 4.9,
    reviews: 189,
    price: "₹19,000",
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    description: "Award-winning mehendi photographer with expertise in traditional and modern designs.",
    category: "wedding",
    subCategory: "mehendi",
    categories: ["wedding", "traditional", "award-winning"]
  },

  // Wedding Photography - Reception Subcategory
  {
    id: 14,
    name: "Arjun Singh",
    specialty: "Reception Photography",
    location: "Pune, India",
    rating: 4.8,
    reviews: 167,
    price: "₹20,000",
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Expert in grand reception celebrations with professional lighting and composition.",
    category: "wedding",
    subCategory: "reception"
  },
  {
    id: 15,
    name: "Ritu Patel",
    specialty: "Reception Photography",
    location: "Ahmedabad, India",
    rating: 4.9,
    reviews: 145,
    price: "₹22,000",
    experience: "6+ years",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    description: "Passionate about capturing elegant reception moments with artistic flair.",
    category: "wedding",
    subCategory: "reception"
  },
  {
    id: 35,
    name: "Vikash Kumar",
    specialty: "Reception Photography",
    location: "Patna, India",
    rating: 4.7,
    reviews: 112,
    price: "₹18,000",
    experience: "5+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Professional reception photographer with expertise in grand celebrations.",
    category: "wedding",
    subCategory: "reception"
  },
  {
    id: 36,
    name: "Geeta Reddy",
    specialty: "Reception Photography",
    location: "Vijayawada, India",
    rating: 4.8,
    reviews: 156,
    price: "₹20,500",
    experience: "7+ years",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
    description: "Expert in luxury reception photography with stunning venue captures.",
    category: "wedding",
    subCategory: "reception"
  },
  {
    id: 37,
    name: "Amit Tiwari",
    specialty: "Reception Photography",
    location: "Kanpur, India",
    rating: 4.6,
    reviews: 89,
    price: "₹16,500",
    experience: "4+ years",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
    description: "Creative reception photographer specializing in candid moments and emotions.",
    category: "wedding",
    subCategory: "reception"
  },

  // Wedding Photography - Pre-Wedding Subcategory
  {
    id: 16,
    name: "Vikram Mehta",
    specialty: "Pre-Wedding Photography",
    location: "Jaipur, India",
    rating: 4.9,
    reviews: 178,
    price: "₹25,000",
    experience: "9+ years",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    description: "Creative pre-wedding photographer specializing in romantic and artistic sessions.",
    category: "wedding",
    subCategory: "pre-wedding"
  },
  {
    id: 17,
    name: "Anjali Joshi",
    specialty: "Pre-Wedding Photography",
    location: "Indore, India",
    rating: 4.7,
    reviews: 89,
    price: "₹18,000",
    experience: "4+ years",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
    description: "Artistic pre-wedding photographer with unique perspective on romantic storytelling.",
    category: "wedding",
    subCategory: "pre-wedding"
  },
  {
    id: 38,
    name: "Rohit Malhotra",
    specialty: "Pre-Wedding Photography",
    location: "Ludhiana, India",
    rating: 4.9,
    reviews: 167,
    price: "₹24,000",
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Premium pre-wedding photographer specializing in destination shoots and cinematic storytelling.",
    category: "wedding",
    subCategory: "pre-wedding"
  },
  {
    id: 39,
    name: "Kavita Singh",
    specialty: "Pre-Wedding Photography",
    location: "Nagpur, India",
    rating: 4.8,
    reviews: 134,
    price: "₹21,000",
    experience: "6+ years",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    description: "Creative pre-wedding photographer with expertise in outdoor and adventure shoots.",
    category: "wedding",
    subCategory: "pre-wedding"
  },
  {
    id: 40,
    name: "Suresh Agarwal",
    specialty: "Pre-Wedding Photography",
    location: "Varanasi, India",
    rating: 4.6,
    reviews: 98,
    price: "₹17,500",
    experience: "4+ years",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    description: "Traditional pre-wedding photographer capturing cultural essence and romantic moments.",
    category: "wedding",
    subCategory: "pre-wedding"
  },

  // Portrait Photography - Headshots Subcategory
  {
    id: 4,
    name: "Amit Patel",
    specialty: "Professional Headshots",
    location: "Chennai, India",
    rating: 4.7,
    reviews: 134,
    price: "₹10,000",
    experience: "4+ years",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
    description: "Professional headshot photographer with experience in business and corporate portraits.",
    category: "portrait",
    subCategory: "headshots",
    categories: ["portrait", "professional", "corporate"]
  },
  {
    id: 18,
    name: "Rohit Verma",
    specialty: "Professional Headshots",
    location: "Kolkata, India",
    rating: 4.8,
    reviews: 156,
    price: "₹12,000",
    experience: "6+ years",
    image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=300&h=300&fit=crop&crop=face",
    description: "Expert in professional headshots with modern studio techniques and lighting.",
    category: "portrait",
    subCategory: "headshots",
    categories: ["portrait", "professional", "studio"]
  },
  {
    id: 41,
    name: "Priya Nair",
    specialty: "Professional Headshots",
    location: "Trivandrum, India",
    rating: 4.7,
    reviews: 123,
    price: "₹11,000",
    experience: "5+ years",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    description: "Professional headshot photographer specializing in corporate and business portraits.",
    category: "portrait",
    subCategory: "headshots",
    categories: ["portrait", "professional", "corporate"]
  },
  {
    id: 42,
    name: "Rajesh Gupta",
    specialty: "Professional Headshots",
    location: "Allahabad, India",
    rating: 4.9,
    reviews: 189,
    price: "₹14,500",
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Award-winning headshot photographer with expertise in executive and celebrity portraits.",
    category: "portrait",
    subCategory: "headshots",
    categories: ["portrait", "professional", "executive"]
  },
  {
    id: 43,
    name: "Sunita Reddy",
    specialty: "Professional Headshots",
    location: "Tirupati, India",
    rating: 4.6,
    reviews: 87,
    price: "₹9,500",
    experience: "3+ years",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    description: "Modern headshot photographer with creative approach to professional portraits.",
    category: "portrait",
    subCategory: "headshots",
    categories: ["portrait", "professional", "modern"]
  },

  // Portrait Photography - Portfolio Subcategory
  {
    id: 5,
    name: "Deepika Singh",
    specialty: "Portfolio Photography",
    location: "Kolkata, India",
    rating: 4.8,
    reviews: 167,
    price: "₹8,000",
    experience: "3+ years",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
    description: "Creative portfolio photographer specializing in natural light and artistic compositions.",
    category: "portrait",
    subCategory: "portfolio"
  },
  {
    id: 19,
    name: "Suresh Kumar",
    specialty: "Portfolio Photography",
    location: "Kochi, India",
    rating: 4.9,
    reviews: 189,
    price: "₹14,000",
    experience: "7+ years",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    description: "Professional portfolio photographer with expertise in creative and artistic sessions.",
    category: "portrait",
    subCategory: "portfolio"
  },
  {
    id: 44,
    name: "Anita Das",
    specialty: "Portfolio Photography",
    location: "Bhubaneswar, India",
    rating: 4.8,
    reviews: 145,
    price: "₹12,500",
    experience: "6+ years",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
    description: "Creative portfolio photographer specializing in fashion and artistic portraits.",
    category: "portrait",
    subCategory: "portfolio"
  },
  {
    id: 45,
    name: "Manoj Pandey",
    specialty: "Portfolio Photography",
    location: "Raipur, India",
    rating: 4.7,
    reviews: 112,
    price: "₹11,000",
    experience: "4+ years",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
    description: "Modern portfolio photographer with expertise in lifestyle and commercial photography.",
    category: "portrait",
    subCategory: "portfolio"
  },
  {
    id: 46,
    name: "Rekha Sharma",
    specialty: "Portfolio Photography",
    location: "Jodhpur, India",
    rating: 4.9,
    reviews: 167,
    price: "₹15,500",
    experience: "8+ years",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
    description: "Award-winning portfolio photographer with expertise in editorial and fine art photography.",
    category: "portrait",
    subCategory: "portfolio"
  },

  // Portrait Photography - LinkedIn Profile Subcategory
  {
    id: 6,
    name: "Vikram Mehta",
    specialty: "LinkedIn Profile Photography",
    location: "Pune, India",
    rating: 4.6,
    reviews: 98,
    price: "₹12,000",
    experience: "5+ years",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
    description: "Professional LinkedIn profile photographer with modern editing techniques.",
    category: "portrait",
    subCategory: "linkedin"
  },

  // Corporate Events - Corporate Events Subcategory
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
    category: "events",
    subCategory: "corporate-events"
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
    category: "events",
    subCategory: "corporate-events"
  },

  // Family Photography - Family Portraits Subcategory
  {
    id: 11,
    name: "Suresh Kumar",
    specialty: "Family Portraits",
    location: "Kochi, India",
    rating: 4.8,
    reviews: 156,
    price: "₹14,000",
    experience: "7+ years",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&crop=face",
    description: "Family photographer specializing in capturing precious family moments and milestones.",
    category: "family",
    subCategory: "family-portraits",
    categories: ["family", "portrait", "events"]
  },
  {
    id: 12,
    name: "Meera Iyer",
    specialty: "Family Portraits",
    location: "Coimbatore, India",
    rating: 4.9,
    reviews: 134,
    price: "₹16,000",
    experience: "5+ years",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face",
    description: "Passionate about capturing beautiful family memories with natural and candid shots.",
    category: "family",
    subCategory: "family-portraits"
  }
];

// Pre-compute category and subcategory mappings for faster lookups
const categoryMap = new Map<string, Photographer[]>();
const subCategoryMap = new Map<string, Photographer[]>();

photographersData.forEach(photographer => {
  // Category mapping
  if (!categoryMap.has(photographer.category)) {
    categoryMap.set(photographer.category, []);
  }
  categoryMap.get(photographer.category)!.push(photographer);

  // Subcategory mapping
  if (photographer.subCategory) {
    const subCategoryKey = `${photographer.category}-${photographer.subCategory}`;
    if (!subCategoryMap.has(subCategoryKey)) {
      subCategoryMap.set(subCategoryKey, []);
    }
    subCategoryMap.get(subCategoryKey)!.push(photographer);
  }
});

export const getPhotographersByCategory = (category: string): Photographer[] => {
  return categoryMap.get(category) || [];
};

export const getPhotographersBySubCategory = (category: string, subCategory: string): Photographer[] => {
  const subCategoryKey = `${category}-${subCategory}`;
  return subCategoryMap.get(subCategoryKey) || [];
};

export const getCategories = (): string[] => {
  return Array.from(new Set(photographersData.map(photographer => photographer.category)));
};

export const getSubCategories = (category: string): string[] => {
  return Array.from(new Set(
    photographersData
      .filter(photographer => photographer.category === category && photographer.subCategory)
      .map(photographer => photographer.subCategory!)
  ));
};
