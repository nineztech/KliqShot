'use client';

import { useState } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdSearch,
  MdClose,
  MdCheckCircle,
  MdCheck
} from 'react-icons/md';

interface FieldVerification {
  aadharCard?: boolean;
  panCard?: boolean;
  mobileNumber?: boolean;
  email?: boolean;
  name?: boolean;
  temporaryAddress?: boolean;
  permanentAddress?: boolean;
}

interface Photographer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  specialty: string;
  rating: number;
  reviews: number;
  price: string;
  experience: string;
  image: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  categories: string[];
  isVerified?: boolean;
  verifiedAt?: string;
  fieldVerification?: FieldVerification;
  // Additional fields for verification
  aadharCard?: string;
  panCard?: string;
  temporaryAddress?: string;
  permanentAddress?: string;
}

interface MobilePhotographerManagementProps {
  photographers: Photographer[];
  setPhotographers: (photographers: Photographer[]) => void;
}

export default function MobilePhotographerManagement({ photographers, setPhotographers }: MobilePhotographerManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPhotographer, setSelectedPhotographer] = useState<Photographer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'verified'>('pending');
  const [newPhotographer, setNewPhotographer] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    specialty: '',
    rating: 0,
    reviews: 0,
    price: '',
    experience: '',
    image: '',
    status: 'pending' as 'active' | 'inactive' | 'pending',
    categories: []
  });

  const handleAddPhotographer = () => {
    if (newPhotographer.name && newPhotographer.email) {
      const photographer: Photographer = {
        id: Date.now().toString(),
        name: newPhotographer.name,
        email: newPhotographer.email,
        phone: newPhotographer.phone,
        location: newPhotographer.location,
        specialty: newPhotographer.specialty,
        rating: newPhotographer.rating,
        reviews: newPhotographer.reviews,
        price: newPhotographer.price,
        experience: newPhotographer.experience,
        image: newPhotographer.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        status: newPhotographer.status,
        joinDate: new Date().toISOString().split('T')[0],
        categories: newPhotographer.categories
      };
      setPhotographers([...photographers, photographer]);
      setNewPhotographer({
        name: '',
        email: '',
        phone: '',
        location: '',
        specialty: '',
        rating: 0,
        reviews: 0,
        price: '',
        experience: '',
        image: '',
        status: 'pending',
        categories: []
      });
      setShowAddModal(false);
    }
  };

  const handleDeletePhotographer = (photographerId: string) => {
    if (confirm('Are you sure you want to delete this kliqchamp?')) {
      setPhotographers(photographers.filter(photographer => photographer.id !== photographerId));
    }
  };

  const handleVerifyPhotographer = (photographerId: string) => {
    const photographer = photographers.find(p => p.id === photographerId);
    if (photographer) {
      setSelectedPhotographer(photographer);
    }
  };

  const handleFieldVerification = (field: keyof FieldVerification) => {
    if (!selectedPhotographer) return;
    
    const updatedVerification = {
      ...selectedPhotographer.fieldVerification,
      [field]: !selectedPhotographer.fieldVerification?.[field]
    };

    const updatedPhotographer = {
      ...selectedPhotographer,
      fieldVerification: updatedVerification
    };

    // Check if all fields are verified
    const allFieldsVerified = (
      updatedVerification.aadharCard &&
      updatedVerification.panCard &&
      updatedVerification.mobileNumber &&
      updatedVerification.email &&
      updatedVerification.name &&
      updatedVerification.temporaryAddress &&
      updatedVerification.permanentAddress
    );

    if (allFieldsVerified) {
      updatedPhotographer.isVerified = true;
      updatedPhotographer.verifiedAt = new Date().toISOString();
    }

    setPhotographers(photographers.map(photographer => 
      photographer.id === selectedPhotographer.id 
        ? updatedPhotographer
        : photographer
    ));

    setSelectedPhotographer(updatedPhotographer);
  };

  const handleVerifyAllFields = () => {
    if (!selectedPhotographer) return;

    const allVerification: FieldVerification = {
      aadharCard: true,
      panCard: true,
      mobileNumber: true,
      email: true,
      name: true,
      temporaryAddress: true,
      permanentAddress: true
    };

    const updatedPhotographer = {
      ...selectedPhotographer,
      fieldVerification: allVerification,
      isVerified: true,
      verifiedAt: new Date().toISOString()
    };

    setPhotographers(photographers.map(photographer => 
      photographer.id === selectedPhotographer.id 
        ? updatedPhotographer
        : photographer
    ));

    setSelectedPhotographer(updatedPhotographer);
  };

  const filteredPhotographers = photographers.filter(photographer => {
    const matchesSearch = photographer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           photographer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           photographer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'pending' ? !photographer.isVerified : photographer.isVerified;
    return matchesSearch && matchesTab;
  });

  const pendingCount = photographers.filter(p => !p.isVerified).length;
  const verifiedCount = photographers.filter(p => p.isVerified).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // If a photographer is selected for verification, show verification view
  if (selectedPhotographer) {
    return (
      <div className="space-y-4 p-4">
        {/* Header with Back Button */}
        <div className="admin-card p-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedPhotographer(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to list"
            >
              <MdClose className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-base font-bold text-gray-900">Verify KliqChamp</h2>
              <p className="text-xs text-gray-600 mt-0.5">{selectedPhotographer.name}</p>
            </div>
          </div>
        </div>

        {/* Verification Content */}
        <div className="admin-card p-4">
          {/* Photographer Info Summary */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm">
            <div className="space-y-2">
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2 font-medium text-gray-900">{selectedPhotographer.email}</span>
              </div>
              <div>
                <span className="text-gray-600">Phone:</span>
                <span className="ml-2 font-medium text-gray-900">{selectedPhotographer.phone}</span>
              </div>
              <div>
                <span className="text-gray-600">Location:</span>
                <span className="ml-2 font-medium text-gray-900">{selectedPhotographer.location}</span>
              </div>
            </div>
          </div>

          {/* Verification Form */}
          <form className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-gray-900">Field Verification</h4>
              <button
                type="button"
                onClick={handleVerifyAllFields}
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium"
              >
                Verify All
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="admin-label text-sm">Name</label>
                  {selectedPhotographer.fieldVerification?.name ? (
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                  )}
                </div>
                <input
                  type="text"
                  value={selectedPhotographer.name}
                  readOnly
                  className="admin-input w-full bg-gray-50 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleFieldVerification('name')}
                  className={`w-full px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
                    selectedPhotographer.fieldVerification?.name
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {selectedPhotographer.fieldVerification?.name ? 'Verified' : 'Verify'}
                </button>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="admin-label text-sm">Email Address</label>
                  {selectedPhotographer.fieldVerification?.email ? (
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                  )}
                </div>
                <input
                  type="email"
                  value={selectedPhotographer.email}
                  readOnly
                  className="admin-input w-full bg-gray-50 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleFieldVerification('email')}
                  className={`w-full px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
                    selectedPhotographer.fieldVerification?.email
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {selectedPhotographer.fieldVerification?.email ? 'Verified' : 'Verify'}
                </button>
              </div>

              {/* Mobile Number Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="admin-label text-sm">Mobile Number</label>
                  {selectedPhotographer.fieldVerification?.mobileNumber ? (
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                  )}
                </div>
                <input
                  type="tel"
                  value={selectedPhotographer.phone}
                  readOnly
                  className="admin-input w-full bg-gray-50 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleFieldVerification('mobileNumber')}
                  className={`w-full px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
                    selectedPhotographer.fieldVerification?.mobileNumber
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {selectedPhotographer.fieldVerification?.mobileNumber ? 'Verified' : 'Verify'}
                </button>
              </div>

              {/* Aadhar Card Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="admin-label text-sm">Aadhar Card</label>
                  {selectedPhotographer.fieldVerification?.aadharCard ? (
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                  )}
                </div>
                <input
                  type="text"
                  value={selectedPhotographer.aadharCard || 'Not provided'}
                  readOnly
                  className="admin-input w-full bg-gray-50 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleFieldVerification('aadharCard')}
                  className={`w-full px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
                    selectedPhotographer.fieldVerification?.aadharCard
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {selectedPhotographer.fieldVerification?.aadharCard ? 'Verified' : 'Verify'}
                </button>
              </div>

              {/* PAN Card Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="admin-label text-sm">PAN Card</label>
                  {selectedPhotographer.fieldVerification?.panCard ? (
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                  )}
                </div>
                <input
                  type="text"
                  value={selectedPhotographer.panCard || 'Not provided'}
                  readOnly
                  className="admin-input w-full bg-gray-50 text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleFieldVerification('panCard')}
                  className={`w-full px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
                    selectedPhotographer.fieldVerification?.panCard
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {selectedPhotographer.fieldVerification?.panCard ? 'Verified' : 'Verify'}
                </button>
              </div>

              {/* Permanent Address Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="admin-label text-sm">Permanent Address</label>
                  {selectedPhotographer.fieldVerification?.permanentAddress ? (
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                  )}
                </div>
                <textarea
                  value={selectedPhotographer.permanentAddress || selectedPhotographer.location || 'Not provided'}
                  readOnly
                  rows={2}
                  className="admin-input w-full bg-gray-50 resize-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleFieldVerification('permanentAddress')}
                  className={`w-full px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
                    selectedPhotographer.fieldVerification?.permanentAddress
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {selectedPhotographer.fieldVerification?.permanentAddress ? 'Verified' : 'Verify'}
                </button>
              </div>

              {/* Temporary Address Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="admin-label text-sm">Temporary Address</label>
                  {selectedPhotographer.fieldVerification?.temporaryAddress ? (
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                  )}
                </div>
                <textarea
                  value={selectedPhotographer.temporaryAddress || 'Not provided'}
                  readOnly
                  rows={2}
                  className="admin-input w-full bg-gray-50 resize-none text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleFieldVerification('temporaryAddress')}
                  className={`w-full px-3 py-2 rounded-lg font-medium text-xs transition-colors ${
                    selectedPhotographer.fieldVerification?.temporaryAddress
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  {selectedPhotographer.fieldVerification?.temporaryAddress ? 'Verified' : 'Verify'}
                </button>
              </div>
            </div>
          </form>

          {/* Verification Summary */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-700">
                  Verification Progress
                </p>
                <p className="text-xs text-gray-600 mt-0.5">
                  {Object.values(selectedPhotographer.fieldVerification || {}).filter(v => v).length} of 7 fields verified
                </p>
              </div>
              {selectedPhotographer.isVerified && (
                <div className="flex items-center gap-1 text-green-700">
                  <MdCheckCircle className="w-4 h-4" />
                  <span className="font-medium text-xs">Fully Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Section 1: Header + Search */}
      <div className="admin-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">KliqChamps</h2>
            <p className="text-gray-600 text-xs mt-1">Verify and manage</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="admin-button-primary text-xs px-3 py-2 flex items-center shadow-sm"
          >
            <MdAdd className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
          />
        </div>
      </div>

      {/* Section 2: Tabs + Content */}
      <div className="admin-card p-4">
        {/* Tabs */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-2.5 px-3 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'pending'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Pending
            <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeTab === 'pending' 
                ? 'bg-orange-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}>
              {pendingCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('verified')}
            className={`flex-1 py-2.5 px-3 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'verified'
                ? 'bg-green-500 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Verified
            <span className={`ml-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${
              activeTab === 'verified' 
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}>
              {verifiedCount}
            </span>
          </button>
        </div>

        {/* Content - Photographers List */}
        <div className="space-y-3">
          {filteredPhotographers.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 text-base mb-2">No KliqChamps found</div>
              <p className="text-gray-500 text-xs">
                {activeTab === 'pending' 
                  ? 'All KliqChamps have been verified!'
                  : 'No verified KliqChamps yet.'}
              </p>
            </div>
          ) : (
            filteredPhotographers.map((photographer) => (
              <div key={photographer.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-3 mb-3">
                  <div className="relative flex-shrink-0">
                    <img
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-gray-200"
                      src={photographer.image}
                      alt={photographer.name}
                    />
                    {photographer.isVerified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                        <MdCheck className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{photographer.name}</h3>
                    <p className="text-xs text-gray-600 mb-0.5">{photographer.specialty}</p>
                    <p className="text-xs text-gray-500 mb-1">{photographer.location}</p>
                    <p className="text-xs text-gray-500">
                      {activeTab === 'pending' 
                        ? `Joined: ${new Date(photographer.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                        : photographer.verifiedAt 
                          ? `Verified: ${new Date(photographer.verifiedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                          : 'Verification date N/A'
                      }
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mb-3 pb-3 border-b border-gray-100">
                  <p className="text-xs text-gray-600 mb-0.5">{photographer.email}</p>
                  <p className="text-xs text-gray-500">{photographer.phone}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between gap-2">
                  {activeTab === 'pending' && !photographer.isVerified ? (
                    <button
                      onClick={() => handleVerifyPhotographer(photographer.id)}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-sm text-xs font-medium"
                    >
                      <MdCheckCircle className="w-4 h-4 mr-1.5" />
                      Verify KliqChamp
                    </button>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-green-600 text-xs font-medium py-2">
                      <MdCheckCircle className="w-4 h-4 mr-1" />
                      Verified
                    </div>
                  )}
                  <button
                    onClick={() => handleDeletePhotographer(photographer.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <MdDelete className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Photographer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">Add Kliqchamp</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="admin-label">Name *</label>
                <input
                  type="text"
                  value={newPhotographer.name}
                  onChange={(e) => setNewPhotographer({ ...newPhotographer, name: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter kliqchamp name"
                />
              </div>
              <div>
                <label className="admin-label">Email *</label>
                <input
                  type="email"
                  value={newPhotographer.email}
                  onChange={(e) => setNewPhotographer({ ...newPhotographer, email: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="admin-label">Phone</label>
                <input
                  type="tel"
                  value={newPhotographer.phone}
                  onChange={(e) => setNewPhotographer({ ...newPhotographer, phone: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="admin-label">Location</label>
                <input
                  type="text"
                  value={newPhotographer.location}
                  onChange={(e) => setNewPhotographer({ ...newPhotographer, location: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter location"
                />
              </div>
              <div>
                <label className="admin-label">Specialty</label>
                <input
                  type="text"
                  value={newPhotographer.specialty}
                  onChange={(e) => setNewPhotographer({ ...newPhotographer, specialty: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter specialty"
                />
              </div>
              <div>
                <label className="admin-label">Price</label>
                <input
                  type="text"
                  value={newPhotographer.price}
                  onChange={(e) => setNewPhotographer({ ...newPhotographer, price: e.target.value })}
                  className="admin-input w-full"
                  placeholder="e.g., ₹15,000"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2 p-4 border-t border-gray-200">
              <button
                onClick={handleAddPhotographer}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Add Kliqchamp
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
