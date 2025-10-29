'use client';

import { useState } from 'react';
import { MdAdd, MdSettings, MdDelete, MdClose } from 'react-icons/md';
import { Package } from './index';

interface DesktopPackageManagementProps {
  packages: Package[];
  setPackages: (packages: Package[]) => void;
  onRefresh?: () => void;
  onConfigurePackage?: (pkg: Package) => void;
}

export default function DesktopPackageManagement({ 
  packages, 
  setPackages, 
  onRefresh,
  onConfigurePackage
}: DesktopPackageManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });

  const handleAddPackage = () => {
    const newPackage: Package = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      isActive: formData.isActive,
      categoryPricing: []
    };
    setPackages([...packages, newPackage]);
    setShowAddModal(false);
    resetForm();
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  const handleConfigurePackage = (pkg: Package) => {
    if (onConfigurePackage) {
      onConfigurePackage(pkg);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      isActive: true
    });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="admin-card">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Package Management</h2>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <MdAdd className="w-5 h-5" />
            <span>Add Package</span>
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleConfigurePackage(pkg)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900">{pkg.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Click to configure pricing & features</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  pkg.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {pkg.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MdSettings className="w-4 h-4" />
                  <span>
                    {pkg.categoryPricing?.length || 0} categories configured
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Individual Pricing
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConfigurePackage(pkg);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors"
                >
                  <MdSettings className="w-4 h-4" />
                  <span>Configure</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePackage(pkg.id);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition-colors"
                >
                  <MdDelete className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No packages found
          </div>
        )}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-base font-bold text-gray-900">Add New Package</h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter package name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter package description"
                />
              </div>


              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Active Package
                </label>
              </div>

              <div className="p-3 rounded-lg bg-green-50">
                <p className="text-sm text-green-800">
                  Individual Pricing: Configure pricing and features for each category and subcategory separately.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPackage}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add Package
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

