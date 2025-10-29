'use client';

import { useState } from 'react';
import { FiGift, FiHeart, FiStar, FiUsers, FiCreditCard, FiCheck, FiPlus, FiMinus } from 'react-icons/fi';
import { BiParty, BiHappyBeaming } from 'react-icons/bi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { MdOutlineCardGiftcard, MdOutlinePhotoCamera } from 'react-icons/md';
import { AiOutlineGift } from 'react-icons/ai';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

// Dummy gift card data
const giftCardTypes = [
  {
    id: 1,
    name: 'Wedding Photography Gift Card',
    description: 'Perfect for celebrating special moments',
    image: '/Images/wedding_image.png',
    occasions: ['Wedding', 'Anniversary', 'Engagement'],
    popular: true,
    icon: <FiHeart className="w-5 h-5" />,
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 2,
    name: 'Family Portrait Gift Card',
    description: 'Capture beautiful family memories',
    image: '/Images/family.jpg',
    occasions: ['Birthday', 'Family Reunion', 'Holiday'],
    popular: true,
    icon: <FiUsers className="w-5 h-5" />,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 3,
    name: 'Event Photography Gift Card',
    description: 'For all special celebrations',
    image: '/Images/event.jpg',
    occasions: ['Birthday', 'Corporate', 'Party'],
    popular: false,
    icon: <BiParty className="w-5 h-5" />,
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 4,
    name: 'Maternity Photography Gift Card',
    description: 'Celebrate the journey to parenthood',
    image: '/Images/maternity.jpg',
    occasions: ['Baby Shower', 'Pregnancy', 'New Parent'],
    popular: false,
    icon: <BiHappyBeaming className="w-5 h-5" />,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 5,
    name: 'Portrait Session Gift Card',
    description: 'Professional headshots and portraits',
    image: '/Images/portrait.jpg',
    occasions: ['Professional', 'Graduate', 'LinkedIn'],
    popular: true,
    icon: <MdOutlinePhotoCamera className="w-5 h-5" />,
    color: 'from-orange-500 to-red-600'
  },
  {
    id: 6,
    name: 'Universal Photography Gift Card',
    description: 'Can be used for any photography service',
    image: '/Images/universal.jpg',
    occasions: ['Any Occasion', 'Flexible', 'Choice'],
    popular: true,
    icon: <AiOutlineGift className="w-5 h-5" />,
    color: 'from-teal-500 to-cyan-600'
  }
];

const denominations = [500, 1000, 2000, 5000, 10000];

const occasions = [
  { name: 'Birthday', icon: '🎂', color: 'bg-yellow-100 text-yellow-800' },
  { name: 'Wedding', icon: '💒', color: 'bg-pink-100 text-pink-800' },
  { name: 'Anniversary', icon: '💕', color: 'bg-red-100 text-red-800' },
  { name: 'Graduation', icon: '🎓', color: 'bg-blue-100 text-blue-800' },
  { name: 'New Job', icon: '💼', color: 'bg-green-100 text-green-800' },
  { name: 'Thank You', icon: '🙏', color: 'bg-purple-100 text-purple-800' },
  { name: 'Congratulations', icon: '🎉', color: 'bg-indigo-100 text-indigo-800' },
  { name: 'Just Because', icon: '💝', color: 'bg-gray-100 text-gray-800' }
];

interface GiftCardProps {
  giftCard: typeof giftCardTypes[0];
  onSelect: (id: number) => void;
  isSelected: boolean;
}

