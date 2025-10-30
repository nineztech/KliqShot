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

interface DesktopPackageDetailManagementProps {
  packageData: Package;
  onBack: () => void;
  onSave: (updatedPackage: Package) => void;
}

export default function DesktopPackageDetailManagement({
  packageData,
  onBack,
  onSave
}: DesktopPackageDetailManagementProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [localPackageData, setLocalPackageData] = useState<Package>(packageData);
  const [loading, setLoading] = useState(true);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Record<string, string[]>>({});
  const [selectedStates, setSelectedStates] = useState<Record<string, string[]>>({});
  const [selectedDistricts, setSelectedDistricts] = useState<Record<string, string[]>>({});

  // Mock location data - in real app, fetch from API
  const countries = [
    'India', 'United States', 'United Kingdom', 'Canada', 'Australia'
  ];

  const states = {
    'India': ['Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat'],
    'United States': ['California', 'New York', 'Texas', 'Florida', 'Illinois'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia']
  };

  const districts = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad'],
    'Delhi': ['New Delhi', 'Central Delhi', 'North Delhi', 'South Delhi'],
    'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot']
  };

  // Fetch categories from API or use mock data
  useEffect(() => {
    fetchCategories();
    // Track selected districts from existing package data
    const districts = localPackageData.categoryPricing
      .flatMap(cp => cp.locations?.map(loc => loc.district) || [])
      .filter((d): d is string => !!d);
    setSelectedLocations(districts);
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

  const handleCountryToggle = (categoryId: string, country: string) => {
    setSelectedCountries(prev => ({
      ...prev,
      [categoryId]: prev[categoryId]?.includes(country)
        ? prev[categoryId].filter(c => c !== country)
        : [...(prev[categoryId] || []), country]
    }));
    // Clear states and districts when country changes
    setSelectedStates(prev => ({ ...prev, [categoryId]: [] }));
    setSelectedDistricts(prev => ({ ...prev, [categoryId]: [] }));
  };

  const handleStateToggle = (categoryId: string, state: string) => {
    setSelectedStates(prev => ({
      ...prev,
      [categoryId]: prev[categoryId]?.includes(state)
        ? prev[categoryId].filter(s => s !== state)
        : [...(prev[categoryId] || []), state]
    }));
    // Clear districts when state changes
    setSelectedDistricts(prev => ({ ...prev, [categoryId]: [] }));
  };

  const handleDistrictToggle = (categoryId: string, district: string, country: string, state: string) => {
    const currentDistricts = selectedDistricts[categoryId] || [];
    const isSelected = currentDistricts.includes(district);
    
    setSelectedDistricts(prev => ({
      ...prev,
      [categoryId]: isSelected
        ? prev[categoryId].filter(d => d !== district)
        : [...(prev[categoryId] || []), district]
    }));

    // Update the locations in the package data
    setLocalPackageData(prev => ({
      ...prev,
      categoryPricing: prev.categoryPricing.map(cp => {
        if (cp.categoryId === categoryId) {
          const locations = cp.locations || [];
          const locationKey = `${country}-${state}-${district}`;
          
          if (isSelected) {
            return {
              ...cp,
              locations: locations.filter(loc => `${loc.country}-${loc.state}-${loc.district}` !== locationKey)
            };
          } else {
            return {
              ...cp,
              locations: [...locations, { country, state, district }]
            };
          }
        }
        return cp;
      })
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
      <div className="p-4 md:p-8">
        <div className="admin-card">
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <div className="admin-card">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MdArrowBack className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{localPackageData.name}</h2>
              <p className="text-sm text-gray-600">{localPackageData.description}</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <MdSave className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>

        {/* Category Pricing Configuration */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-gray-900 mb-4">
            Configure Pricing & Features by Category
          </h3>

          {categories.map((category) => {
            const categoryPricing = getCategoryPricing(category.id);
            const isExpanded = expandedCategories.includes(category.id);

            return (
              <div key={category.id} className="border border-gray-200 rounded-lg overflow-hidden">
                {/* Category Header */}
                <div className="bg-gray-50 p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleCategoryExpansion(category.id)}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      {isExpanded ? (
                        <MdExpandMore className="w-5 h-5 text-gray-600" />
                      ) : (
                        <MdChevronRight className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{category.name}</h4>
                      <p className="text-sm text-gray-600">{category.description}</p>
                    </div>
                  </div>
                </div>

                {/* Category Details */}
                {isExpanded && (
                  <div className="p-4 space-y-4">
                    {/* Location Selection */}
                    <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                      <h5 className="text-sm font-semibold text-gray-900 mb-3">Location-Based Pricing</h5>
                      
                      {/* Country Selection */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Select Countries <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {countries.map((country) => (
                            <label key={country} className="flex items-center p-2 border border-gray-200 rounded hover:bg-blue-100 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedCountries[category.id]?.includes(country) || false}
                                onChange={() => handleCountryToggle(category.id, country)}
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <span className="ml-2 text-sm text-gray-700">{country}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* State Selection - only show for selected countries */}
                      {selectedCountries[category.id] && selectedCountries[category.id].length > 0 && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select States <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {selectedCountries[category.id].map((country) => 
                              states[country as keyof typeof states]?.map((state) => (
                                <label key={state} className="flex items-center p-2 border border-gray-200 rounded hover:bg-blue-100 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={selectedStates[category.id]?.includes(state) || false}
                                    onChange={() => handleStateToggle(category.id, state)}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="ml-2 text-sm text-gray-700">{state} ({country})</span>
                                </label>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                      {/* District Selection - only show for selected states */}
                      {selectedStates[category.id] && selectedStates[category.id].length > 0 && (
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Districts <span className="text-red-500">*</span>
                          </label>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                            {selectedStates[category.id].map((state) => 
                              districts[state as keyof typeof districts]?.map((district) => (
                                <label key={district} className="flex items-center p-2 border border-gray-200 rounded hover:bg-blue-100 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={categoryPricing?.locations?.some(loc => loc.district === district && loc.state === state) || false}
                                    onChange={() => {
                                      // Find the country for this state
                                      const country = Object.keys(states).find(c => 
                                        states[c as keyof typeof states]?.includes(state)
                                      ) || '';
                                      handleDistrictToggle(category.id, district, country, state);
                                    }}
                                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                  />
                                  <span className="ml-2 text-sm text-gray-700">{district}</span>
                                </label>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                      {/* Display Selected Locations */}
                      {categoryPricing?.locations && categoryPricing.locations.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Selected Locations ({categoryPricing.locations.length}):</label>
                          <div className="flex flex-wrap gap-2">
                            {categoryPricing.locations.map((location, idx) => (
                              <span key={idx} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                                {location.district}, {location.state}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Subcategories */}
                    {category.subCategories && category.subCategories.length > 0 && (
                      <div>
                        <h5 className="text-sm font-semibold text-gray-900 mb-3">Subcategories</h5>
                        <div className="space-y-3 pl-4">
                          {category.subCategories.map((subCategory) => {
                            const subCategoryPricing = categoryPricing?.subCategories?.find(
                              sc => sc.subCategoryId === subCategory.id
                            );

                            return (
                              <div key={subCategory.id} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                                <div className="flex items-center justify-between mb-3">
                                  <h6 className="font-medium text-gray-900">{subCategory.name}</h6>
                                  <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700">Price:</label>
                                    <input
                                      type="number"
                                      value={subCategoryPricing?.price || ''}
                                      onChange={(e) => updateSubCategoryPrice(category.id, subCategory.id, e.target.value ? parseFloat(e.target.value) : undefined)}
                                      className="w-20 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                      placeholder="0.00"
                                    />
                                  </div>
                                </div>

                                {/* Subcategory Features */}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-medium text-gray-700">Features</label>
                                    <button
                                      onClick={() => addSubCategoryFeature(category.id, subCategory.id)}
                                      className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                    >
                                      <MdAdd className="w-3 h-3" />
                                      Add
                                    </button>
                                  </div>
                                  <div className="space-y-2">
                                    {subCategoryPricing?.features.map((feature, idx) => (
                                      <div key={idx} className="flex gap-2">
                                        <input
                                          type="text"
                                          value={feature}
                                          onChange={(e) => updateSubCategoryFeatureAtIndex(category.id, subCategory.id, idx, e.target.value)}
                                          className="flex-1 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                          placeholder={`Feature ${idx + 1}`}
                                        />
                                        <button
                                          onClick={() => removeSubCategoryFeature(category.id, subCategory.id, idx)}
                                          className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                                        >
                                          <MdDelete className="w-4 h-4" />
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
