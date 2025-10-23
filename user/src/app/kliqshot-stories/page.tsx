'use client';

import { Suspense } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Image from 'next/image';

function KliqShotStoriesContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 min-h-[50vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[32rem] h-[32rem] bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-pink-500/6 rounded-full blur-3xl animate-pulse" style={{animationDelay: '0.8s'}}></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '4s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-blue-300/30 rounded-full animate-bounce" style={{animationDelay: '1.2s', animationDuration: '5s'}}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-purple-300/25 rounded-full animate-bounce" style={{animationDelay: '2.5s', animationDuration: '4.5s'}}></div>
          <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-indigo-300/30 rounded-full animate-bounce" style={{animationDelay: '0.7s', animationDuration: '5.5s'}}></div>
          <div className="absolute top-1/2 left-1/5 w-1 h-1 bg-pink-300/20 rounded-full animate-bounce" style={{animationDelay: '3.2s', animationDuration: '4.8s'}}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              {/* <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 hover:bg-white/20 transition-all duration-300">
                <svg className="w-4 h-4 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="text-white text-xs font-medium">Inspiring Photography Stories</span>
              </div> */}
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                KliqShot
                <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Stories
                </span>
              </h1>
              
              <p className="text-base md:text-lg lg:text-xl text-blue-100 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Discover the incredible journeys, behind-the-scenes moments, and inspiring stories from our photography community
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center mb-8">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Explore Stories
                </button>
                <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-lg font-semibold text-sm hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  Share Your Story
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto lg:mx-0">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-white mb-1">500+</div>
                  <div className="text-blue-200 text-xs uppercase tracking-wider">Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-white mb-1">50K+</div>
                  <div className="text-blue-200 text-xs uppercase tracking-wider">Members</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-white mb-1">100+</div>
                  <div className="text-blue-200 text-xs uppercase tracking-wider">Photographers</div>
                </div>
              </div>
            </div>

            {/* Right Content - Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {/* Top Left Image */}
                <div className="relative h-48 rounded-xl overflow-hidden shadow-2xl group">
                  <Image
                    src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Photography Story 1"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Top Right Image */}
                <div className="relative h-48 rounded-xl overflow-hidden shadow-2xl mt-8 group">
                  <Image
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Photography Story 2"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Bottom Left Image */}
                <div className="relative h-48 rounded-xl overflow-hidden shadow-2xl -mt-4 group">
                  <Image
                    src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Photography Story 3"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Bottom Right Image */}
                <div className="relative h-48 rounded-xl overflow-hidden shadow-2xl mt-4 group">
                  <Image
                    src="https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Photography Story 4"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500"></div>
                  <div className="absolute inset-0 bg-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Story</h2>
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-80 lg:h-full">
                <Image
                  src="https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Featured Story"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4 w-fit">
                  Featured Story
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Capturing Love: A Wedding Photographer's Journey
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Follow Sarah's incredible journey from amateur photographer to one of the most sought-after wedding photographers in the city. Discover how she captures those perfect moments that couples treasure forever.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">S</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sarah Johnson</p>
                      <p className="text-sm text-gray-500">Wedding Photographer</p>
                    </div>
                  </div>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Story 1"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium mb-3">
                  Portrait Photography
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  The Art of Portrait Photography
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Learn the secrets behind creating stunning portrait photographs that capture the essence of your subject.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">M</span>
                    </div>
                    <span className="text-sm text-gray-600">Mike Chen</span>
                  </div>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
              </div>
            </div>

            {/* Story 2 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Story 2"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-medium mb-3">
                  Event Photography
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Corporate Events Made Memorable
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Discover how professional event photography can transform your corporate gatherings into lasting memories.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">A</span>
                    </div>
                    <span className="text-sm text-gray-600">Alex Rivera</span>
                  </div>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
              </div>
            </div>

            {/* Story 3 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Story 3"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-medium mb-3">
                  Nature Photography
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Chasing Light: Landscape Photography Tips
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Explore the world of landscape photography and learn how to capture nature's beauty in its purest form.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">E</span>
                    </div>
                    <span className="text-sm text-gray-600">Emma Wilson</span>
                  </div>
                  <span className="text-xs text-gray-500">2 weeks ago</span>
                </div>
              </div>
            </div>

            {/* Story 4 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Story 4"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium mb-3">
                  Fashion Photography
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Fashion Forward: Style Meets Photography
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Dive into the glamorous world of fashion photography and learn how to create stunning editorial shots.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">D</span>
                    </div>
                    <span className="text-sm text-gray-600">David Kim</span>
                  </div>
                  <span className="text-xs text-gray-500">3 weeks ago</span>
                </div>
              </div>
            </div>

            {/* Story 5 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Story 5"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mb-3">
                  Wedding Photography
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Love Stories: Wedding Photography Mastery
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Master the art of wedding photography and learn how to capture those once-in-a-lifetime moments.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">L</span>
                    </div>
                    <span className="text-sm text-gray-600">Lisa Thompson</span>
                  </div>
                  <span className="text-xs text-gray-500">1 month ago</span>
                </div>
              </div>
            </div>

            {/* Story 6 */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48">
                <Image
                  src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Story 6"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-medium mb-3">
                  Street Photography
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Urban Tales: Street Photography Adventures
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  Explore the vibrant world of street photography and learn how to capture the soul of the city.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">J</span>
                    </div>
                    <span className="text-sm text-gray-600">James Park</span>
                  </div>
                  <span className="text-xs text-gray-500">1 month ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Share Your Story</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Have an inspiring photography story to share? Join our community and inspire others with your journey.
          </p>
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Submit Your Story
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function KliqShotStories() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KliqShotStoriesContent />
    </Suspense>
  );
}
