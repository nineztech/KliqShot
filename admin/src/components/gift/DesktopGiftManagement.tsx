'use client';

import { useState } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdClose,
  MdCardGiftcard,
  MdVisibility,
  MdVisibilityOff,
  MdImage,
  MdContentCopy,
  MdCheck
} from 'react-icons/md';

interface Gift {
  id: string;
  name: string;
  giftCode: string;
  image?: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface DesktopGiftManagementProps {
  gifts: Gift[];
  setGifts: (gifts: Gift[]) => void;
  onRefresh?: () => void;
}

export default function DesktopGiftManagement({ gifts, setGifts, onRefresh }: DesktopGiftManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
  const [newGift, setNewGift] = useState({
    name: '',
    giftCode: '',
    image: '',
    startDate: '',
    endDate: '',
    isActive: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');
  const [copiedGiftId, setCopiedGiftId] = useState<string | null>(null);

  const generateGiftCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewGift({ ...newGift, giftCode: result });
  };

  const handleAddGift = async () => {
    if (newGift.name && newGift.giftCode && newGift.startDate && newGift.endDate) {
      setIsSubmitting(true);
      setError('');
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const gift: Gift = {
          id: Date.now().toString(),
          ...newGift,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        setGifts([...gifts, gift]);
        setNewGift({
          name: '',
          giftCode: '',
          image: '',
          startDate: '',
          endDate: '',
          isActive: true
        });
        setImagePreview('');
        setShowAddModal(false);
      } catch (err: any) {
        setError(err.message || 'Failed to create gift');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleEditGift = (gift: Gift) => {
    setSelectedGift(gift);
    setNewGift({
      name: gift.name,
      giftCode: gift.giftCode,
      image: gift.image || '',
      startDate: gift.startDate,
      endDate: gift.endDate,
      isActive: gift.isActive
    });
    setImagePreview(gift.image || '');
    setShowEditModal(true);
  };

  const handleUpdateGift = async () => {
    if (selectedGift && newGift.name && newGift.giftCode && newGift.startDate && newGift.endDate) {
      setIsSubmitting(true);
      setError('');
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const updatedGifts = gifts.map(gift => 
          gift.id === selectedGift.id 
            ? { 
                ...gift, 
                ...newGift, 
                updatedAt: new Date().toISOString() 
              }
            : gift
        );
        
        setGifts(updatedGifts);
        setShowEditModal(false);
        setSelectedGift(null);
        setNewGift({
          name: '',
          giftCode: '',
          image: '',
          startDate: '',
          endDate: '',
          isActive: true
        });
        setImagePreview('');
      } catch (err: any) {
        setError(err.message || 'Failed to update gift');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleDeleteGift = (giftId: string) => {
    if (confirm('Are you sure you want to delete this gift?')) {
      setGifts(gifts.filter(gift => gift.id !== giftId));
    }
  };

  const toggleGiftStatus = (giftId: string) => {
    setGifts(gifts.map(gift => 
      gift.id === giftId 
        ? { 
            ...gift, 
            isActive: !gift.isActive,
            updatedAt: new Date().toISOString()
          }
        : gift
    ));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Simulate upload
      try {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNewGift({ ...newGift, image: URL.createObjectURL(file) });
      } catch (err: any) {
        setError(err.message || 'Failed to upload image');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    // Handle YYYY-MM-DD format (from date input)
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleCopyGiftCode = (giftCode: string, giftId: string) => {
    navigator.clipboard.writeText(giftCode);
    setCopiedGiftId(giftId);
    setTimeout(() => setCopiedGiftId(null), 2000);
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="admin-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Gift Management</h2>
            <p className="text-gray-600">Manage rewards and gifts for your loyalty program</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="admin-button-primary text-sm px-3 py-2 flex items-center"
          >
            <MdAdd className="w-3 h-3 mr-1" />
            Add Gift
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="admin-card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <MdCardGiftcard className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Gifts</p>
              <p className="text-2xl font-bold text-gray-900">{gifts.length}</p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <MdVisibility className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Gifts</p>
              <p className="text-2xl font-bold text-gray-900">
                {gifts.filter(g => g.isActive).length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <MdVisibilityOff className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Inactive Gifts</p>
              <p className="text-2xl font-bold text-gray-900">
                {gifts.filter(g => !g.isActive).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gifts Table */}
      <div className="admin-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gift Name</th>
                <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Gift Code</th>
                <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Start Date</th>
                <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">End Date</th>
                <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {gifts.map((gift) => (
                <tr key={gift.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-4 py-1.5">
                    <div className="flex items-center gap-3">
                      {gift.image ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden">
                          <img
                            src={gift.image}
                            alt={gift.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <MdCardGiftcard className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <span className="text-sm font-semibold text-gray-900">{gift.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-1.5 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-900 font-mono">{gift.giftCode}</span>
                      <button
                        onClick={() => handleCopyGiftCode(gift.giftCode, gift.id)}
                        className={`p-1 rounded transition-colors ${
                          copiedGiftId === gift.id 
                            ? 'text-green-600 bg-green-50' 
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        }`}
                        title="Copy gift code"
                      >
                        {copiedGiftId === gift.id ? (
                          <MdCheck className="w-4 h-4" />
                        ) : (
                          <MdContentCopy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-1.5 whitespace-nowrap">
                    <span className="text-xs text-gray-500">{formatDate(gift.startDate)}</span>
                  </td>
                  <td className="px-4 py-1.5 whitespace-nowrap">
                    <span className="text-xs text-gray-500">{formatDate(gift.endDate)}</span>
                  </td>
                  <td className="px-4 py-1.5 whitespace-nowrap">
                    <button
                      onClick={() => toggleGiftStatus(gift.id)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        gift.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {gift.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-1.5 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditGift(gift)}
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <MdEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteGift(gift.id)}
                        className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
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

        {gifts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdCardGiftcard className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">No gift cards added yet</h3>
            <p className="text-gray-500 mb-4">Start by adding your first gift card</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="admin-button-primary"
            >
              Add Your First Gift
            </button>
          </div>
        )}
      </div>

      {/* Add Gift Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">Add New Gift</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <div>
                <label className="admin-label">Gift Name</label>
                <input
                  type="text"
                  value={newGift.name}
                  onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter gift card name"
                />
              </div>

              <div>
                <label className="admin-label">Gift Code <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGift.giftCode}
                    onChange={(e) => setNewGift({ ...newGift, giftCode: e.target.value })}
                    className="admin-input flex-1"
                    placeholder="Enter or generate gift code"
                    required
                  />
                  <button
                    type="button"
                    onClick={generateGiftCode}
                    className="admin-button-secondary whitespace-nowrap px-4 py-2"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="admin-label">Gift Card Image</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
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
                        alt="Gift preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setNewGift({ ...newGift, image: '' });
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="admin-label">Start Date</label>
                  <input
                    type="date"
                    value={newGift.startDate}
                    onChange={(e) => setNewGift({ ...newGift, startDate: e.target.value })}
                    className="admin-input w-full"
                  />
                </div>
                
                <div>
                  <label className="admin-label">End Date</label>
                  <input
                    type="date"
                    value={newGift.endDate}
                    onChange={(e) => setNewGift({ ...newGift, endDate: e.target.value })}
                    className="admin-input w-full"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActiveGift"
                  checked={newGift.isActive}
                  onChange={(e) => setNewGift({ ...newGift, isActive: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActiveGift" className="ml-2 block text-sm text-gray-900">
                  Active gift
                </label>
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
                onClick={handleAddGift}
                disabled={isSubmitting}
                className="admin-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding...' : 'Add Gift'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Gift Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">Edit Gift</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <div>
                <label className="admin-label">Gift Name</label>
                <input
                  type="text"
                  value={newGift.name}
                  onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter gift card name"
                />
              </div>

              <div>
                <label className="admin-label">Gift Code <span className="text-red-500">*</span></label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newGift.giftCode}
                    onChange={(e) => setNewGift({ ...newGift, giftCode: e.target.value })}
                    className="admin-input flex-1"
                    placeholder="Enter or generate gift code"
                    required
                  />
                  <button
                    type="button"
                    onClick={generateGiftCode}
                    className="admin-button-secondary whitespace-nowrap px-4 py-2"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div>
                <label className="admin-label">Gift Card Image</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
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
                        alt="Gift preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview('');
                          setNewGift({ ...newGift, image: '' });
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="admin-label">Start Date</label>
                  <input
                    type="date"
                    value={newGift.startDate}
                    onChange={(e) => setNewGift({ ...newGift, startDate: e.target.value })}
                    className="admin-input w-full"
                  />
                </div>
                
                <div>
                  <label className="admin-label">End Date</label>
                  <input
                    type="date"
                    value={newGift.endDate}
                    onChange={(e) => setNewGift({ ...newGift, endDate: e.target.value })}
                    className="admin-input w-full"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActiveGiftEdit"
                  checked={newGift.isActive}
                  onChange={(e) => setNewGift({ ...newGift, isActive: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActiveGiftEdit" className="ml-2 block text-sm text-gray-900">
                  Active gift
                </label>
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
                onClick={handleUpdateGift}
                disabled={isSubmitting}
                className="admin-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Updating...' : 'Update Gift'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
