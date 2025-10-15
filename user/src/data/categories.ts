export interface SubCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  photographerCount: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  icon: string;
  photographerCount: number;
  subCategories: SubCategory[];
}

export const categories: Category[] = [
  {
    id: 'wedding',
    name: 'Wedding & Pre-Wedding',
    description: 'Capture your special day',
    imageUrl: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=600&h=400&fit=crop&crop=center&auto=format',
    icon: 'HeartIcon',
    photographerCount: 420,
    subCategories: [
      { id: 'haldi', name: 'Haldi', description: 'Traditional haldi ceremony', imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 45 },
      { id: 'wedding', name: 'Wedding', description: 'Sacred wedding ceremony', imageUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 95 },
      { id: 'mehendi', name: 'Mehendi', description: 'Beautiful mehendi designs', imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 38 },
      { id: 'sangeet', name: 'Sangeet/Party Event', description: 'Musical celebrations', imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 52 },
      { id: 'reception', name: 'Reception', description: 'Grand reception celebrations', imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 67 },
      { id: 'pre-wedding', name: 'Pre-Wedding Shoot', description: 'Romantic pre-wedding sessions', imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 89 },
      { id: 'court-marriage', name: 'Court Marriage', description: 'Simple court ceremonies', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 23 }
    ]
  },
  {
    id: 'portrait',
    name: 'Portrait & Portfolio',
    description: 'Professional headshots & portraits',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=600&h=400&fit=crop&crop=center&auto=format',
    icon: 'CameraIcon',
    photographerCount: 380,
    subCategories: [
      { id: 'headshots', name: 'Headshots & Professional', description: 'Business and professional portraits', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 78 },
      { id: 'portfolio', name: 'Portfolio Shoot', description: 'Creative portfolio sessions', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 65 },
      { id: 'linkedin', name: 'LinkedIn Profile', description: 'Professional social media photos', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 42 },
      { id: 'branding', name: 'Professional Branding', description: 'Personal brand photography', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 56 }
    ]
  },
  {
    id: 'family',
    name: 'Family & Lifestyle',
    description: 'Beautiful family moments',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&h=400&fit=crop&crop=center&auto=format',
    icon: 'UserGroupIcon',
    photographerCount: 350,
    subCategories: [
      { id: 'family-portraits', name: 'Family Portraits', description: 'Beautiful family moments', imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 89 },
      { id: 'family-reunions', name: 'Family Reunions', description: 'Special family gatherings', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 45 },
      { id: 'lifestyle', name: 'Lifestyle Photography', description: 'Authentic lifestyle captures', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 67 },
      { id: 'staycation', name: 'Family Staycation', description: 'Family vacation photography', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 34 }
    ]
  },
  {
    id: 'events',
    name: 'Events & Celebrations',
    description: 'Corporate & social events',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop&crop=center&auto=format',
    icon: 'BriefcaseIcon',
    photographerCount: 290,
    subCategories: [
      { id: 'corporate-events', name: 'Corporate Events', description: 'Business and corporate gatherings', imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 78 },
      { id: 'birthday', name: 'Birthday Parties', description: 'Special birthday celebrations', imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 56 },
      { id: 'house-warming', name: 'House Warming', description: 'New home celebrations', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 34 },
      { id: 'festivals', name: 'Festival & Cultural', description: 'Cultural and religious celebrations', imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 67 }
    ]
  },
  {
    id: 'maternity',
    name: 'Maternity & New Family',
    description: 'Beautiful maternity moments',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop&crop=center&auto=format',
    icon: 'SparklesIcon',
    photographerCount: 180,
    subCategories: [
      { id: 'maternity-shoot', name: 'Maternity Shoot', description: 'Beautiful pregnancy moments', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 45 },
      { id: 'newborn', name: 'Newborn Photography', description: 'Precious newborn moments', imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 67 },
      { id: 'baby-shower', name: 'Baby Shower', description: 'Celebrating new life', imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 34 },
      { id: 'welcome-home', name: 'Welcome Home Baby', description: 'First days at home', imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 23 }
    ]
  },
  {
    id: 'product',
    name: 'Product & E-commerce',
    description: 'Professional product shoots',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center&auto=format',
    icon: 'ShoppingBagIcon',
    photographerCount: 240,
    subCategories: [
      { id: 'product-catalog', name: 'Product Catalog', description: 'Professional product photography', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 56 },
      { id: 'white-background', name: 'White Background', description: 'Clean product shots', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 45 },
      { id: 'lifestyle-product', name: 'Lifestyle Product', description: 'Products in real settings', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 67 },
      { id: 'ecommerce', name: 'E-commerce Photography', description: 'Online store photography', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 78 }
    ]
  },
  {
    id: 'interior',
    name: 'Interior & Real Estate',
    description: 'Property photography',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop&crop=center&auto=format',
    icon: 'HomeIcon',
    photographerCount: 160,
    subCategories: [
      { id: 'residential', name: 'Residential Property', description: 'Home and apartment photography', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 45 },
      { id: 'commercial', name: 'Commercial Property', description: 'Office and commercial spaces', imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 34 },
      { id: 'hotel-resort', name: 'Hotel & Resort', description: 'Hospitality photography', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 23 },
      { id: 'restaurant', name: 'Restaurant Photography', description: 'Food and dining spaces', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 28 }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion & Beauty',
    description: 'Fashion and beauty shoots',
    imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=400&fit=crop&crop=center&auto=format',
    icon: 'SparklesIcon',
    photographerCount: 200,
    subCategories: [
      { id: 'model-portfolio', name: 'Model Portfolio', description: 'Professional model photography', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 67 },
      { id: 'fashion-lookbook', name: 'Fashion Lookbook', description: 'Fashion editorial shoots', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 45 },
      { id: 'brand-campaign', name: 'Brand Campaign', description: 'Fashion brand photography', imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 56 },
      { id: 'beauty-shoot', name: 'Beauty Photography', description: 'Beauty and cosmetics shoots', imageUrl: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 34 }
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    description: 'Sports and fitness photography',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center&auto=format',
    icon: 'TrophyIcon',
    photographerCount: 120,
    subCategories: [
      { id: 'cricket', name: 'Cricket', description: 'Cricket match photography', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 34 },
      { id: 'football', name: 'Football', description: 'Football match photography', imageUrl: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 28 },
      { id: 'fitness', name: 'Fitness Photography', description: 'Fitness and workout sessions', imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 23 },
      { id: 'swimming', name: 'Swimming', description: 'Swimming and water sports', imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 19 }
    ]
  },
  {
    id: 'cinematography',
    name: 'Cinematography & Video',
    description: 'Video and cinematography',
    imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop&crop=center&auto=format',
    icon: 'VideoCameraIcon',
    photographerCount: 150,
    subCategories: [
      { id: 'cinematographer', name: 'Cinematographer', description: 'Professional video production', imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 45 },
      { id: 'documentary', name: 'Documentary Filmmaking', description: 'Documentary video production', imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 23 },
      { id: 'journey-video', name: 'Shoot Your Journey', description: 'Personal journey documentation', imageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 34 },
      { id: 'social-media', name: 'Social Media Content', description: 'Social media video content', imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=300&h=200&fit=crop&crop=center&auto=format', photographerCount: 28 }
    ]
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const getSubCategoryById = (categoryId: string, subCategoryId: string): SubCategory | undefined => {
  const category = getCategoryById(categoryId);
  return category?.subCategories.find(sub => sub.id === subCategoryId);
};
