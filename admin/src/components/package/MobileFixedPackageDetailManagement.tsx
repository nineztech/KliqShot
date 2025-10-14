'use client';

import { useState, useEffect } from 'react';
import { MdArrowBack, MdAdd, MdDelete, MdSave, MdCheck } from 'react-icons/md';
import { Package } from './index';

interface Category {
  id: string;
  name: string;
  description: string;
  subCategories: {
    id: string;
    name: string;
  }[];
}

interface MobileFixedPackageDetailManagementProps {
  packageData: Package;
  onBack: () => void;
  onSave: (updatedPackage: Package) => void;
}

export default function MobileFixedPackageDetailManagement({
  packageData,
  onBack,
  onSave
}: MobileFixedPackageDetailManagementProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [localPackageData, setLocalPackageData] = useState<Package>(packageData);
  const [loading, setLoading] = useState(true);

  // Fetch categories from API or use mock data
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // TODO: Replace with actual API call
      // For now using mock data
      const mockCategories: Category[] = [
        {
          id: '1',
          name: 'Wedding Photography',
          description: 'Professional wedding photography services',
          subCategories: [
            { id: '1-1', name: 'Engagement Shoot' },
            { id: '1-2', name: 'Ceremony Coverage' },
            { id: '1-3', name: 'Reception Coverage' }
          ]
        },
        {
          id: '2',
          name: 'Portrait Photography',
          description: 'Professional portrait photography',
          subCategories: [
            { id: '2-1', name: 'Individual Portraits' },
            { id: '2-2', name: 'Family Portraits' },
            { id: '2-3', name: 'Business Headshots' }
          ]
        },
        {
          id: '3',
          name: 'Event Photography',
          description: 'Event and corporate photography',
          subCategories: [
            { id: '3-1', name: 'Corporate Events' },
            { id: '3-2', name: 'Birthday Parties' },
            { id: '3-3', name: 'Conferences' }
          ]
        }
      ];

      setCategories(mockCategories);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const updateFixedPrice = (price: number | undefined) => {
    setLocalPackageData(prev => ({
      ...prev,
      fixedPrice: price
    }));
  };

  const toggleSubCategory = (subCategoryId: string, subCategoryName: string, categoryId: string, categoryName: string) => {
    const currentSelection = localPackageData.selectedSubCategories || [];
    const isSelected = currentSelection.some(sc => sc.subCategoryId === subCategoryId);
    
    if (isSelected) {
      // Remove subcategory
      setLocalPackageData(prev => ({
        ...prev,
        selectedSubCategories: currentSelection.filter(sc => sc.subCategoryId !== subCategoryId)
      }));
    } else {
      // Add subcategory
      setLocalPackageData(prev => ({
        ...prev,
        selectedSubCategories: [...currentSelection, {
          subCategoryId,
          subCategoryName,
          categoryId,
          categoryName
        }]
      }));
    }
  };

  const addFeature = () => {
    setLocalPackageData(prev => ({
      ...prev,
      features: [...(prev.features || []), '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setLocalPackageData(prev => ({
      ...prev,
      features: prev.features?.map((feature, i) => i === index ? value : feature) || []
    }));
  };

  const removeFeature = (index: number) => {
    setLocalPackageData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSave = () => {
    onSave(localPackageData);
  };

  const isSubCategorySelected = (subCategoryId: string) => {
    return localPackageData.selectedSubCategories?.some(sc => sc.subCategoryId === subCategoryId) || false;
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="admin-card">
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500 text-sm">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="admin-card">
        {/* Header */}
        <div className="mb-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MdArrowBack className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 truncate">{localPackageData.name}</h2>
              <p className="text-xs text-gray-600 truncate">{localPackageData.description}</p>
              <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                Fixed Package
              </span>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors"
          >
            <MdSave className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>

        {/* Fixed Price Configuration */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fixed Package Price ($)
            </label>
            <input
              type="number"
              value={localPackageData.fixedPrice || ''}
              onChange={(e) => updateFixedPrice(e.target.value ? parseFloat(e.target.value) : undefined)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
            />
          </div>

          {/* Category Selection */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-3">
              Select Categories & Subcategories
            </h3>
            <div className="space-y-3">
              {categories.map((category) => (
                <div key={category.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-900 text-sm">{category.name}</h4>
                    <p className="text-xs text-gray-600">{category.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {category.subCategories.map((subCategory) => {
                      const isSelected = isSubCategorySelected(subCategory.id);
                      
                      return (
                        <div
                          key={subCategory.id}
                          onClick={() => toggleSubCategory(subCategory.id, subCategory.name, category.id, category.name)}
                          className={`p-2 border-2 rounded-lg cursor-pointer transition-all ${
                            isSelected
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
                              {subCategory.name}
                            </span>
                            {isSelected && (
                              <MdCheck className="w-4 h-4 text-blue-600" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Package Features */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">Package Features</label>
              <button
                onClick={addFeature}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
              >
                <MdAdd className="w-3 h-3" />
                Add
              </button>
            </div>
            <div className="space-y-2">
              {localPackageData.features?.map((feature, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(idx, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder={`Feature ${idx + 1}`}
                  />
                  <button
                    onClick={() => removeFeature(idx)}
                    className="px-2 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                  >
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {(!localPackageData.features || localPackageData.features.length === 0) && (
                <div className="text-center py-6 text-gray-500 italic bg-gray-50 rounded-lg">
                  <p className="text-xs">No features added yet. Click "Add" to get started.</p>
                </div>
              )}
            </div>
          </div>

          {/* Selected Subcategories Summary */}
          {localPackageData.selectedSubCategories && localPackageData.selectedSubCategories.length > 0 && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <h4 className="font-semibold text-blue-900 text-sm mb-2">
                Selected Subcategories ({localPackageData.selectedSubCategories.length})
              </h4>
              <div className="space-y-1">
                {localPackageData.selectedSubCategories.map((subCat) => (
                  <div key={subCat.subCategoryId} className="text-xs text-blue-800">
                    • {subCat.categoryName} - {subCat.subCategoryName}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