const GiftCardItem = ({ giftCard, onSelect, isSelected }: GiftCardProps) => {
  return (
    <div 
      onClick={() => onSelect(giftCard.id)}
      className={`relative bg-white rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      {giftCard.popular && (
        <div className="absolute -top-2 left-4 bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          <div className="flex items-center gap-1">
            <HiOutlineSparkles className="w-3 h-3" />
            POPULAR
          </div>
        </div>
      )}
      
      <div className="p-6">
        <div className={`w-full h-40 bg-gradient-to-br ${giftCard.color} rounded-lg mb-4 flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10 text-white text-center">
            {giftCard.icon}
            <div className="mt-2 text-lg font-bold">KliqShot</div>
            <div className="text-sm opacity-90">Gift Card</div>
          </div>
          <div className="absolute top-2 right-2">
            <MdOutlineCardGiftcard className="w-6 h-6 text-white/50" />
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-900 text-lg mb-2">{giftCard.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{giftCard.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {giftCard.occasions.slice(0, 3).map((occasion, index) => (
            <span 
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
            >
              {occasion}
            </span>
          ))}
        </div>
        
        {isSelected && (
          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <FiCheck className="w-4 h-4" />
            <span className="text-sm">Selected</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default function DesktopGiftCardsPage() {
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

  const selectedCard = giftCardTypes.find(card => card.id === selectedGiftCard);
  const finalAmount = useCustomAmount ? parseInt(customAmount) || 0 : selectedAmount;

  const handleAmountChange = (amount: number) => {
    setSelectedAmount(amount);
    setUseCustomAmount(false);
    setCustomAmount('');
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
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <FiGift className="w-8 h-8" />
              <h1 className="text-4xl font-bold">Gift Cards</h1>
            </div>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Give the gift of beautiful memories with KliqShot photography gift cards
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <FiCreditCard className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
                <h3 className="font-semibold mb-1">Instant Delivery</h3>
                <p className="text-sm text-purple-100">Send gift cards instantly via email</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <FiStar className="w-8 h-8 mx-auto mb-2 text-green-300" />
                <h3 className="font-semibold mb-1">No Expiry</h3>
                <p className="text-sm text-purple-100">Gift cards never expire</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                <FiUsers className="w-8 h-8 mx-auto mb-2 text-blue-300" />
                <h3 className="font-semibold mb-1">All Services</h3>
                <p className="text-sm text-purple-100">Use for any photography service</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gift Card Selection */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Gift Card Type</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {giftCardTypes.map((giftCard) => (
                <GiftCardItem
                  key={giftCard.id}
                  giftCard={giftCard}
                  onSelect={setSelectedGiftCard}
                  isSelected={selectedGiftCard === giftCard.id}
                />
              ))}
            </div>

            {/* Amount Selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Amount</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {denominations.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountChange(amount)}
                    className={`p-3 rounded-lg border-2 font-semibold transition-all duration-200 ${
                      selectedAmount === amount && !useCustomAmount
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    ₹{amount.toLocaleString()}
                  </button>
                ))}
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or enter custom amount (₹500 - ₹50,000)
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

            {/* Occasion Selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Occasion</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {occasions.map((occasion) => (
                  <button
                    key={occasion.name}
                    onClick={() => setSelectedOccasion(occasion.name)}
                    className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                      selectedOccasion === occasion.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="text-2xl mb-1">{occasion.icon}</div>
                    <div className="text-xs font-medium text-gray-700">{occasion.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Purchase Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Gift Card Details</h3>
              
              {/* Preview */}
              <div className={`w-full h-32 bg-gradient-to-br ${selectedCard?.color} rounded-lg mb-6 flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 text-white text-center">
                  {selectedCard?.icon}
                  <div className="mt-1 text-sm font-bold">KliqShot Gift Card</div>
                  <div className="text-lg font-bold">₹{finalAmount.toLocaleString()}</div>
                </div>
              </div>

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

              <div className="border-t border-gray-200 mt-6 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-gray-900">₹{finalAmount.toLocaleString()}</span>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  Purchase Gift Card
                </button>
                
                <p className="text-xs text-gray-500 text-center mt-3">
                  Secure payment processing • No expiry date
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Why Choose KliqShot Gift Cards?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCreditCard className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Instant Delivery</h3>
              <p className="text-gray-600 text-sm">Gift cards are delivered instantly to the recipient's email</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">No Expiry Date</h3>
              <p className="text-gray-600 text-sm">Our gift cards never expire, use them anytime</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">All Services</h3>
              <p className="text-gray-600 text-sm">Can be used for any photography service we offer</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiHeart className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Perfect Gift</h3>
              <p className="text-gray-600 text-sm">The perfect gift for photography enthusiasts</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
