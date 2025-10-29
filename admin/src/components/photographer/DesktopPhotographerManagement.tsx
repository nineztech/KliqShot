'use client';

import { useState } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdVisibility,
  MdSearch,
  MdFilterList,
  MdMoreVert,
  MdClose,
  MdCheck,
  MdCancel,
  MdCheckCircle
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

interface DesktopPhotographerManagementProps {
  photographers: Photographer[];
  setPhotographers: (photographers: Photographer[]) => void;
}

export default function DesktopPhotographerManagement({ photographers, setPhotographers }: DesktopPhotographerManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const handleEditPhotographer = (photographer: Photographer) => {
    setSelectedPhotographer(photographer);
    setNewPhotographer({
      name: photographer.name,
      email: photographer.email,
      phone: photographer.phone,
      location: photographer.location,
      specialty: photographer.specialty,
      rating: photographer.rating,
      reviews: photographer.reviews,
      price: photographer.price,
      experience: photographer.experience,
      image: photographer.image,
      status: photographer.status,
      categories: photographer.categories
    });
    setShowEditModal(true);
  };

  const handleUpdatePhotographer = () => {
    if (selectedPhotographer && newPhotographer.name && newPhotographer.email) {
      setPhotographers(photographers.map(photographer => 
        photographer.id === selectedPhotographer.id 
          ? { ...photographer, ...newPhotographer }
          : photographer
      ));
      setShowEditModal(false);
      setSelectedPhotographer(null);
    }
  };

  const handleDeletePhotographer = (photographerId: string) => {
    if (confirm('Are you sure you want to delete this kliqchamp?')) {
      setPhotographers(photographers.filter(photographer => photographer.id !== photographerId));
    }
  };

  const handleStatusChange = (photographerId: string, newStatus: 'active' | 'inactive' | 'pending') => {
    setPhotographers(photographers.map(photographer => 
      photographer.id === photographerId 
        ? { ...photographer, status: newStatus }
        : photographer
    ));
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
      <div className="space-y-4">
        {/* Header with Back Button */}
        <div className="admin-card">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSelectedPhotographer(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Back to list"
            >
              <MdClose className="w-6 h-6 text-gray-600" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Verify KliqChamp</h2>
              <p className="text-gray-600 text-sm mt-1">{selectedPhotographer.name}</p>
            </div>
          </div>
        </div>

        {/* Verification Content */}
        <div className="admin-card">
          <div className="p-6">
            {/* Photographer Info Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
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
                <div>
                  <span className="text-gray-600">Specialty:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedPhotographer.specialty}</span>
                </div>
              </div>
            </div>

            {/* Verification Form */}
            <form className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-base font-semibold text-gray-900">Field Verification</h4>
                <button
                  type="button"
                  onClick={handleVerifyAllFields}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Verify All
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="admin-label">Name</label>
                    {selectedPhotographer.fieldVerification?.name ? (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={selectedPhotographer.name}
                    readOnly
                    className="admin-input w-full bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => handleFieldVerification('name')}
                    className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedPhotographer.fieldVerification?.name
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {selectedPhotographer.fieldVerification?.name ? (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verify
                      </span>
                    )}
                  </button>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="admin-label">Email Address</label>
                    {selectedPhotographer.fieldVerification?.email ? (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                    )}
                  </div>
                  <input
                    type="email"
                    value={selectedPhotographer.email}
                    readOnly
                    className="admin-input w-full bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => handleFieldVerification('email')}
                    className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedPhotographer.fieldVerification?.email
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {selectedPhotographer.fieldVerification?.email ? (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verify
                      </span>
                    )}
                  </button>
                </div>

                {/* Mobile Number Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="admin-label">Mobile Number</label>
                    {selectedPhotographer.fieldVerification?.mobileNumber ? (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                    )}
                  </div>
                  <input
                    type="tel"
                    value={selectedPhotographer.phone}
                    readOnly
                    className="admin-input w-full bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => handleFieldVerification('mobileNumber')}
                    className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedPhotographer.fieldVerification?.mobileNumber
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {selectedPhotographer.fieldVerification?.mobileNumber ? (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verify
                      </span>
                    )}
                  </button>
                </div>

                {/* Aadhar Card Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="admin-label">Aadhar Card</label>
                    {selectedPhotographer.fieldVerification?.aadharCard ? (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={selectedPhotographer.aadharCard || 'Not provided'}
                    readOnly
                    className="admin-input w-full bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => handleFieldVerification('aadharCard')}
                    className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedPhotographer.fieldVerification?.aadharCard
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {selectedPhotographer.fieldVerification?.aadharCard ? (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verify
                      </span>
                    )}
                  </button>
                </div>

                {/* PAN Card Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="admin-label">PAN Card</label>
                    {selectedPhotographer.fieldVerification?.panCard ? (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={selectedPhotographer.panCard || 'Not provided'}
                    readOnly
                    className="admin-input w-full bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => handleFieldVerification('panCard')}
                    className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedPhotographer.fieldVerification?.panCard
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {selectedPhotographer.fieldVerification?.panCard ? (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verify
                      </span>
                    )}
                  </button>
                </div>

                {/* Permanent Address Field */}
                <div className="space-y-2 col-span-3">
                  <div className="flex items-center justify-between">
                    <label className="admin-label">Permanent Address</label>
                    {selectedPhotographer.fieldVerification?.permanentAddress ? (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                    )}
                  </div>
                  <textarea
                    value={selectedPhotographer.permanentAddress || selectedPhotographer.location || 'Not provided'}
                    readOnly
                    rows={2}
                    className="admin-input w-full bg-gray-50 resize-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleFieldVerification('permanentAddress')}
                    className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedPhotographer.fieldVerification?.permanentAddress
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {selectedPhotographer.fieldVerification?.permanentAddress ? (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verify
                      </span>
                    )}
                  </button>
                </div>

                {/* Temporary Address Field */}
                <div className="space-y-2 col-span-3">
                  <div className="flex items-center justify-between">
                    <label className="admin-label">Temporary Address</label>
                    {selectedPhotographer.fieldVerification?.temporaryAddress ? (
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">Verified</span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Pending</span>
                    )}
                  </div>
                  <textarea
                    value={selectedPhotographer.temporaryAddress || 'Not provided'}
                    readOnly
                    rows={2}
                    className="admin-input w-full bg-gray-50 resize-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleFieldVerification('temporaryAddress')}
                    className={`w-full px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      selectedPhotographer.fieldVerification?.temporaryAddress
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {selectedPhotographer.fieldVerification?.temporaryAddress ? (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verified
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-1">
                        <MdCheckCircle className="w-4 h-4" />
                        Verify
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Verification Summary */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Verification Progress
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {Object.values(selectedPhotographer.fieldVerification || {}).filter(v => v).length} of 7 fields verified
                  </p>
                </div>
                {selectedPhotographer.isVerified && (
                  <div className="flex items-center gap-2 text-green-700">
                    <MdCheckCircle className="w-5 h-5" />
                    <span className="font-medium text-sm">Fully Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Section 1: Header + Search */}
      <div className="admin-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">KliqChamp Management</h2>
            <p className="text-gray-600 text-sm mt-1">Verify and manage photographers on the platform</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-80">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
              />
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="admin-button-primary text-sm px-4 py-2 flex items-center shadow-sm hover:shadow-md transition-shadow whitespace-nowrap"
            >
              <MdAdd className="w-4 h-4 mr-2" />
              Add KliqChamp
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Tabs + Content */}
      <div className="admin-card">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('pending')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'pending'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending Verification
              <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                activeTab === 'pending' 
                  ? 'bg-orange-100 text-orange-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {pendingCount}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('verified')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'verified'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Verified
              <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                activeTab === 'verified' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {verifiedCount}
              </span>
            </button>
          </div>
        </div>

        {/* Content - Table */}
        {filteredPhotographers.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-sm mb-2">No KliqChamps found</div>
            <p className="text-gray-500 text-sm">
              {activeTab === 'pending' 
                ? 'All KliqChamps have been verified!'
                : 'No verified KliqChamps yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">KliqChamp</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Specialty</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    {activeTab === 'pending' ? 'Join Date' : 'Verified Date'}
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredPhotographers.map((photographer) => (
                  <tr key={photographer.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 relative">
                          <img
                            className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-200"
                            src={photographer.image}
                            alt={photographer.name}
                          />
                          {photographer.isVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
                              <MdCheck className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{photographer.name}</div>
                          <div className="text-xs text-gray-500">{photographer.location}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{photographer.email}</div>
                      <div className="text-xs text-gray-500">{photographer.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{photographer.specialty}</div>
                      <div className="text-xs text-gray-500">{photographer.experience}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-700">
                        {activeTab === 'pending' 
                          ? new Date(photographer.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                          : photographer.verifiedAt 
                            ? new Date(photographer.verifiedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                            : 'N/A'
                        }
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {activeTab === 'pending' && !photographer.isVerified && (
                          <button
                            onClick={() => handleVerifyPhotographer(photographer.id)}
                            className="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-sm hover:shadow-md text-xs font-medium"
                            title="Verify KliqChamp"
                          >
                            <MdCheckCircle className="w-4 h-4 mr-1" />
                            Verify
                          </button>
                        )}
                        {activeTab === 'verified' && (
                          <div className="flex items-center text-green-600 text-xs font-medium">
                            <MdCheckCircle className="w-4 h-4 mr-1" />
                            Verified
                          </div>
                        )}
                        <button
                          onClick={() => handleEditPhotographer(photographer)}
                          className="text-blue-600 hover:text-blue-800 p-1.5 hover:bg-blue-50 rounded transition-colors"
                          title="Edit"
                        >
                          <MdEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePhotographer(photographer.id)}
                          className="text-red-600 hover:text-red-800 p-1.5 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <MdDelete className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Photographer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">Add New Kliqchamp</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="admin-label">Experience</label>
                  <input
                    type="text"
                    value={newPhotographer.experience}
                    onChange={(e) => setNewPhotographer({ ...newPhotographer, experience: e.target.value })}
                    className="admin-input w-full"
                    placeholder="e.g., 5+ years"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="admin-label">Status</label>
                  <select
                    value={newPhotographer.status}
                    onChange={(e) => setNewPhotographer({ ...newPhotographer, status: e.target.value as 'active' | 'inactive' | 'pending' })}
                    className="admin-input w-full"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="admin-label">Profile Image URL</label>
                <input
                  type="url"
                  value={newPhotographer.image}
                  onChange={(e) => setNewPhotographer({ ...newPhotographer, image: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter image URL"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="admin-button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPhotographer}
                className="admin-button-primary"
              >
                Add Kliqchamp
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Photographer Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">Edit Kliqchamp</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="admin-label">Experience</label>
                  <input
                    type="text"
                    value={newPhotographer.experience}
                    onChange={(e) => setNewPhotographer({ ...newPhotographer, experience: e.target.value })}
                    className="admin-input w-full"
                    placeholder="e.g., 5+ years"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                <div>
                  <label className="admin-label">Status</label>
                  <select
                    value={newPhotographer.status}
                    onChange={(e) => setNewPhotographer({ ...newPhotographer, status: e.target.value as 'active' | 'inactive' | 'pending' })}
                    className="admin-input w-full"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="admin-label">Profile Image URL</label>
                <input
                  type="url"
                  value={newPhotographer.image}
                  onChange={(e) => setNewPhotographer({ ...newPhotographer, image: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter image URL"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="admin-button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePhotographer}
                className="admin-button-primary"
              >
                Update Kliqchamp
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
