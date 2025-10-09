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
  MdCancel
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

interface DesktopPhotographerManagementProps {
  photographers: Photographer[];
  setPhotographers: (photographers: Photographer[]) => void;
}

export default function DesktopPhotographerManagement({ photographers, setPhotographers }: DesktopPhotographerManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPhotographer, setSelectedPhotographer] = useState<Photographer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
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
    if (confirm('Are you sure you want to delete this photographer?')) {
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

  const filteredPhotographers = photographers.filter(photographer => {
    const matchesSearch = photographer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photographer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photographer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || photographer.status === statusFilter;
    return matchesSearch && matchesStatus;
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
    <div className="space-y-2">
      {/* Header and Filters Combined - All in One Line */}
      <div className="admin-card">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <h2 className="text-xl font-bold text-gray-900">KliqChamps Management</h2>
            <p className="text-gray-600 text-sm">Manage photographers on the platform</p>
          </div>
          
          <div className="flex-1 relative max-w-md">
            <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search KliqChamps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="admin-input min-w-[120px]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          
          <button className="admin-button-secondary text-sm px-3 py-2 flex items-center gap-2">
            <MdFilterList className="w-4 h-4" />
            Filters
          </button>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="admin-button-primary text-sm px-4 py-2.5 flex items-center gap-2 whitespace-nowrap"
          >
            <MdAdd className="w-4 h-4" />
            Add KliqChamp
          </button>
        </div>
      </div>

      {/* KliqChamps Table */}
      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photographer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPhotographers.map((photographer) => (
                <tr key={photographer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={photographer.image}
                          alt={photographer.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{photographer.name}</div>
                        <div className="text-sm text-gray-500">{photographer.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{photographer.email}</div>
                    <div className="text-sm text-gray-500">{photographer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{photographer.specialty}</div>
                    <div className="text-sm text-gray-500">{photographer.experience}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{photographer.rating}</span>
                      <span className="text-sm text-gray-500 ml-1">({photographer.reviews})</span>
                    </div>
                    <div className="text-sm text-gray-500">{photographer.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(photographer.status)}`}>
                      {photographer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditPhotographer(photographer)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <MdEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePhotographer(photographer.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete"
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                      <div className="relative">
                        <button
                          className="text-gray-600 hover:text-gray-900 p-1"
                          title="More actions"
                        >
                          <MdMoreVert className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add KliqChamp Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New KliqChamp</h3>
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
                    placeholder="Enter photographer name"
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
                Add KliqChamp
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
              <h3 className="text-lg font-semibold text-gray-900">Edit Photographer</h3>
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
                    placeholder="Enter photographer name"
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
                Update Photographer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
