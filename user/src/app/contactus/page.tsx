'use client';

import { useState } from 'react';

export default function ContactUsPage() {
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedIssue, setSelectedIssue] = useState('');
<<<<<<< Updated upstream
=======
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState('');
  const [openFAQ, setOpenFAQ] = useState<{ [key: string]: boolean }>({});
  const [openHelpItems, setOpenHelpItems] = useState<{ [key: string]: boolean }>({});
  const { user, isAuthenticated } = useAuth();

  const toggleFAQ = (faqKey: string) => {
    setOpenFAQ(prev => ({
      ...prev,
      [faqKey]: !prev[faqKey]
    }));
  };

  const toggleHelpItem = (itemKey: string) => {
    setOpenHelpItems(prev => ({
      ...prev,
      [itemKey]: !prev[itemKey]
    }));
  };

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
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
=======
        {/* Search Bar
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
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors cursor-pointer">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">{item}</span>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
=======
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button 
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => toggleHelpItem(`${selectedCategory}-${index}`)}
                    >
                      <span className="text-gray-700">{item}</span>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openHelpItems[`${selectedCategory}-${index}`] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
>>>>>>> Stashed changes
                      </svg>
                    </button>
                    {openHelpItems[`${selectedCategory}-${index}`] && (
                      <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-gray-600 text-sm pt-4">
                          {selectedCategory === 'general' && index === 0 && "To book a photographer, first search for photographers in your area using our search filters. Browse through their profiles and portfolios, then click 'Book Now' to schedule your session. You can choose your preferred date and time, and complete the payment securely."}
                          {selectedCategory === 'general' && index === 1 && "Use our advanced search filters to find photographers by location, category, price range, and availability. You can also search by specific photography styles or read reviews from previous clients to make an informed decision."}
                          {selectedCategory === 'general' && index === 2 && "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, net banking, UPI, and digital wallets like Paytm, PhonePe, and Google Pay. All payments are processed securely through our payment partners."}
                          {selectedCategory === 'general' && index === 3 && "Creating an account is simple! Click on 'Sign Up' in the top right corner, enter your email address and create a password. Verify your email address and you're all set to start booking photographers."}
                          {selectedCategory === 'booking' && index === 0 && "You can cancel your booking up to 24 hours before the scheduled session through your account dashboard. Refunds will be processed within 5-7 business days to your original payment method."}
                          {selectedCategory === 'booking' && index === 1 && "To reschedule, contact the photographer directly through the messaging system or call our support team. Most photographers are flexible with rescheduling, especially with advance notice."}
                          {selectedCategory === 'booking' && index === 2 && "Once you complete the booking and payment, you'll receive a confirmation email with all the details. The photographer will also be notified and can contact you to discuss the session details."}
                          {selectedCategory === 'booking' && index === 3 && "Our refund policy allows full refunds for cancellations made 24+ hours in advance. Cancellations within 24 hours may incur a 50% cancellation fee. No-shows are non-refundable."}
                          {selectedCategory === 'payment' && index === 0 && "We accept Visa, MasterCard, American Express, debit cards, net banking, UPI, Paytm, PhonePe, Google Pay, and other popular digital payment methods."}
                          {selectedCategory === 'payment' && index === 1 && "Your billing information is securely stored and encrypted. You can update your billing details anytime in your account settings under 'Payment Methods'."}
                          {selectedCategory === 'payment' && index === 2 && "You'll receive an email receipt immediately after payment. You can also download invoices from your account dashboard under 'Booking History' for tax purposes."}
                          {selectedCategory === 'payment' && index === 3 && "We use industry-standard SSL encryption and PCI DSS compliance to ensure your payment information is secure. We never store your card details on our servers."}
                          {selectedCategory === 'account' && index === 0 && "Go to your profile settings and update your personal information, contact details, and preferences. Changes are saved automatically and take effect immediately."}
                          {selectedCategory === 'account' && index === 1 && "In your account settings, click on 'Security' and then 'Change Password'. Enter your current password and create a new secure password."}
                          {selectedCategory === 'account' && index === 2 && "Account verification helps build trust. Upload a government-issued ID and complete the verification process. Verified accounts get priority support and special badges."}
                          {selectedCategory === 'account' && index === 3 && "To delete your account, go to account settings and click 'Delete Account'. This action is irreversible and will remove all your data, bookings, and history."}
                          {selectedCategory === 'technical' && index === 0 && "If you're experiencing website issues, try refreshing the page, clearing your browser cache, or using a different browser. Contact our technical support if problems persist."}
                          {selectedCategory === 'technical' && index === 1 && "Make sure you have the latest version of our mobile app installed. If you're still having issues, try logging out and back in, or contact our support team."}
                          {selectedCategory === 'technical' && index === 2 && "Double-check your email and password. If you've forgotten your password, use the 'Forgot Password' link. For persistent login issues, contact our support team."}
                          {selectedCategory === 'technical' && index === 3 && "Our website works best with Chrome, Firefox, Safari, and Edge browsers. Make sure JavaScript is enabled and you have a stable internet connection."}
                          {selectedCategory === 'photographers' && index === 0 && "Visit our photographer registration page, fill out the application form with your details and portfolio, and submit for review. Our team will evaluate your application within 3-5 business days."}
                          {selectedCategory === 'photographers' && index === 1 && "Access your photographer dashboard to manage bookings, update your profile, view earnings, and communicate with clients. The dashboard is your central hub for all photographer activities."}
                          {selectedCategory === 'photographers' && index === 2 && "Earnings are calculated based on your pricing minus our platform fee. Payments are processed weekly and transferred to your registered bank account or digital wallet."}
                          {selectedCategory === 'photographers' && index === 3 && "Optimize your profile with high-quality portfolio images, detailed descriptions, competitive pricing, and prompt responses to client inquiries. Regular updates help improve your visibility."}
                        </p>
                      </div>
                    )}
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
<<<<<<< Updated upstream
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
=======
                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ('booking')}
              >
                <h3 className="font-medium text-gray-900">How do I book a photographer on KliqShot?</h3>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openFAQ['booking'] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFAQ['booking'] && (
                    <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600 text-sm pt-4">You can search for photographers by location and category, view their profiles and portfolios, then click 'Book Now' to schedule your session. The booking process is simple and takes just a few minutes.</p>
>>>>>>> Stashed changes
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button 
<<<<<<< Updated upstream
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
=======
                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ('cancel')}
              >
                <h3 className="font-medium text-gray-900">What if I need to cancel my booking?</h3>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openFAQ['cancel'] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFAQ['cancel'] && (
                    <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600 text-sm pt-4">You can cancel your booking up to 24 hours before the scheduled session. Refunds will be processed within 5-7 business days to your original payment method.</p>
>>>>>>> Stashed changes
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button 
<<<<<<< Updated upstream
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
=======
                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ('photographer')}
              >
                <h3 className="font-medium text-gray-900">How do I become a photographer on KliqShot?</h3>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openFAQ['photographer'] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFAQ['photographer'] && (
                    <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600 text-sm pt-4">Visit our photographer registration page, fill out the application form, and upload your portfolio. Our team will review your application within 3-5 business days and notify you of the status.</p>
>>>>>>> Stashed changes
                </div>
              )}
            </div>

            <div className="border border-gray-200 rounded-lg">
              <button 
<<<<<<< Updated upstream
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
=======
                    className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                onClick={() => toggleFAQ('payment')}
              >
                <h3 className="font-medium text-gray-900">Is my payment information secure?</h3>
                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${openFAQ['payment'] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFAQ['payment'] && (
                    <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                      <p className="text-gray-600 text-sm pt-4">Yes, we use industry-standard encryption to protect your payment information. All transactions are processed securely through our payment partners and we never store your card details.</p>
                    </div>
                  )}
>>>>>>> Stashed changes
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
