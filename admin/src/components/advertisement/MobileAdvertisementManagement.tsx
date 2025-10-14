'use client';

import { useState } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete,
  MdClose,
  MdImage,
  MdToggleOn,
  MdToggleOff
} from 'react-icons/md';
import { Advertisement } from './index';

interface MobileAdvertisementManagementProps {
  advertisements: Advertisement[];
  setAdvertisements: (advertisements: Advertisement[]) => void;
  onRefresh?: () => void;
}

export default function MobileAdvertisementManagement({ advertisements, setAdvertisements, onRefresh }: MobileAdvertisementManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedAd, setSelectedAd] = useState<Advertisement | null>(null);
  const [newAd, setNewAd] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    position: 'banner' as 'banner' | 'sidebar' | 'homepage',
    isActive: true,
    startDate: '',
    endDate: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleAddAdvertisement = () => {
    if (newAd.title && newAd.description && newAd.image) {
      const advertisement: Advertisement = {
        id: Date.now().toString(),
        ...newAd
      };
      setAdvertisements([...advertisements, advertisement]);
      setNewAd({
        title: '',
        description: '',
        image: '',
        link: '',
        position: 'banner',
        isActive: true,
        startDate: '',
        endDate: ''
      });
      setImagePreview('');
      setShowAddModal(false);
    }
  };

  const handleEditAdvertisement = (ad: Advertisement) => {
    setSelectedAd(ad);
    setNewAd({
      title: ad.title,
      description: ad.description,
      image: ad.image,
      link: ad.link || '',
      position: ad.position,
      isActive: ad.isActive,
      startDate: ad.startDate,
      endDate: ad.endDate
    });
    setImagePreview(ad.image);
    setShowEditModal(true);
  };

  const handleUpdateAdvertisement = () => {
    if (selectedAd && newAd.title && newAd.description && newAd.image) {
      setAdvertisements(advertisements.map(ad => 
        ad.id === selectedAd.id 
          ? { ...selectedAd, ...newAd }
          : ad
      ));
      setShowEditModal(false);
      setSelectedAd(null);
      setNewAd({
        title: '',
        description: '',
        image: '',
        link: '',
        position: 'banner',
        isActive: true,
        startDate: '',
        endDate: ''
      });
      setImagePreview('');
    }
  };

  const handleDeleteAdvertisement = (adId: string) => {
    if (confirm('Are you sure you want to delete this advertisement?')) {
      setAdvertisements(advertisements.filter(ad => ad.id !== adId));
    }
  };

  const handleToggleActive = (adId: string) => {
    setAdvertisements(advertisements.map(ad => 
      ad.id === adId 
        ? { ...ad, isActive: !ad.isActive }
        : ad
    ));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setNewAd({ ...newAd, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const getPositionLabel = (position: string) => {
    switch(position) {
      case 'banner': return 'Banner';
      case 'sidebar': return 'Sidebar';
      case 'homepage': return 'Homepage';
      default: return position;
    }
  };

  const getPositionColor = (position: string) => {
    switch(position) {
      case 'banner': return 'bg-purple-100 text-purple-800';
      case 'sidebar': return 'bg-blue-100 text-blue-800';
      case 'homepage': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="admin-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Advertisements</h2>
            <p className="text-gray-600 text-sm">Manage platform advertisements</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="admin-button-primary text-sm px-3 py-2 flex items-center"
          >
            <MdAdd className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
      </div>

      {/* Advertisements List */}
      <div className="space-y-3">
        {advertisements.map((ad) => (
          <div key={ad.id} className="admin-card p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900 text-sm">{ad.title}</h3>
                  <button
                    onClick={() => handleToggleActive(ad.id)}
                    title={ad.isActive ? 'Active' : 'Inactive'}
                  >
                    {ad.isActive ? (
                      <MdToggleOn className="w-5 h-5 text-green-600" />
                    ) : (
                      <MdToggleOff className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPositionColor(ad.position)}`}>
                  {getPositionLabel(ad.position)}
                </span>
              </div>
              <div className="flex items-center space-x-1 ml-2">
                <button
                  onClick={() => handleEditAdvertisement(ad)}
                  className="p-1 text-gray-600 hover:bg-gray-50 rounded"
                  title="Edit"
                >
                  <MdEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteAdvertisement(ad.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="Delete"
                >
                  <MdDelete className="w-4 h-4" />
                </button>
              </div>
            </div>
            {ad.image && (
              <div className="w-full h-32 rounded-lg overflow-hidden border border-gray-200 mb-2">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <p className="text-xs text-gray-600 mb-2">{ad.description}</p>
            {ad.link && (
              <p className="text-xs text-blue-600 mb-2 truncate">Link: {ad.link}</p>
            )}
            <div className="flex flex-col space-y-1 text-xs text-gray-500">
              {ad.startDate && <span>Start: {new Date(ad.startDate).toLocaleDateString()}</span>}
              {ad.endDate && <span>End: {new Date(ad.endDate).toLocaleDateString()}</span>}
            </div>
          </div>
        ))}
        {advertisements.length === 0 && (
          <div className="admin-card p-4">
            <p className="text-gray-500 text-center py-8 text-sm">No advertisements added yet</p>
          </div>
        )}
      </div>

      {/* Add Advertisement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add Advertisement</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="admin-label">Title</label>
                <input
                  type="text"
                  value={newAd.title}
                  onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea
                  value={newAd.description}
                  onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                  className="admin-input w-full h-20 resize-none"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="admin-label">Link (Optional)</label>
                <input
                  type="text"
                  value={newAd.link}
                  onChange={(e) => setNewAd({ ...newAd, link: e.target.value })}
                  className="admin-input w-full"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="admin-label">Position</label>
                <select
                  value={newAd.position}
                  onChange={(e) => setNewAd({ ...newAd, position: e.target.value as 'banner' | 'sidebar' | 'homepage' })}
                  className="admin-input w-full"
                >
                  <option value="banner">Banner Ad</option>
                  <option value="sidebar">Sidebar Ad</option>
                  <option value="homepage">Homepage Ad</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Start Date</label>
                <input
                  type="date"
                  value={newAd.startDate}
                  onChange={(e) => setNewAd({ ...newAd, startDate: e.target.value })}
                  className="admin-input w-full"
                />
              </div>
              <div>
                <label className="admin-label">End Date</label>
                <input
                  type="date"
                  value={newAd.endDate}
                  onChange={(e) => setNewAd({ ...newAd, endDate: e.target.value })}
                  className="admin-input w-full"
                />
              </div>
              <div>
                <label className="admin-label">Advertisement Image</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors w-full">
                      <MdImage className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Choose Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="relative w-full h-32 border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Advertisement preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setImagePreview('');
                          setNewAd({ ...newAd, image: '' });
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2 p-4 border-t border-gray-200">
              <button
                onClick={handleAddAdvertisement}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Add Advertisement
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

      {/* Edit Advertisement Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Edit Advertisement</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="admin-label">Title</label>
                <input
                  type="text"
                  value={newAd.title}
                  onChange={(e) => setNewAd({ ...newAd, title: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea
                  value={newAd.description}
                  onChange={(e) => setNewAd({ ...newAd, description: e.target.value })}
                  className="admin-input w-full h-20 resize-none"
                  placeholder="Enter description"
                />
              </div>
              <div>
                <label className="admin-label">Link (Optional)</label>
                <input
                  type="text"
                  value={newAd.link}
                  onChange={(e) => setNewAd({ ...newAd, link: e.target.value })}
                  className="admin-input w-full"
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <label className="admin-label">Position</label>
                <select
                  value={newAd.position}
                  onChange={(e) => setNewAd({ ...newAd, position: e.target.value as 'banner' | 'sidebar' | 'homepage' })}
                  className="admin-input w-full"
                >
                  <option value="banner">Banner Ad</option>
                  <option value="sidebar">Sidebar Ad</option>
                  <option value="homepage">Homepage Ad</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Start Date</label>
                <input
                  type="date"
                  value={newAd.startDate}
                  onChange={(e) => setNewAd({ ...newAd, startDate: e.target.value })}
                  className="admin-input w-full"
                />
              </div>
              <div>
                <label className="admin-label">End Date</label>
                <input
                  type="date"
                  value={newAd.endDate}
                  onChange={(e) => setNewAd({ ...newAd, endDate: e.target.value })}
                  className="admin-input w-full"
                />
              </div>
              <div>
                <label className="admin-label">Advertisement Image</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors w-full">
                      <MdImage className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Choose Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {imagePreview && (
                    <div className="relative w-full h-32 border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Advertisement preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setImagePreview('');
                          setNewAd({ ...newAd, image: '' });
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2 p-4 border-t border-gray-200">
              <button
                onClick={handleUpdateAdvertisement}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Update Advertisement
              </button>
              <button
                onClick={() => setShowEditModal(false)}
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

