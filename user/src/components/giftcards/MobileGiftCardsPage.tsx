'use client';

import { useState } from 'react';
import { FiGift, FiHeart, FiStar, FiUsers, FiCreditCard, FiCheck, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { BiParty, BiHappyBeaming } from 'react-icons/bi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { MdOutlineCardGiftcard, MdOutlinePhotoCamera } from 'react-icons/md';
import { AiOutlineGift } from 'react-icons/ai';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// Dummy gift card data (same as desktop)
const giftCardTypes = [
  {
    id: 1,
    name: 'Wedding Photography',
    shortName: 'Wedding',
    description: 'Perfect for celebrating special moments',
    occasions: ['Wedding', 'Anniversary', 'Engagement'],
    popular: true,
    icon: <FiHeart className="w-4 h-4" />,
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 2,
    name: 'Family Portrait',
    shortName: 'Family',
    description: 'Capture beautiful family memories',
    occasions: ['Birthday', 'Family Reunion', 'Holiday'],
    popular: true,
    icon: <FiUsers className="w-4 h-4" />,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 3,
    name: 'Event Photography',
    shortName: 'Events',
    description: 'For all special celebrations',
    occasions: ['Birthday', 'Corporate', 'Party'],
    popular: false,
    icon: <BiParty className="w-4 h-4" />,
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 4,
    name: 'Maternity Photography',
    shortName: 'Maternity',
    description: 'Celebrate the journey to parenthood',
    occasions: ['Baby Shower', 'Pregnancy', 'New Parent'],
    popular: false,
    icon: <BiHappyBeaming className="w-4 h-4" />,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 5,
    name: 'Portrait Session',
    shortName: 'Portrait',
    description: 'Professional headshots and portraits',
    occasions: ['Professional', 'Graduate', 'LinkedIn'],
    popular: true,
    icon: <MdOutlinePhotoCamera className="w-4 h-4" />,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 6,
    name: 'Universal Photography',
    shortName: 'Universal',
    description: 'Can be used for any photography service',
    occasions: ['Any Occasion', 'Flexible', 'Choice'],
    popular: true,
    icon: <AiOutlineGift className="w-4 h-4" />,
    color: 'from-teal-500 to-cyan-600'
  }
];

const denominations = [500, 1000, 2000, 5000, 10000];

const occasions = [
  { name: 'Birthday', icon: '🎂' },
  { name: 'Wedding', icon: '💒' },
  { name: 'Anniversary', icon: '💕' },
  { name: 'Graduation', icon: '🎓' },
  { name: 'New Job', icon: '💼' },
  { name: 'Thank You', icon: '🙏' },
  { name: 'Congratulations', icon: '🎉' },
  { name: 'Just Because', icon: '💝' }
];

export default function MobileGiftCardsPage() {
  const [selectedGiftCard, setSelectedGiftCard] = useState<number>(1);
  const [selectedAmount, setSelectedAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [useCustomAmount, setUseCustomAmount] = useState<boolean>(false);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('Birthday');
  const [recipientName, setRecipientName] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [senderName, setSenderName] = useState<string>('');
  const [personalMessage, setPersonalMessage] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [showGiftCardOptions, setShowGiftCardOptions] = useState<boolean>(false);
  const [showAmountOptions, setShowAmountOptions] = useState<boolean>(false);
  const [showOccasionOptions, setShowOccasionOptions] = useState<boolean>(false);

  const selectedCard = giftCardTypes.find(card => card.id === selectedGiftCard);
  const finalAmount = useCustomAmount ? parseInt(customAmount) || 0 : selectedAmount;

  const handleAmountChange = (amount: number) => {
    setSelectedAmount(amount);
    setUseCustomAmount(false);
    setCustomAmount('');
    setShowAmountOptions(false);
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setUseCustomAmount(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 text-white">
        <div className="px-4 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FiGift className="w-6 h-6" />
              <h1 className="text-3xl font-bold">Gift Cards</h1>
            </div>
            <p className="text-lg text-purple-100 mb-6">
              Give the gift of beautiful memories
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center max-w-sm mx-auto">
              <FiCreditCard className="w-6 h-6 mx-auto mb-2 text-yellow-300" />
              <h3 className="font-semibold mb-1">Instant Delivery</h3>
              <p className="text-sm text-purple-100">Send gift cards instantly via email</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Gift Card Preview */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Gift Card Preview</h3>
          <div className={`w-full h-32 bg-gradient-to-br ${selectedCard?.color} rounded-lg flex items-center justify-center relative overflow-hidden mb-3`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-white text-center">
              {selectedCard?.icon}
              <div className="mt-1 text-sm font-bold">KliqShot Gift Card</div>
              <div className="text-lg font-bold">₹{finalAmount.toLocaleString()}</div>
            </div>
            <div className="absolute top-2 right-2">
              <MdOutlineCardGiftcard className="w-5 h-5 text-white/50" />
            </div>
          </div>
          <div className="text-center">
            <div className="font-medium text-gray-900">{selectedCard?.name}</div>
            <div className="text-sm text-gray-600">{selectedCard?.description}</div>
          </div>
        </div>

        {/* Gift Card Type Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <button
            onClick={() => setShowGiftCardOptions(!showGiftCardOptions)}
            className="w-full flex items-center justify-between text-left"
          >
            <div>
              <h3 className="font-semibold text-gray-900">Gift Card Type</h3>
              <p className="text-sm text-gray-600">{selectedCard?.name}</p>
            </div>
            {showGiftCardOptions ? <FiChevronUp className="w-5 h-5 text-gray-400" /> : <FiChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          
          {showGiftCardOptions && (
            <div className="mt-4 space-y-2">
              {giftCardTypes.map((giftCard) => (
                <button
                  key={giftCard.id}
                  onClick={() => {
                    setSelectedGiftCard(giftCard.id);
                    setShowGiftCardOptions(false);
                  }}
                  className={`w-full p-3 rounded-lg border text-left transition-all duration-200 ${
                    selectedGiftCard === giftCard.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${giftCard.color} rounded flex items-center justify-center text-white`}>
                      {giftCard.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {giftCard.shortName}
                        {giftCard.popular && (
                          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{giftCard.description}</div>
                    </div>
                    {selectedGiftCard === giftCard.id && (
                      <FiCheck className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Amount Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <button
            onClick={() => setShowAmountOptions(!showAmountOptions)}
            className="w-full flex items-center justify-between text-left"
          >
            <div>
              <h3 className="font-semibold text-gray-900">Amount</h3>
              <p className="text-sm text-gray-600">₹{finalAmount.toLocaleString()}</p>
            </div>
            {showAmountOptions ? <FiChevronUp className="w-5 h-5 text-gray-400" /> : <FiChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          
          {showAmountOptions && (
            <div className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                {denominations.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountChange(amount)}
                    className={`p-3 rounded-lg border font-semibold transition-all duration-200 ${
                      selectedAmount === amount && !useCustomAmount
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    ₹{amount.toLocaleString()}
                  </button>
                ))}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Amount (₹500 - ₹50,000)
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => handleCustomAmountChange(e.target.value)}
                  min="500"
                  max="50000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Occasion Selection */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <button
            onClick={() => setShowOccasionOptions(!showOccasionOptions)}
            className="w-full flex items-center justify-between text-left"
          >
            <div>
              <h3 className="font-semibold text-gray-900">Occasion</h3>
              <p className="text-sm text-gray-600">{selectedOccasion}</p>
            </div>
            {showOccasionOptions ? <FiChevronUp className="w-5 h-5 text-gray-400" /> : <FiChevronDown className="w-5 h-5 text-gray-400" />}
          </button>
          
          {showOccasionOptions && (
            <div className="mt-4 grid grid-cols-2 gap-2">
              {occasions.map((occasion) => (
                <button
                  key={occasion.name}
                  onClick={() => {
                    setSelectedOccasion(occasion.name);
                    setShowOccasionOptions(false);
                  }}
                  className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                    selectedOccasion === occasion.name
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300'
                  }`}
                >
                  <div className="text-xl mb-1">{occasion.icon}</div>
                  <div className="text-xs font-medium text-gray-700">{occasion.name}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Gift Card Details Form */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Gift Card Details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Name *
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter recipient's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Email *
              </label>
              <input
                type="email"
                value={recipientEmail}
                onChange={(e) => setRecipientEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter recipient's email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Personal Message
              </label>
              <textarea
                value={personalMessage}
                onChange={(e) => setPersonalMessage(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                placeholder="Add a personal message (optional)"
                maxLength={200}
              />
              <div className="text-xs text-gray-500 mt-1">
                {personalMessage.length}/200 characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Delivery Date
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
              <div className="text-xs text-gray-500 mt-1">
                Leave empty for instant delivery
              </div>
            </div>
          </div>
        </div>

        {/* Purchase Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-900">Total Amount</span>
            <span className="text-2xl font-bold text-gray-900">₹{finalAmount.toLocaleString()}</span>
          </div>
          
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
            Purchase Gift Card
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            Secure payment processing • No expiry date
          </p>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Why Choose KliqShot Gift Cards?</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiCreditCard className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Instant Delivery</h4>
                <p className="text-sm text-gray-600">Gift cards are delivered instantly to the recipient's email</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiStar className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">No Expiry Date</h4>
                <p className="text-sm text-gray-600">Our gift cards never expire, use them anytime</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FiUsers className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">All Services</h4>
                <p className="text-sm text-gray-600">Can be used for any photography service we offer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
