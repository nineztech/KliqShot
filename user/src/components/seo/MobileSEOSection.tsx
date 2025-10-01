'use client';

import { 
  ShieldCheckIcon, 
  StarIcon, 
  UsersIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

export default function MobileSEOSection() {
  const features = [
    {
      icon: <ShieldCheckIcon className="w-5 h-5 text-green-600" />,
      title: "Verified Photographers",
      description: "All photographers are background checked and verified"
    },
    {
      icon: <StarIcon className="w-5 h-5 text-yellow-600" />,
      title: "5-Star Reviews",
      description: "Read genuine reviews from satisfied customers"
    },
    {
      icon: <UsersIcon className="w-5 h-5 text-blue-600" />,
      title: "10,000+ Happy Customers",
      description: "Join thousands of satisfied customers"
    },
    {
      icon: <ClockIcon className="w-5 h-5 text-purple-600" />,
      title: "24/7 Support",
      description: "Get help whenever you need it"
    }
  ];

  return (
    <div className="px-4">
      <div className="text-center">
        <h2 className="section-title section-title-mobile mb-2">KliqShot: Your Photography Search Destination</h2>
        <p className="section-description section-description-mobile">Find professional photographers for all your special moments</p>
      </div>
      
      {/* Popular Search Terms */}
      <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
        <h3 className="feature-title feature-title-mobile mb-3">Most Searched Photography Services</h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Wedding Photographer Near Me", "Portrait Photography", "Family Photo Shoot", "Corporate Event Photography", 
            "Engagement Photography", "Maternity Photography", "Newborn Photography", "Graduation Photography",
            "Pre Wedding Photography", "Post Wedding Photography", "Candid Photography", "Traditional Photography",
            "Outdoor Photography", "Studio Photography", "Event Photography", "Product Photography"
          ].map((term, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {term}
            </span>
          ))}
        </div>
      </div>

      {/* Photography Categories */}
      <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
        <h3 className="feature-title feature-title-mobile mb-3">Photography Categories</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">WEDDING:</h4>
            <p className="text-gray-600">Wedding Photography, Engagement Shoot, Pre Wedding, Post Wedding, Candid Wedding, Traditional Wedding, Destination Wedding</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">PORTRAIT:</h4>
            <p className="text-gray-600">Family Portraits, Individual Portraits, Corporate Headshots, Senior Portraits, Professional Headshots, Studio Portraits</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">EVENTS:</h4>
            <p className="text-gray-600">Corporate Events, Birthday Parties, Anniversary, Graduation, Conference Photography, Seminar Photography</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">CREATIVE:</h4>
            <p className="text-gray-600">Fashion Photography, Art Photography, Abstract Photography, Fine Art Photography, Conceptual Photography</p>
          </div>
        </div>
      </div>

      {/* KliqShot Services */}
      <div className="mt-4 bg-white rounded-lg p-4 shadow-sm">
        <h3 className="feature-title feature-title-mobile mb-3">KliqShot Services</h3>
        <div className="space-y-2 text-xs">
          <p className="text-gray-600"><strong>Professional Photography Booking:</strong> Book verified photographers instantly for weddings, portraits, events, and corporate photography.</p>
          <p className="text-gray-600"><strong>KliqShot Plus:</strong> Premium membership with exclusive access to top photographers, priority booking, and special discounts.</p>
          <p className="text-gray-600"><strong>Secure Payments:</strong> Safe and secure payment processing with multiple payment options including EMI plans.</p>
          <p className="text-gray-600"><strong>Quality Assurance:</strong> All photographers are verified, background checked, and rated by customers.</p>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4 mt-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full mr-3 mt-0.5">
              {feature.icon}
            </div>
            <div className="flex-1">
              <h3 className="feature-title feature-title-mobile mb-1">{feature.title}</h3>
              <p className="feature-description feature-description-mobile">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}