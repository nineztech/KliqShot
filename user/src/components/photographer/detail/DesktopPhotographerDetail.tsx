'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon, StarIcon as StarSolidIcon, StarIcon as StarOutlineIcon, MapPinIcon, ClockIcon, CameraIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Navbar from '@/components/navbar';

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
  availability: string;
  languages: string[];
  equipment: string[];
  awards: string[];
}

interface DesktopPhotographerDetailProps {
  photographer: Photographer;
}

export default function DesktopPhotographerDetail({ photographer }: DesktopPhotographerDetailProps) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(photographer.rating);
    const hasHalfStar = photographer.rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <StarSolidIcon key={i} className="w-5 h-5 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-5 h-5">
            <StarOutlineIcon className="w-5 h-5 text-gray-300" />
            <div className="absolute inset-0 w-2.5 h-5 overflow-hidden">
              <StarSolidIcon className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarOutlineIcon key={i} className="w-5 h-5 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                {isFavorite ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span className="text-sm">Save</span>
              </button>
              
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <ShareIcon className="w-5 h-5" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photographer Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start space-x-6">
                <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={photographer.image}
                    alt={photographer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{photographer.name}</h1>
                  <p className="text-xl text-blue-600 font-medium mb-3">{photographer.specialty}</p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {renderStars()}
                      <span className="text-gray-600 ml-2">
                        {photographer.rating} ({photographer.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      <span>{photographer.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 leading-relaxed">{photographer.description}</p>
                </div>
              </div>
            </div>

            {/* Portfolio Gallery */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Portfolio</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {photographer.portfolio.map((image, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                      selectedImageIndex === index ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <Image
                      src={image}
                      alt={`Portfolio ${index + 1}`}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              
              {/* Featured Image */}
              <div className="aspect-video rounded-lg overflow-hidden">
                <Image
                  src={photographer.portfolio[selectedImageIndex]}
                  alt="Featured portfolio image"
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {photographer.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Experience</h3>
                  <p className="text-gray-600">{photographer.experience}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Availability</h3>
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
              
              {photographer.awards.length > 0 && (
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
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{photographer.price}</div>
                <div className="text-gray-500">per session</div>
              </div>
              
              <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 mb-4">
                Book Now
              </button>
              
              <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 mb-6">
                Send Message
              </button>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>Response time: Within 2 hours</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <CameraIcon className="w-4 h-4 mr-2" />
                  <span>Professional equipment included</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="w-4 h-4 mr-2" />
                  <span>Travels to your location</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
