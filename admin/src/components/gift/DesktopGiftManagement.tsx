'use client';

import { useState } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdClose,
  MdCardGiftcard,
  MdAttachMoney,
  MdInventory,
  MdVisibility,
  MdVisibilityOff,
  MdImage,
  MdCategory
} from 'react-icons/md';

interface Gift {
  id: string;
  name: string;
  description: string;
  image?: string;
  category: string;
  pointsRequired: number;
  stock: number;
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
    description: '',
    image: '',
    category: '',
    pointsRequired: 0,
    stock: 0,
    isActive: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const categories = [
    'Electronics',
    'Home & Living',
    'Fashion',
    'Beauty & Health',
    'Sports & Fitness',
    'Books & Media',
    'Food & Beverages',
    'Travel & Experiences',
    'Gift Cards',
    'Other'
  ];

  const handleAddGift = async () => {
    if (newGift.name && newGift.category && newGift.pointsRequired > 0) {
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
          description: '',
          image: '',
          category: '',
          pointsRequired: 0,
          stock: 0,
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
      description: gift.description,
      image: gift.image || '',
      category: gift.category,
      pointsRequired: gift.pointsRequired,
      stock: gift.stock,
      isActive: gift.isActive
    });
    setImagePreview(gift.image || '');
    setShowEditModal(true);
  };

  const handleUpdateGift = async () => {
    if (selectedGift && newGift.name && newGift.category && newGift.pointsRequired > 0) {
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
          description: '',
          image: '',
          category: '',
          pointsRequired: 0,
          stock: 0,
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'bg-red-100 text-red-600', text: 'Out of Stock' };
    if (stock < 10) return { color: 'bg-orange-100 text-orange-600', text: 'Low Stock' };
    return { color: 'bg-green-100 text-green-600', text: 'In Stock' };
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
              <MdInventory className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Stock</p>
              <p className="text-2xl font-bold text-gray-900">
                {gifts.reduce((sum, g) => sum + g.stock, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <MdAttachMoney className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Points</p>
              <p className="text-2xl font-bold text-gray-900">
                {gifts.length > 0 ? Math.round(gifts.reduce((sum, g) => sum + g.pointsRequired, 0) / gifts.length) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gifts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gifts.map((gift) => {
          const stockStatus = getStockStatus(gift.stock);
          return (
            <div key={gift.id} className="admin-card">
              <div className="relative">
                {gift.image ? (
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={gift.image}
                      alt={gift.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                    <MdCardGiftcard className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                
                <div className="absolute top-2 right-2 flex space-x-1">
                  <button
                    onClick={() => toggleGiftStatus(gift.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      gift.isActive 
                        ? 'text-orange-600 hover:bg-orange-50 bg-white/80' 
                        : 'text-green-600 hover:bg-green-50 bg-white/80'
                    }`}
                    title={gift.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {gift.isActive ? <MdVisibilityOff className="w-4 h-4" /> : <MdVisibility className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => handleEditGift(gift)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors bg-white/80"
                    title="Edit Gift"
                  >
                    <MdEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteGift(gift.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors bg-white/80"
                    title="Delete Gift"
                  >
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{gift.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <MdCategory className="w-4 h-4 mr-1" />
                    {gift.category}
                  </div>
                </div>
                
                {gift.description && (
                  <p className="text-gray-600 text-sm line-clamp-2">{gift.description}</p>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MdAttachMoney className="w-4 h-4 text-purple-600 mr-1" />
                    <span className="font-semibold text-purple-600">{gift.pointsRequired} pts</span>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${stockStatus.color}`}>
                    {stockStatus.text}
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Stock: {gift.stock}</span>
                  <span>Updated: {formatDate(gift.updatedAt)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {gifts.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCardGiftcard className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No gifts added yet</h3>
          <p className="text-gray-500 mb-4">Start by adding your first reward gift</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="admin-button-primary"
          >
            Add Your First Gift
          </button>
        </div>
      )}

      {/* Add Gift Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Add New Gift</h3>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="admin-label">Gift Name</label>
                  <input
                    type="text"
                    value={newGift.name}
                    onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
                    className="admin-input w-full"
                    placeholder="Enter gift name"
                  />
                </div>
                
                <div>
                  <label className="admin-label">Category</label>
                  <select
                    value={newGift.category}
                    onChange={(e) => setNewGift({ ...newGift, category: e.target.value })}
                    className="admin-input w-full"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="admin-label">Description</label>
                <textarea
                  value={newGift.description}
                  onChange={(e) => setNewGift({ ...newGift, description: e.target.value })}
                  className="admin-input w-full h-20 resize-none"
                  placeholder="Enter gift description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="admin-label">Points Required</label>
                  <input
                    type="number"
                    value={newGift.pointsRequired}
                    onChange={(e) => setNewGift({ ...newGift, pointsRequired: parseInt(e.target.value) || 0 })}
                    className="admin-input w-full"
                    placeholder="100"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="admin-label">Stock Quantity</label>
                  <input
                    type="number"
                    value={newGift.stock}
                    onChange={(e) => setNewGift({ ...newGift, stock: parseInt(e.target.value) || 0 })}
                    className="admin-input w-full"
                    placeholder="10"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="admin-label">Gift Image</label>
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
              <h3 className="text-xl font-semibold text-gray-900">Edit Gift</h3>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="admin-label">Gift Name</label>
                  <input
                    type="text"
                    value={newGift.name}
                    onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
                    className="admin-input w-full"
                    placeholder="Enter gift name"
                  />
                </div>
                
                <div>
                  <label className="admin-label">Category</label>
                  <select
                    value={newGift.category}
                    onChange={(e) => setNewGift({ ...newGift, category: e.target.value })}
                    className="admin-input w-full"
                  >
                    <option value="">Select category</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="admin-label">Description</label>
                <textarea
                  value={newGift.description}
                  onChange={(e) => setNewGift({ ...newGift, description: e.target.value })}
                  className="admin-input w-full h-20 resize-none"
                  placeholder="Enter gift description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="admin-label">Points Required</label>
                  <input
                    type="number"
                    value={newGift.pointsRequired}
                    onChange={(e) => setNewGift({ ...newGift, pointsRequired: parseInt(e.target.value) || 0 })}
                    className="admin-input w-full"
                    placeholder="100"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="admin-label">Stock Quantity</label>
                  <input
                    type="number"
                    value={newGift.stock}
                    onChange={(e) => setNewGift({ ...newGift, stock: parseInt(e.target.value) || 0 })}
                    className="admin-input w-full"
                    placeholder="10"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="admin-label">Gift Image</label>
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
