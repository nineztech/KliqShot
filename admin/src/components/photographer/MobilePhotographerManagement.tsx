'use client';

import { useState } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdSearch,
  MdClose
} from 'react-icons/md';

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
}

interface MobilePhotographerManagementProps {
  photographers: Photographer[];
  setPhotographers: (photographers: Photographer[]) => void;
}

export default function MobilePhotographerManagement({ photographers, setPhotographers }: MobilePhotographerManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredPhotographers = photographers.filter(photographer => {
    return photographer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
           photographer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           photographer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="admin-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Kliqchamps</h2>
            <p className="text-gray-600 text-sm">Manage kliqchamps</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="admin-button-primary text-sm px-3 py-2"
          >
            <MdAdd className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="admin-card p-4">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search kliqchamps..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input pl-10 w-full"
          />
        </div>
      </div>

      {/* Photographers List */}
      <div className="space-y-3">
        {filteredPhotographers.map((photographer) => (
          <div key={photographer.id} className="admin-card p-4">
            <div className="flex items-start space-x-3">
              <img
                className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                src={photographer.image}
                alt={photographer.name}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{photographer.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(photographer.status)}`}>
                    {photographer.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{photographer.specialty}</p>
                <p className="text-xs text-gray-500 mb-2">{photographer.location}</p>
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-600">
                    <span className="font-medium">{photographer.rating}</span> ({photographer.reviews} reviews)
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDeletePhotographer(photographer.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <MdDelete className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Photographer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add Kliqchamp</h3>
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
