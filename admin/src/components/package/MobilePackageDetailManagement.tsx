'use client';

import { useState, useEffect } from 'react';
import { MdArrowBack, MdAdd, MdDelete, MdExpandMore, MdChevronRight, MdSave } from 'react-icons/md';
import { Package, CategoryPricing } from './index';

interface Category {
  id: string;
  name: string;
  description: string;
  subCategories: {
    id: string;
    name: string;
  }[];
}

interface MobilePackageDetailManagementProps {
  packageData: Package;
  onBack: () => void;
  onSave: (updatedPackage: Package) => void;
}

export default function MobilePackageDetailManagement({
  packageData,
  onBack,
  onSave
}: MobilePackageDetailManagementProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
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

      // Initialize category pricing if not already present
      if (!localPackageData.categoryPricing || localPackageData.categoryPricing.length === 0) {
        const initialPricing: CategoryPricing[] = mockCategories.map(cat => ({
          categoryId: cat.id,
          categoryName: cat.name,
          price: undefined,
          features: [],
          subCategories: cat.subCategories.map(sub => ({
            subCategoryId: sub.id,
            subCategoryName: sub.name,
            price: undefined,
            features: []
          }))
        }));
        
        setLocalPackageData({
          ...localPackageData,
          categoryPricing: initialPricing
        });
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const updateCategoryPrice = (categoryId: string, price: number | undefined) => {
    setLocalPackageData(prev => ({
      ...prev,
      categoryPricing: prev.categoryPricing.map(cp =>
        cp.categoryId === categoryId ? { ...cp, price } : cp
      )
    }));
  };

  const updateCategoryFeatures = (categoryId: string, features: string[]) => {
    setLocalPackageData(prev => ({
      ...prev,
      categoryPricing: prev.categoryPricing.map(cp =>
        cp.categoryId === categoryId ? { ...cp, features } : cp
      )
    }));
  };

  const addCategoryFeature = (categoryId: string) => {
    setLocalPackageData(prev => ({
      ...prev,
      categoryPricing: prev.categoryPricing.map(cp =>
        cp.categoryId === categoryId 
          ? { ...cp, features: [...cp.features, ''] }
          : cp
      )
    }));
  };

  const updateCategoryFeatureAtIndex = (categoryId: string, index: number, value: string) => {
    setLocalPackageData(prev => ({
      ...prev,
      categoryPricing: prev.categoryPricing.map(cp => {
        if (cp.categoryId === categoryId) {
          const newFeatures = [...cp.features];
          newFeatures[index] = value;
          return { ...cp, features: newFeatures };
        }
        return cp;
      })
    }));
  };

  const removeCategoryFeature = (categoryId: string, index: number) => {
    setLocalPackageData(prev => ({
      ...prev,
      categoryPricing: prev.categoryPricing.map(cp =>
        cp.categoryId === categoryId
          ? { ...cp, features: cp.features.filter((_, i) => i !== index) }
          : cp
      )
    }));
  };

  const updateSubCategoryPrice = (categoryId: string, subCategoryId: string, price: number | undefined) => {
    setLocalPackageData(prev => ({
      ...prev,
      categoryPricing: prev.categoryPricing.map(cp => {
        if (cp.categoryId === categoryId && cp.subCategories) {
          return {
            ...cp,
            subCategories: cp.subCategories.map(sc =>
              sc.subCategoryId === subCategoryId ? { ...sc, price } : sc
            )
          };
        }
        return cp;
      })
    }));
  };

  const updateSubCategoryFeatures = (categoryId: string, subCategoryId: string, features: string[]) => {
    setLocalPackageData(prev => ({
      ...prev,
      categoryPricing: prev.categoryPricing.map(cp => {
        if (cp.categoryId === categoryId && cp.subCategories) {
          return {
            ...cp,
            subCategories: cp.subCategories.map(sc =>
              sc.subCategoryId === subCategoryId ? { ...sc, features } : sc
            )
          };
        }
        return cp;
      })
    }));
  };

  const addSubCategoryFeature = (categoryId: string, subCategoryId: string) => {
    setLocalPackageData(prev => ({
      ...prev,
      categoryPricing: prev.categoryPricing.map(cp => {
        if (cp.categoryId === categoryId && cp.subCategories) {
          return {
            ...cp,
            subCategories: cp.subCategories.map(sc =>
              sc.subCategoryId === subCategoryId
                ? { ...sc, features: [...sc.features, ''] }
                : sc
            )
          };
        }
        return cp;
      })
    }));
  };

  const updateSubCategoryFeatureAtIndex = (
    categoryId: string,
    subCategoryId: string,
    index: number,
    value: string
  ) => {
    setLocalPackageData(prev => ({
      ...prev,
      categoryPricing: prev.categoryPricing.map(cp => {
        if (cp.categoryId === categoryId && cp.subCategories) {
          return {
            ...cp,
            subCategories: cp.subCategories.map(sc => {
              if (sc.subCategoryId === subCategoryId) {
                const newFeatures = [...sc.features];
                newFeatures[index] = value;
                return { ...sc, features: newFeatures };
              }
              return sc;
            })
          };
        }
        return cp;
      })
    }));
  };

  const removeSubCategoryFeature = (categoryId: string, subCategoryId: string, index: number) => {
    setLocalPackageData(prev => ({
      ...prev,
      categoryPricing: prev.categoryPricing.map(cp => {
        if (cp.categoryId === categoryId && cp.subCategories) {
          return {
            ...cp,
            subCategories: cp.subCategories.map(sc =>
              sc.subCategoryId === subCategoryId
                ? { ...sc, features: sc.features.filter((_, i) => i !== index) }
                : sc
            )
          };
        }
        return cp;
      })
    }));
  };

  const handleSave = () => {
    onSave(localPackageData);
  };

  const getCategoryPricing = (categoryId: string) => {
    return localPackageData.categoryPricing.find(cp => cp.categoryId === categoryId);
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
              <h2 className="text-base font-bold text-gray-900 truncate">{localPackageData.name}</h2>
              <p className="text-xs text-gray-600 truncate">{localPackageData.description}</p>
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

        {/* Category Pricing Configuration */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Configure Pricing & Features by Category
          </h3>

          {categories.map((category) => {
            const categoryPricing = getCategoryPricing(category.id);
            const isExpanded = expandedCategories.includes(category.id);

            return (
              <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Category Header */}
                <div className="bg-gray-50 p-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCategoryExpansion(category.id)}
                      className="p-1 hover:bg-gray-200 rounded flex-shrink-0"
                    >
                      {isExpanded ? (
                        <MdExpandMore className="w-4 h-4 text-gray-600" />
                      ) : (
                        <MdChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm truncate">{category.name}</h4>
                      <p className="text-xs text-gray-600 truncate">{category.description}</p>
                    </div>
                  </div>
                </div>

                {/* Category Details */}
                {isExpanded && (
                  <div className="p-3 space-y-3">

                    {/* Subcategories */}
                    {category.subCategories && category.subCategories.length > 0 && (
                      <div>
                        <h5 className="text-xs font-semibold text-gray-900 mb-2">Subcategories</h5>
                        <div className="space-y-2">
                          {category.subCategories.map((subCategory) => {
                            const subCategoryPricing = categoryPricing?.subCategories?.find(
                              sc => sc.subCategoryId === subCategory.id
                            );

                            return (
                              <div key={subCategory.id} className="border border-gray-200 rounded-lg p-2 bg-gray-50">
                                <div className="flex items-center justify-between mb-2">
                                  <h6 className="font-medium text-gray-900 text-xs truncate flex-1">{subCategory.name}</h6>
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    <label className="text-xs font-medium text-gray-700">Price:</label>
                                    <input
                                      type="number"
                                      value={subCategoryPricing?.price || ''}
                                      onChange={(e) => updateSubCategoryPrice(category.id, subCategory.id, e.target.value ? parseFloat(e.target.value) : undefined)}
                                      className="w-16 px-1 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                                      placeholder="0.00"
                                    />
                                  </div>
                                </div>

                                {/* Subcategory Features */}
                                <div>
                                  <div className="flex items-center justify-between mb-1">
                                    <label className="text-xs font-medium text-gray-700">Features</label>
                                    <button
                                      onClick={() => addSubCategoryFeature(category.id, subCategory.id)}
                                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                    >
                                      <MdAdd className="w-3 h-3" />
                                      Add
                                    </button>
                                  </div>
                                  <div className="space-y-1">
                                    {subCategoryPricing?.features.map((feature, idx) => (
                                      <div key={idx} className="flex gap-1">
                                        <input
                                          type="text"
                                          value={feature}
                                          onChange={(e) => updateSubCategoryFeatureAtIndex(category.id, subCategory.id, idx, e.target.value)}
                                          className="flex-1 px-2 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs"
                                          placeholder={`Feature ${idx + 1}`}
                                        />
                                        <button
                                          onClick={() => removeSubCategoryFeature(category.id, subCategory.id, idx)}
                                          className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded transition-colors"
                                        >
                                          <MdDelete className="w-3 h-3" />
                                        </button>
                                      </div>
                                    ))}
                                    {(!subCategoryPricing?.features || subCategoryPricing.features.length === 0) && (
                                      <p className="text-xs text-gray-500 italic">No features added</p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
