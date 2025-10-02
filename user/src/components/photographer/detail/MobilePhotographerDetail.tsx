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

interface MobilePhotographerDetailProps {
  photographer: Photographer;
}

export default function MobilePhotographerDetail({ photographer }: MobilePhotographerDetailProps) {
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
          <StarSolidIcon key={i} className="w-4 h-4 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-4 h-4">
            <StarOutlineIcon className="w-4 h-4 text-gray-300" />
            <div className="absolute inset-0 w-2 h-4 overflow-hidden">
              <StarSolidIcon className="w-4 h-4 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarOutlineIcon key={i} className="w-4 h-4 text-gray-300" />
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
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-1" />
              <span className="text-sm">Back</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-1 text-gray-600 hover:text-red-500 transition-colors duration-200"
              >
                {isFavorite ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
              </button>
              
              <button className="p-1 text-gray-600 hover:text-gray-900 transition-colors duration-200">
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Photographer Header */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-start space-x-4">
            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={photographer.image}
                alt={photographer.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 mb-1">{photographer.name}</h1>
              <p className="text-blue-600 font-medium mb-2">{photographer.specialty}</p>
              
              <div className="flex items-center space-x-1 mb-2">
                {renderStars()}
                <span className="text-gray-600 text-sm ml-1">
                  {photographer.rating} ({photographer.reviews})
                </span>
              </div>
              
              <div className="flex items-center text-gray-600 text-sm">
                <MapPinIcon className="w-4 h-4 mr-1" />
                <span>{photographer.location}</span>
              </div>
            </div>
          </div>
          
          <p className="text-gray-700 text-sm leading-relaxed mt-3">{photographer.description}</p>
        </div>

        {/* Portfolio Gallery */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Portfolio</h2>
          
          <div className="grid grid-cols-3 gap-2 mb-4">
            {photographer.portfolio.map((image, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
                  selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <Image
                  src={image}
                  alt={`Portfolio ${index + 1}`}
                  width={200}
                  height={200}
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
              width={400}
              height={225}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-4">About {photographer.name}</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Experience</h3>
              <p className="text-gray-600 text-sm">{photographer.experience}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Availability</h3>
              <p className="text-gray-600 text-sm">{photographer.availability}</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {photographer.languages.map((language, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    {language}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Equipment</h3>
              <div className="flex flex-wrap gap-2">
                {photographer.equipment.map((item, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {photographer.awards.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-gray-900 mb-2">Awards & Recognition</h3>
              <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                {photographer.awards.map((award, index) => (
                  <li key={index}>{award}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Booking Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 sticky bottom-4">
          <div className="text-center mb-4">
            <div className="text-2xl font-bold text-blue-600 mb-1">{photographer.price}</div>
            <div className="text-gray-500 text-sm">per session</div>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 mb-3">
            Book Now
          </button>
          
          <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 mb-4">
            Send Message
          </button>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center text-gray-600">
              <ClockIcon className="w-3 h-3 mr-2" />
              <span>Response time: Within 2 hours</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <CameraIcon className="w-3 h-3 mr-2" />
              <span>Professional equipment included</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPinIcon className="w-3 h-3 mr-2" />
              <span>Travels to your location</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
