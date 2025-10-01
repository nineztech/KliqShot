'use client';

import { 
  ShieldCheckIcon, 
  StarIcon, 
  UsersIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

export default function DesktopSEOSection() {
  const features = [
    {
      icon: <ShieldCheckIcon className="w-8 h-8 text-green-600" />,
      title: "Verified Photographers",
      description: "All photographers are background checked and verified for your safety"
    },
    {
      icon: <StarIcon className="w-8 h-8 text-yellow-500" />,
      title: "5-Star Reviews",
      description: "Read genuine reviews from thousands of satisfied customers"
    },
    {
      icon: <UsersIcon className="w-8 h-8 text-blue-600" />,
      title: "10,000+ Happy Customers",
      description: "Join thousands of satisfied customers who trust our platform"
    },
    {
      icon: <ClockIcon className="w-8 h-8 text-purple-600" />,
      title: "24/7 Support",
      description: "Get help whenever you need it with our round-the-clock support"
    }
  ];

  return (
    <div className="px-4">
      <div className="text-center">
        <h2 className="section-title section-title-desktop mb-4">KliqShot: The One-Stop Photography Booking Destination</h2>
        <p className="section-description section-description-desktop max-w-3xl mx-auto">
          Your ultimate platform to find and book professional photographers for weddings, portraits, events, and corporate photography. 
          From traditional wedding photography to modern candid shots, studio portraits to outdoor sessions, 
          KliqShot connects you with verified photographers across India.
        </p>
      </div>

      {/* Popular Search Terms */}
      <div className="mt-8 bg-white rounded-lg p-6 shadow-sm">
        <h3 className="feature-title feature-title-desktop mb-4">MOST SEARCHED FOR ON KLIQSHOT</h3>
        <div className="flex flex-wrap gap-3">
          {[
            "Wedding Photographer Near Me", "Portrait Photography", "Family Photo Shoot", "Corporate Event Photography", 
            "Engagement Photography", "Maternity Photography", "Newborn Photography", "Graduation Photography",
            "Pre Wedding Photography", "Post Wedding Photography", "Candid Photography", "Traditional Photography",
            "Outdoor Photography", "Studio Photography", "Event Photography", "Product Photography", "Fashion Photography",
            "Art Photography", "Fine Art Photography", "Conceptual Photography", "Abstract Photography",
            "Senior Portraits", "Corporate Headshots", "Professional Headshots", "Studio Portraits",
            "Birthday Party Photography", "Anniversary Photography", "Conference Photography", "Seminar Photography",
            "Destination Wedding", "Candid Wedding", "Traditional Wedding", "Modern Wedding Photography"
          ].map((term, index) => (
            <span key={index} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200">
              {term}
            </span>
          ))}
        </div>
      </div>

      {/* Photography Categories */}
      <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
        <h3 className="feature-title feature-title-desktop mb-4">PHOTOGRAPHY CATEGORIES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-2 text-base">WEDDING:</h4>
            <p className="text-gray-600 text-sm leading-relaxed">Wedding Photography, Engagement Shoot, Pre Wedding Photography, Post Wedding Photography, Candid Wedding Photography, Traditional Wedding Photography, Destination Wedding Photography, Bridal Photography, Groom Photography, Wedding Videography</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 text-base">PORTRAIT:</h4>
            <p className="text-gray-600 text-sm leading-relaxed">Family Portraits, Individual Portraits, Corporate Headshots, Senior Portraits, Professional Headshots, Studio Portraits, Outdoor Portraits, Lifestyle Portraits, Business Portraits, Executive Portraits</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 text-base">EVENTS:</h4>
            <p className="text-gray-600 text-sm leading-relaxed">Corporate Events, Birthday Parties, Anniversary Photography, Graduation Photography, Conference Photography, Seminar Photography, Workshop Photography, Award Ceremonies, Product Launches, Corporate Meetings</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2 text-base">CREATIVE:</h4>
            <p className="text-gray-600 text-sm leading-relaxed">Fashion Photography, Art Photography, Abstract Photography, Fine Art Photography, Conceptual Photography, Experimental Photography, Street Photography, Landscape Photography, Nature Photography, Wildlife Photography</p>
          </div>
        </div>
      </div>

      {/* Best Selling Services */}
      <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
        <h3 className="feature-title feature-title-desktop mb-4">BEST SELLING ON KLIQSHOT</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-900 text-sm mb-1">Wedding Photography</h5>
              <p className="text-xs text-gray-600">Complete wedding coverage</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-green-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-900 text-sm mb-1">Family Portraits</h5>
              <p className="text-xs text-gray-600">Memorable family moments</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-900 text-sm mb-1">Corporate Events</h5>
              <p className="text-xs text-gray-600">Professional event coverage</p>
            </div>
          </div>
          <div className="text-center">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h5 className="font-semibold text-gray-900 text-sm mb-1">Engagement Shoot</h5>
              <p className="text-xs text-gray-600">Romantic couple sessions</p>
            </div>
          </div>
        </div>
      </div>

      {/* KliqShot Services */}
      <div className="mt-6 bg-white rounded-lg p-6 shadow-sm">
        <h3 className="feature-title feature-title-desktop mb-4">KliqShot Services</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Professional Photography Booking Platform</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Book verified photographers instantly for weddings, portraits, events, and corporate photography. 
              From traditional ceremonies to modern celebrations, our platform connects you with skilled professionals 
              who capture your special moments with creativity and expertise.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">KliqShot Plus</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Premium membership with exclusive access to top-rated photographers, priority booking during peak seasons, 
              special discounts on photography packages, and early access to new photographer listings. 
              Plus members get 24/7 customer support and personalized recommendations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Secure Payments & No Cost EMI</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              Safe and secure payment processing with multiple payment options including credit cards, debit cards, 
              UPI, net banking, and No Cost EMI plans. Make high-end photography services accessible with 
              flexible payment options without burning a hole in your pocket.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Quality Assurance & Customer Support</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              All photographers are verified, background checked, and rated by customers. Our quality assurance team 
              ensures every photographer meets our standards. Get help whenever you need it with our 24/7 customer support, 
              live chat, and comprehensive FAQ section.
            </p>
          </div>
        </div>
      </div>
      
      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <div key={index} className="text-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="feature-title feature-title-desktop mb-2">{feature.title}</h3>
              <p className="feature-description feature-description-desktop">{feature.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
}