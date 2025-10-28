'use client';

import { useState } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdClose,
  MdContentCopy,
  MdCalendarToday,
  MdAttachMoney,
  MdPercent,
  MdVisibility,
  MdVisibilityOff,
  MdExpandMore,
  MdChevronRight
} from 'react-icons/md';

interface Coupon {
  id: string;
  code: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  usageLimit?: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  applicableCategories?: string[];
  applicablePackages?: string[];
}

interface MobileCouponManagementProps {
  coupons: Coupon[];
  setCoupons: (coupons: Coupon[]) => void;
  onRefresh?: () => void;
}

export default function MobileCouponManagement({ coupons, setCoupons, onRefresh }: MobileCouponManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [expandedCoupons, setExpandedCoupons] = useState<string[]>([]);
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    name: '',
    description: '',
    type: 'percentage' as 'percentage' | 'fixed',
    value: 0,
    minOrderAmount: 0,
    maxDiscount: 0,
    usageLimit: 0,
    startDate: '',
    endDate: '',
    isActive: true,
    applicableCategories: [] as string[],
    applicablePackages: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const generateCouponCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCoupon({ ...newCoupon, code: result });
  };

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const toggleCouponExpansion = (couponId: string) => {
    setExpandedCoupons(prev => 
      prev.includes(couponId) 
        ? prev.filter(id => id !== couponId)
        : [...prev, couponId]
    );
  };

  const handleAddCoupon = async () => {
    if (newCoupon.code && newCoupon.name && newCoupon.value > 0) {
      setIsSubmitting(true);
      setError('');
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const coupon: Coupon = {
          id: Date.now().toString(),
          ...newCoupon,
          usedCount: 0
        };
        
        setCoupons([...coupons, coupon]);
        setNewCoupon({
          code: '',
          name: '',
          description: '',
          type: 'percentage',
          value: 0,
          minOrderAmount: 0,
          maxDiscount: 0,
          usageLimit: 0,
          startDate: '',
          endDate: '',
          isActive: true,
          applicableCategories: [],
          applicablePackages: []
        });
        setShowAddModal(false);
      } catch (err: any) {
        setError(err.message || 'Failed to create coupon');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setNewCoupon({
      code: coupon.code,
      name: coupon.name,
      description: coupon.description,
      type: coupon.type,
      value: coupon.value,
      minOrderAmount: coupon.minOrderAmount || 0,
      maxDiscount: coupon.maxDiscount || 0,
      usageLimit: coupon.usageLimit || 0,
      startDate: coupon.startDate,
      endDate: coupon.endDate,
      isActive: coupon.isActive,
      applicableCategories: coupon.applicableCategories || [],
      applicablePackages: coupon.applicablePackages || []
    });
    setShowEditModal(true);
  };

  const handleUpdateCoupon = async () => {
    if (selectedCoupon && newCoupon.code && newCoupon.name && newCoupon.value > 0) {
      setIsSubmitting(true);
      setError('');
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const updatedCoupons = coupons.map(coupon => 
          coupon.id === selectedCoupon.id 
            ? { ...coupon, ...newCoupon }
            : coupon
        );
        
        setCoupons(updatedCoupons);
        setShowEditModal(false);
        setSelectedCoupon(null);
        setNewCoupon({
          code: '',
          name: '',
          description: '',
          type: 'percentage',
          value: 0,
          minOrderAmount: 0,
          maxDiscount: 0,
          usageLimit: 0,
          startDate: '',
          endDate: '',
          isActive: true,
          applicableCategories: [],
          applicablePackages: []
        });
      } catch (err: any) {
        setError(err.message || 'Failed to update coupon');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleDeleteCoupon = (couponId: string) => {
    if (confirm('Are you sure you want to delete this coupon?')) {
      setCoupons(coupons.filter(coupon => coupon.id !== couponId));
    }
  };

  const toggleCouponStatus = (couponId: string) => {
    setCoupons(coupons.map(coupon => 
      coupon.id === couponId 
        ? { ...coupon, isActive: !coupon.isActive }
        : coupon
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  const getStatusColor = (coupon: Coupon) => {
    if (!coupon.isActive) return 'bg-gray-100 text-gray-600';
    if (isExpired(coupon.endDate)) return 'bg-red-100 text-red-600';
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return 'bg-orange-100 text-orange-600';
    return 'bg-green-100 text-green-600';
  };

  const getStatusText = (coupon: Coupon) => {
    if (!coupon.isActive) return 'Inactive';
    if (isExpired(coupon.endDate)) return 'Expired';
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) return 'Limit Reached';
    return 'Active';
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="admin-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Coupon Management</h2>
            <p className="text-gray-600 text-sm">Manage discount coupons</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="admin-button-primary text-sm px-3 py-2 flex items-center"
          >
            <MdAdd className="w-4 h-4 mr-1" />
            Create
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="admin-card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MdAttachMoney className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total</p>
              <p className="text-lg font-bold text-gray-900">{coupons.length}</p>
            </div>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <MdVisibility className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Active</p>
              <p className="text-lg font-bold text-gray-900">
                {coupons.filter(c => c.isActive && !isExpired(c.endDate)).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Coupons List */}
      <div className="space-y-3">
        {coupons.map((coupon) => (
          <div key={coupon.id} className="admin-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleCouponExpansion(coupon.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {expandedCoupons.includes(coupon.id) ? (
                    <MdExpandMore className="w-5 h-5 text-gray-500" />
                  ) : (
                    <MdChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {coupon.code.substring(0, 2)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">{coupon.name}</h3>
                  <div className="flex items-center">
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                      {coupon.code}
                    </code>
                    <button
                      onClick={() => copyToClipboard(coupon.code)}
                      className="ml-2 p-1 hover:bg-gray-200 rounded"
                      title="Copy code"
                    >
                      <MdContentCopy className="w-3 h-3 text-gray-400" />
                    </button>
                    {copiedCode === coupon.code && (
                      <span className="ml-2 text-xs text-green-600">Copied!</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => toggleCouponStatus(coupon.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    coupon.isActive 
                      ? 'text-orange-600 hover:bg-orange-50' 
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                  title={coupon.isActive ? 'Deactivate' : 'Activate'}
                >
                  {coupon.isActive ? <MdVisibilityOff className="w-4 h-4" /> : <MdVisibility className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => handleEditCoupon(coupon)}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Edit Coupon"
                >
                  <MdEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCoupon(coupon.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Coupon"
                >
                  <MdDelete className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Expanded Details */}
            {expandedCoupons.includes(coupon.id) && (
              <div className="mt-4 pl-8 border-l-2 border-gray-200">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Discount</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {coupon.type === 'percentage' ? (
                          <>
                            <span className="text-blue-600">{coupon.value}% OFF</span>
                            {coupon.maxDiscount > 0 && (
                              <span className="text-gray-500 ml-1">(Upto ₹{coupon.maxDiscount})</span>
                            )}
                          </>
                        ) : (
                          <span className="text-green-600">₹{coupon.value} OFF</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Usage</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {coupon.usedCount} / {coupon.usageLimit || '∞'}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Validity</p>
                    <p className="text-sm text-gray-900">
                      {formatDate(coupon.startDate)} - {formatDate(coupon.endDate)}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(coupon)}`}>
                      {getStatusText(coupon)}
                    </span>
                  </div>
                  
                  {coupon.description && (
                    <div>
                      <p className="text-xs text-gray-500">Description</p>
                      <p className="text-sm text-gray-900">{coupon.description}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {coupons.length === 0 && (
          <div className="text-center py-8">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <MdAttachMoney className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-2">No coupons created yet</h3>
            <p className="text-gray-500 text-sm mb-4">Start by creating your first discount coupon</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="admin-button-primary text-sm"
            >
              Create Your First Coupon
            </button>
          </div>
        )}
      </div>

      {/* Add Coupon Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Create New Coupon</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <div>
                <label className="admin-label">Coupon Code</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    className="admin-input flex-1"
                    placeholder="Enter coupon code"
                  />
                  <button
                    onClick={generateCouponCode}
                    className="admin-button-secondary text-sm"
                  >
                    Generate
                  </button>
                </div>
              </div>
              
              <div>
                <label className="admin-label">Coupon Name</label>
                <input
                  type="text"
                  value={newCoupon.name}
                  onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter coupon name"
                />
              </div>

              <div>
                <label className="admin-label">Description</label>
                <textarea
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  className="admin-input w-full h-16 resize-none"
                  placeholder="Enter coupon description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Type</label>
                  <select
                    value={newCoupon.type}
                    onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value as 'percentage' | 'fixed' })}
                    className="admin-input w-full"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                
                <div>
                  <label className="admin-label">
                    {newCoupon.type === 'percentage' ? 'Percentage' : 'Amount (₹)'}
                  </label>
                  <input
                    type="number"
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: parseFloat(e.target.value) || 0 })}
                    className="admin-input w-full"
                    placeholder={newCoupon.type === 'percentage' ? '10' : '100'}
                    min="0"
                    max={newCoupon.type === 'percentage' ? 100 : undefined}
                  />
                </div>
              </div>

              {newCoupon.type === 'percentage' && (
                <div>
                  <label className="admin-label">Maximum Discount (₹)</label>
                  <input
                    type="number"
                    value={newCoupon.maxDiscount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscount: parseFloat(e.target.value) || 0 })}
                    className="admin-input w-full"
                    placeholder="Upto ₹1000"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    20% off upto ₹1000
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Start Date</label>
                  <input
                    type="date"
                    value={newCoupon.startDate}
                    onChange={(e) => setNewCoupon({ ...newCoupon, startDate: e.target.value })}
                    className="admin-input w-full"
                  />
                </div>
                
                <div>
                  <label className="admin-label">End Date</label>
                  <input
                    type="date"
                    value={newCoupon.endDate}
                    onChange={(e) => setNewCoupon({ ...newCoupon, endDate: e.target.value })}
                    className="admin-input w-full"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActiveMobile"
                  checked={newCoupon.isActive}
                  onChange={(e) => setNewCoupon({ ...newCoupon, isActive: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActiveMobile" className="ml-2 block text-sm text-gray-900">
                  Active coupon
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="admin-button-secondary text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCoupon}
                disabled={isSubmitting}
                className="admin-button-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Coupon Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Edit Coupon</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              <div>
                <label className="admin-label">Coupon Code</label>
                <input
                  type="text"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="admin-input w-full"
                  placeholder="Enter coupon code"
                />
              </div>
              
              <div>
                <label className="admin-label">Coupon Name</label>
                <input
                  type="text"
                  value={newCoupon.name}
                  onChange={(e) => setNewCoupon({ ...newCoupon, name: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter coupon name"
                />
              </div>

              <div>
                <label className="admin-label">Description</label>
                <textarea
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  className="admin-input w-full h-16 resize-none"
                  placeholder="Enter coupon description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Type</label>
                  <select
                    value={newCoupon.type}
                    onChange={(e) => setNewCoupon({ ...newCoupon, type: e.target.value as 'percentage' | 'fixed' })}
                    className="admin-input w-full"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                
                <div>
                  <label className="admin-label">
                    {newCoupon.type === 'percentage' ? 'Percentage' : 'Amount (₹)'}
                  </label>
                  <input
                    type="number"
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: parseFloat(e.target.value) || 0 })}
                    className="admin-input w-full"
                    placeholder={newCoupon.type === 'percentage' ? '10' : '100'}
                    min="0"
                    max={newCoupon.type === 'percentage' ? 100 : undefined}
                  />
                </div>
              </div>

              {newCoupon.type === 'percentage' && (
                <div>
                  <label className="admin-label">Maximum Discount (₹)</label>
                  <input
                    type="number"
                    value={newCoupon.maxDiscount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, maxDiscount: parseFloat(e.target.value) || 0 })}
                    className="admin-input w-full"
                    placeholder="Upto ₹1000"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    20% off upto ₹1000
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="admin-label">Start Date</label>
                  <input
                    type="date"
                    value={newCoupon.startDate}
                    onChange={(e) => setNewCoupon({ ...newCoupon, startDate: e.target.value })}
                    className="admin-input w-full"
                  />
                </div>
                
                <div>
                  <label className="admin-label">End Date</label>
                  <input
                    type="date"
                    value={newCoupon.endDate}
                    onChange={(e) => setNewCoupon({ ...newCoupon, endDate: e.target.value })}
                    className="admin-input w-full"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActiveEditMobile"
                  checked={newCoupon.isActive}
                  onChange={(e) => setNewCoupon({ ...newCoupon, isActive: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActiveEditMobile" className="ml-2 block text-sm text-gray-900">
                  Active coupon
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="admin-button-secondary text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateCoupon}
                disabled={isSubmitting}
                className="admin-button-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Updating...' : 'Update'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
