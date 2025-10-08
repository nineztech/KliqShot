'use client';

import { useState, useEffect } from 'react';
import { Camera, Award, Users, Heart, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
export default function AboutPage() {
  const [showText, setShowText] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const section = Math.floor(scrollPosition / 400);
      setActiveSection(section);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '1000+', label: 'Projects Completed', icon: Camera },
    { number: '15+', label: 'Years Experience', icon: Clock },
    { number: '50+', label: 'Awards Won', icon: Award },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Passion for Art',
      description: 'Every frame tells a story, and we pour our heart into capturing those perfect moments that last forever.'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We strive for perfection in every shot, ensuring the highest quality in both creativity and technical execution.'
    },
    {
      icon: Users,
      title: 'Client First',
      description: 'Your vision is our priority. We work closely with you to bring your dreams to life through our lens.'
    },
    {
      icon: CheckCircle,
      title: 'Reliability',
      description: 'Professional, punctual, and dependable. We deliver on our promises and exceed expectations every time.'
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
    <div className="min-h-screen bg-white rounded-b-3xl">
      <div>
        {/* Hero Section */}
        <div className="relative w-full h-[550px] bg-gray-900 overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-20 w-72 h-72 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500 rounded-full blur-3xl animate-pulse"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 flex items-center justify-center h-full px-4 lg:px-12">
            <div className="max-w-6xl w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Text */}
                <div>
                  <div className={`transform transition-all duration-1000 ease-out ${
                    showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    <p className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-medium mb-4 tracking-widest uppercase text-sm">
                      About Us
                    </p>
                    <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6 leading-tight text-white">
                      Capturing Life's
                      <span className="block italic font-light bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Beautiful Moments</span>
                    </h1>
                  </div>

                  <div className={`transform transition-all duration-1200 ease-out delay-200 ${
                    showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                      We are passionate storytellers who believe every moment deserves to be preserved in its most authentic and beautiful form.
                    </p>
                  </div>

                  <div className={`transform transition-all duration-1000 ease-out delay-400 ${
                    showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    <button className="group px-8 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2">
                      Book Your Session
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right Side - Image Placeholder */}
                <div className={`transform transition-all duration-1200 ease-out delay-300 ${
                  showText ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-95'
                }`}>
                  <div className="relative w-full max-w-md mx-auto">
                    <div className="absolute -top-6 -left-6 w-full h-full border-4 border-orange-400 rounded-3xl"></div>
                    <div className="relative bg-gradient-to-br from-orange-400 to-pink-500 rounded-3xl aspect-square flex items-center justify-center overflow-hidden shadow-2xl">
                     <Image
                                                           src="/image-photo2.png"
                                                           alt="KliqShot Logo"
                                                           fill
                                                           className="object-contain ml-4"
                                                           priority
                                                         />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-20 px-6 lg:px-12 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center transform transition-all duration-700 ${
                    showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full mb-4 shadow-lg">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent mb-2">{stat.number}</h3>
                  <p className="text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="py-12 px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-medium mb-4 tracking-widest uppercase text-sm">Our Story</p>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                The Journey Behind the Lens
              </h2>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                What started as a passion project in 2010 has evolved into a full-fledged creative studio dedicated to capturing life's most precious moments. Our journey began with a simple camera and an insatiable desire to freeze time.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">
                Over the years, we've had the privilege of documenting countless weddings, events, and personal milestones. Each project has taught us something new, refined our craft, and deepened our appreciation for the art of photography.
              </p>
              <p className="text-gray-700 leading-relaxed text-lg">
                Today, we bring together technical expertise, artistic vision, and genuine care for our clients to create images that don't just capture moments—they tell stories, evoke emotions, and preserve memories for generations to come.
              </p>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-20 px-6 lg:px-12 bg-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-orange-400 font-medium mb-4 tracking-widest uppercase text-sm">Our Values</p>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
                What We Stand For
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 hover:bg-opacity-20 transition-all duration-300 hover:scale-105 hover:shadow-2xl group border border-white border-opacity-20"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-900 mb-4">{value.title}</h3>
                  <p className="text-gray-900 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="py-20 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent font-medium mb-4 tracking-widest uppercase text-sm">Services</p>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold bg-gradient-to-r from-purple-900 to-indigo-900 bg-clip-text text-transparent mb-6">
                What We Offer
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:from-orange-400 hover:to-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer border-2 border-transparent hover:border-purple-900"
                >
                  <CheckCircle className="w-8 h-8 text-orange-500 group-hover:text-white mb-4 transition-colors" />
                  <h3 className="text-xl font-bold text-purple-900 group-hover:text-white transition-colors">{service}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 px-6 lg:px-12 bg-gray-900 rounded-3xl">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
              Ready to Create Magic Together?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-8">
              Let's capture your special moments and turn them into timeless memories.
            </p>
            <button className="px-10 py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white font-semibold rounded-full transition-all duration-300 hover:bg-purple-800 hover:scale-105 hover:shadow-2xl">
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}