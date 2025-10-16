'use client';

import { useState } from 'react';

export default function ContactUsPage() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedIssue, setSelectedIssue] = useState('');

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
      icon: '📞'
    },
    {
      title: 'Email Us',
      description: 'Send us your query and we\'ll get back to you',
      contact: 'support@kliqshot.com',
      hours: 'Response within 24 hours',
      icon: '✉️'
    },
    {
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Start Chat',
      hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
      icon: '💬'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🆘</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
              <p className="text-gray-600 mt-1">Get help with your queries and concerns</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Help Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Category</h2>
              <div className="space-y-2">
                {helpCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-50 border border-blue-200 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{category.icon}</span>
                      <span className="font-medium">{category.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Selected Category Content */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
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
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">{item}</span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Get in Touch</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contactMethods.map((method, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 transition-colors">
                    <div className="text-3xl mb-3">{method.icon}</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                    <div className="text-blue-600 font-medium mb-2">{method.contact}</div>
                    <div className="text-gray-500 text-xs">{method.hours}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* FAQ Section - Full Width */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="border border-gray-200 rounded-lg">
              <button 
                className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedIssue(selectedIssue === 'booking' ? '' : 'booking')}
              >
                <h3 className="font-medium text-gray-900">How do I book a photographer on KliqShot?</h3>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${selectedIssue === 'booking' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedIssue === 'booking' && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm pt-4">You can search for photographers by location and category, view their profiles and portfolios, then click 'Book Now' to schedule your session.</p>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button 
                className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedIssue(selectedIssue === 'cancel' ? '' : 'cancel')}
              >
                <h3 className="font-medium text-gray-900">What if I need to cancel my booking?</h3>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${selectedIssue === 'cancel' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedIssue === 'cancel' && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm pt-4">You can cancel your booking up to 24 hours before the scheduled session. Refunds will be processed within 5-7 business days.</p>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button 
                className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedIssue(selectedIssue === 'photographer' ? '' : 'photographer')}
              >
                <h3 className="font-medium text-gray-900">How do I become a photographer on KliqShot?</h3>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${selectedIssue === 'photographer' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedIssue === 'photographer' && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm pt-4">Visit our photographer registration page, fill out the application form, and upload your portfolio. Our team will review your application within 3-5 business days.</p>
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button 
                className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                onClick={() => setSelectedIssue(selectedIssue === 'payment' ? '' : 'payment')}
              >
                <h3 className="font-medium text-gray-900">Is my payment information secure?</h3>
                <svg className={`w-5 h-5 text-gray-400 transition-transform ${selectedIssue === 'payment' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {selectedIssue === 'payment' && (
                <div className="px-4 pb-4 border-t border-gray-200">
                  <p className="text-gray-600 text-sm pt-4">Yes, we use industry-standard encryption to protect your payment information. All transactions are processed securely through our payment partners.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
