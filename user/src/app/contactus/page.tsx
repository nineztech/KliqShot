'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useAuth } from '@/components/AuthContext';

export default function ContactUsPage() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedIssue, setSelectedIssue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState('');
  const { user, isAuthenticated } = useAuth();

  // Mock user orders/bookings data
  const [userBookings, setUserBookings] = useState([
    {
      id: 'BK001',
      photographerName: 'Sarah Johnson',
      category: 'Wedding Photography',
      date: '2024-02-15',
      status: 'Confirmed',
      amount: '₹15,000',
      issue: 'Need to reschedule'
    },
    {
      id: 'BK002',
      photographerName: 'Mike Chen',
      category: 'Portrait Photography',
      date: '2024-02-20',
      status: 'Completed',
      amount: '₹8,500',
      issue: 'Photos not delivered'
    },
    {
      id: 'BK003',
      photographerName: 'Emily Rodriguez',
      category: 'Event Photography',
      date: '2024-02-25',
      status: 'Pending',
      amount: '₹12,000',
      issue: 'Payment issue'
    }
  ]);

  const helpCategories = [
    {
      id: 'general',
      title: 'General Help',
      icon: '❓',
      items: [
        'How do I book a photographer?',
        'How to search for photographers?',
        'What payment methods do you accept?',
        'How to create an account?'
      ]
    },
    {
      id: 'booking',
      title: 'Booking & Cancellation',
      icon: '📅',
      items: [
        'How to cancel a booking?',
        'Rescheduling appointments',
        'Booking confirmation process',
        'Refund policy'
      ]
    },
    {
      id: 'payment',
      title: 'Payment & Billing',
      icon: '💳',
      items: [
        'Payment methods accepted',
        'Billing information',
        'Invoice and receipts',
        'Payment security'
      ]
    },
    {
      id: 'account',
      title: 'Account & Profile',
      icon: '👤',
      items: [
        'Update profile information',
        'Change password',
        'Account verification',
        'Delete account'
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: '🔧',
      items: [
        'Website issues',
        'Mobile app problems',
        'Login difficulties',
        'Browser compatibility'
      ]
    },
    {
      id: 'photographers',
      title: 'For Photographers',
      icon: '📸',
      items: [
        'How to become a photographer?',
        'Photographer dashboard',
        'Earnings and payments',
        'Profile optimization'
      ]
    }
  ];

  const contactMethods = [
    {
      title: 'Call Us',
      description: 'Speak to our customer support team',
      contact: '+91 80 4719 1000',
      hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
      icon: '📞',
      action: 'Call Now'
    },
    {
      title: 'Email Us',
      description: 'Send us your query and we\'ll get back to you',
      contact: 'support@kliqshot.com',
      hours: 'Response within 24 hours',
      icon: '✉️',
      action: 'Send Email'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Start Chat',
      hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
      icon: '💬',
      action: 'Start Chat'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
            <p className="text-gray-600">Find answers to your questions or get in touch with our support team</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Help Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
              <div className="space-y-1">
                {helpCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 border border-blue-200 text-blue-700 shadow-sm'
                        : 'hover:bg-gray-50 text-gray-700 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium text-sm">{category.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* User Bookings Section */}
            {isAuthenticated ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Your Bookings</h2>
                    <p className="text-gray-600 text-sm">Select a booking to report an issue</p>
                  </div>
                </div>
                
                <div className="grid gap-4 mb-6">
                  {userBookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        selectedBooking === booking.id
                          ? 'border-blue-300 bg-blue-50 shadow-sm'
                          : 'border-gray-200 hover:border-blue-300 hover:shadow-sm'
                      }`}
                      onClick={() => setSelectedBooking(booking.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{booking.photographerName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                              booking.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                              booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {booking.status}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div>
                              <span className="font-medium">Booking ID:</span>
                              <div className="text-gray-900">{booking.id}</div>
                            </div>
                            <div>
                              <span className="font-medium">Category:</span>
                              <div className="text-gray-900">{booking.category}</div>
                            </div>
                            <div>
                              <span className="font-medium">Date:</span>
                              <div className="text-gray-900">{booking.date}</div>
                            </div>
                            <div>
                              <span className="font-medium">Amount:</span>
                              <div className="text-gray-900 font-semibold">{booking.amount}</div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${
                            selectedBooking === booking.id ? 'bg-blue-500' : 'bg-gray-300'
                          }`}></div>
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedBooking && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">Issue Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          What issue are you facing with this booking?
                        </label>
                        <select 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          defaultValue=""
                        >
                          <option value="">Select an issue</option>
                          <option value="reschedule">Need to reschedule</option>
                          <option value="cancel">Want to cancel</option>
                          <option value="photos">Photos not delivered</option>
                          <option value="quality">Photo quality issue</option>
                          <option value="payment">Payment related</option>
                          <option value="photographer">Photographer not responding</option>
                          <option value="other">Other issue</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Describe your issue in detail
                        </label>
                        <textarea 
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          rows={3}
                          placeholder="Please provide more details about your issue..."
                        ></textarea>
                      </div>
                      <div className="flex space-x-3">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                          Submit Issue
                        </button>
                        <button 
                          onClick={() => setSelectedBooking('')}
                          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6 mb-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Access Your Bookings</h2>
                    <p className="text-gray-600 text-sm">Sign in to view your bookings and report issues</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <p className="text-gray-700 mb-2">
                      Log in to your account to see all your bookings and easily report any issues you're facing.
                    </p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Quick issue reporting</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Booking history access</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Priority support</span>
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200">
                      Sign In
                    </button>
                    <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200">
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Selected Category Content */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-2xl">
                  {helpCategories.find(cat => cat.id === selectedCategory)?.icon}
                </span>
                <h2 className="text-xl font-semibold text-gray-900">
                  {helpCategories.find(cat => cat.id === selectedCategory)?.title}
                </h2>
              </div>
              
              <div className="grid gap-3">
                {helpCategories.find(cat => cat.id === selectedCategory)?.items.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-sm transition-all duration-200 cursor-pointer group">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700 group-hover:text-gray-900">{item}</span>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 hover:shadow-sm transition-all duration-200 group">
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">{method.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                    <div className="text-blue-600 font-medium mb-2">{method.contact}</div>
                    <div className="text-gray-500 text-xs mb-3">{method.hours}</div>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                      {method.action}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setSelectedIssue(selectedIssue === 'booking' ? '' : 'booking')}
              >
                <h3 className="font-medium text-gray-900">How do I book a photographer on KliqShot?</h3>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${selectedIssue === 'booking' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedIssue === 'booking' && (
                    <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600 text-sm pt-4">You can search for photographers by location and category, view their profiles and portfolios, then click 'Book Now' to schedule your session. The booking process is simple and takes just a few minutes.</p>
                </div>
              )}
            </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setSelectedIssue(selectedIssue === 'cancel' ? '' : 'cancel')}
              >
                <h3 className="font-medium text-gray-900">What if I need to cancel my booking?</h3>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${selectedIssue === 'cancel' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedIssue === 'cancel' && (
                    <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600 text-sm pt-4">You can cancel your booking up to 24 hours before the scheduled session. Refunds will be processed within 5-7 business days to your original payment method.</p>
                </div>
              )}
            </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setSelectedIssue(selectedIssue === 'photographer' ? '' : 'photographer')}
              >
                <h3 className="font-medium text-gray-900">How do I become a photographer on KliqShot?</h3>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${selectedIssue === 'photographer' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedIssue === 'photographer' && (
                    <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600 text-sm pt-4">Visit our photographer registration page, fill out the application form, and upload your portfolio. Our team will review your application within 3-5 business days and notify you of the status.</p>
                </div>
              )}
            </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => setSelectedIssue(selectedIssue === 'payment' ? '' : 'payment')}
              >
                <h3 className="font-medium text-gray-900">Is my payment information secure?</h3>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${selectedIssue === 'payment' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedIssue === 'payment' && (
                    <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600 text-sm pt-4">Yes, we use industry-standard encryption to protect your payment information. All transactions are processed securely through our payment partners and we never store your card details.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
