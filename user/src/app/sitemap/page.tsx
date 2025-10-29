'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">Sitemap</h1>
          <p className="text-sm text-gray-600 mt-1">Find what you're looking for</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          
          {/* Shop by Category */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Shop by Category</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories" className="text-gray-700 hover:text-blue-600 hover:underline">All Categories</Link></li>
              <li><Link href="/photographer" className="text-gray-700 hover:text-blue-600 hover:underline">Photographers</Link></li>
              <li><Link href="/packages" className="text-gray-700 hover:text-blue-600 hover:underline">Photography Packages</Link></li>
              <li><Link href="/booking" className="text-gray-700 hover:text-blue-600 hover:underline">Book a Session</Link></li>
              <li><Link href="/search" className="text-gray-700 hover:text-blue-600 hover:underline">Search Photographers</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Customer Service</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contactus" className="text-gray-700 hover:text-blue-600 hover:underline">Contact Us</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Help Center</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">FAQ</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Cancellation & Returns</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Shipping Information</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Payment Methods</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Account</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/signin" className="text-gray-700 hover:text-blue-600 hover:underline">Sign In</Link></li>
              <li><Link href="/signup" className="text-gray-700 hover:text-blue-600 hover:underline">Sign Up</Link></li>
              <li><Link href="/profile" className="text-gray-700 hover:text-blue-600 hover:underline">My Profile</Link></li>
              <li><Link href="/bookings" className="text-gray-700 hover:text-blue-600 hover:underline">My Bookings</Link></li>
              <li><Link href="/wishlist" className="text-gray-700 hover:text-blue-600 hover:underline">Wishlist</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Company</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/aboutus" className="text-gray-700 hover:text-blue-600 hover:underline">About Us</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Careers</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Press</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">KliqShot Stories</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Corporate Information</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Legal</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Terms of Use</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Security</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Grievance Redressal</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">EPR Compliance</Link></li>
            </ul>
          </div>

          {/* For Sellers */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">For Sellers</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Become a Seller</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Seller Dashboard</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Seller Guidelines</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Commission Structure</Link></li>
              <li><Link href="#" className="text-gray-700 hover:text-blue-600 hover:underline">Seller Support</Link></li>
            </ul>
          </div>

          {/* Popular Searches */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Popular Searches</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search?q=wedding" className="text-gray-700 hover:text-blue-600 hover:underline">Wedding Photography</Link></li>
              <li><Link href="/search?q=portrait" className="text-gray-700 hover:text-blue-600 hover:underline">Portrait Photography</Link></li>
              <li><Link href="/search?q=event" className="text-gray-700 hover:text-blue-600 hover:underline">Event Photography</Link></li>
              <li><Link href="/search?q=fashion" className="text-gray-700 hover:text-blue-600 hover:underline">Fashion Photography</Link></li>
              <li><Link href="/search?q=commercial" className="text-gray-700 hover:text-blue-600 hover:underline">Commercial Photography</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">Quick Links</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-700 hover:text-blue-600 hover:underline">Home</Link></li>
              <li><Link href="/categories" className="text-gray-700 hover:text-blue-600 hover:underline">Browse Categories</Link></li>
              <li><Link href="/photographer" className="text-gray-700 hover:text-blue-600 hover:underline">Find Photographers</Link></li>
              <li><Link href="/booking/summary" className="text-gray-700 hover:text-blue-600 hover:underline">Booking Summary</Link></li>
              <li><Link href="/cart" className="text-gray-700 hover:text-blue-600 hover:underline">Shopping Cart</Link></li>
            </ul>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
}
