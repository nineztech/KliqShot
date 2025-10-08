'use client';

import { useState, useEffect } from 'react';
import { Camera, Award, Users, Heart, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function MobileAboutPage() {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '1000+', label: 'Projects', icon: Camera },
    { number: '15+', label: 'Years', icon: Clock },
    { number: '50+', label: 'Awards', icon: Award },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Art',
      description: 'Every frame tells a story, capturing perfect moments that last forever.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for perfection in every shot with highest quality.'
    },
    {
      icon: Users,
      title: 'Client First',
      description: 'Your vision is our priority. We bring your dreams to life.'
    },
    {
      icon: CheckCircle,
      title: 'Reliability',
      description: 'Professional and dependable. We exceed expectations every time.'
    },
  ];

  const services = [
    'Wedding Photography',
    'Portrait Sessions',
    'Commercial Shoots',
    'Event Coverage',
    'Product Photography',
    'Cinematography',
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative w-full min-h-[32rem] bg-gray-900 overflow-hidden rounded-b-3xl">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-48 h-48 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-4 py-12">
          <div className={`transform transition-all duration-1000 ease-out text-center ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <p className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-medium mb-3 tracking-widest uppercase text-xs">
              About Us
            </p>
            <h1 className="text-3xl font-serif font-bold mb-2 leading-tight text-white">
              Capturing Life's
            </h1>
            <h2 className="text-2xl font-serif font-light italic mb-6 bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Beautiful Moments
            </h2>
          </div>

          {/* Image */}
          <div className={`transform transition-all duration-1200 ease-out delay-200 mb-6 ${
            showText ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}>
            <div className="relative w-48 h-48 mx-auto">
              <div className="absolute -top-3 -left-3 w-full h-full border-3 border-orange-400 rounded-2xl"></div>
              <div className="relative bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl w-full h-full flex items-center justify-center overflow-hidden shadow-xl">
                <Image
                  src="/image-photo2.png"
                  alt="About Us"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>
          </div>

          <div className={`transform transition-all duration-1200 ease-out delay-300 text-center px-6 ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <p className="text-sm text-gray-200 mb-6 leading-relaxed">
              We are passionate storytellers who believe every moment deserves to be preserved in its most authentic and beautiful form.
            </p>
          </div>

          <div className={`transform transition-all duration-1000 ease-out delay-400 text-center ${
            showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <button className="group px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm inline-flex items-center gap-2">
              Book Your Session
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <div className="w-5 h-8 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-1.5 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 px-4 bg-gray-50">
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-700 delay-${index * 100} ${
                showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full mb-3 shadow-lg">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent mb-1">{stat.number}</h3>
              <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className="py-10 px-4">
        <div className="text-center mb-8">
          <p className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-medium mb-2 tracking-widest uppercase text-xs">Our Story</p>
          <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            The Journey Behind the Lens
          </h2>
        </div>

        <div className="space-y-4 text-sm">
          <p className="text-gray-700 leading-relaxed">
            What started as a passion project in 2010 has evolved into a full-fledged creative studio dedicated to capturing life's most precious moments.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Over the years, we've documented countless weddings, events, and personal milestones. Each project has refined our craft and deepened our appreciation for photography.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Today, we bring together technical expertise, artistic vision, and genuine care to create images that tell stories and preserve memories for generations.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-12 px-4 bg-gray-900 rounded-3xl mx-2">
        <div className="text-center mb-8">
          <p className="text-orange-400 font-medium mb-2 tracking-widest uppercase text-xs">Our Values</p>
          <h2 className="text-2xl font-serif font-bold text-white mb-4">
            What We Stand For
          </h2>
        </div>

        <div className="space-y-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-5 hover:bg-opacity-20 transition-all duration-300 border border-white border-opacity-20"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg shadow-lg">
                  <value.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-200 leading-relaxed">{value.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="py-12 px-4">
        <div className="text-center mb-8">
          <p className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-medium mb-2 tracking-widest uppercase text-xs">Services</p>
          <h2 className="text-2xl font-serif font-bold bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent mb-4">
            What We Offer
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:from-orange-400 hover:to-pink-500 transition-all duration-300 border-2 border-transparent hover:border-purple-900 group"
            >
              <CheckCircle className="w-6 h-6 text-orange-500 group-hover:text-white mb-2 transition-colors" />
              <h3 className="text-xs font-bold text-purple-900 group-hover:text-white transition-colors leading-tight">{service}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-12 px-4 bg-gray-900 rounded-3xl mx-2 mb-4">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold text-white mb-4">
            Ready to Create Magic Together?
          </h2>
          <p className="text-sm text-white text-opacity-90 mb-6 px-2">
            Let's capture your special moments and turn them into timeless memories.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl text-sm">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
}