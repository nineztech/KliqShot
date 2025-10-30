'use client';

import { useState, useEffect } from 'react';
import { MdArrowBack, MdAdd, MdDelete, MdSave, MdEdit, MdClose } from 'react-icons/md';
import { PackageGroup, SubPackage } from './FixedPackageTypes';

interface DesktopFixedPackageDetailManagementProps {
  packageData: PackageGroup;
  onBack: () => void;
  onSave: (updatedPackage: PackageGroup) => void;
}

export default function DesktopFixedPackageDetailManagement({
  packageData,
  onBack,
  onSave
}: DesktopFixedPackageDetailManagementProps) {
  const [localPackageData, setLocalPackageData] = useState<PackageGroup>(packageData);
  const [showAddSubPackage, setShowAddSubPackage] = useState(false);
  const [editingSubPackage, setEditingSubPackage] = useState<SubPackage | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const [subPackageFormData, setSubPackageFormData] = useState({
    name: '',
    selectedCategories: [] as string[],
    duration: '',
    totalPrice: 0,
    locations: [] as { country: string; state: string; district: string }[],
    isActive: true
  });
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  // Track selected districts from existing package data
  useEffect(() => {
    const districts = localPackageData.subPackages
      .flatMap(sp => sp.locations?.map(loc => loc.district) || [])
      .filter((d): d is string => !!d);
    setSelectedLocations(districts);
  }, [localPackageData]);

  // Mock categories - in real app, fetch from API
  const categories = [
    { id: '1', name: 'Wedding Photography' },
    { id: '2', name: 'Birthday Photography' },
    { id: '3', name: 'Corporate Events' },
    { id: '4', name: 'Pre-Wedding Shoot' },
    { id: '5', name: 'Baby Shower' },
  ];

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

  const handleSave = () => {
    onSave(localPackageData);
  };

  const handleAddSubPackage = () => {
    if (!subPackageFormData.name || subPackageFormData.selectedCategories.length === 0 || !subPackageFormData.duration || subPackageFormData.totalPrice <= 0) {
      return;
    }

    const selectedCategoryNames = subPackageFormData.selectedCategories.map(catId => 
      categories.find(c => c.id === catId)?.name || ''
    ).join(', ');

    const newSubPackage: SubPackage = {
      id: Date.now().toString(),
      name: subPackageFormData.name,
      categoryId: subPackageFormData.selectedCategories[0],
      categoryName: selectedCategoryNames,
      duration: subPackageFormData.duration,
      totalPrice: subPackageFormData.totalPrice,
      locations: subPackageFormData.locations,
      isActive: subPackageFormData.isActive
    };

    setLocalPackageData(prev => ({
      ...prev,
      subPackages: [...prev.subPackages, newSubPackage]
    }));

    // Track all selected districts
    subPackageFormData.locations.forEach(loc => {
      if (loc.district && !selectedLocations.includes(loc.district)) {
        setSelectedLocations([...selectedLocations, loc.district]);
      }
    });

    setShowAddSubPackage(false);
    resetSubPackageForm();
  };

  const handleUpdateSubPackage = () => {
    if (!editingSubPackage) return;

    const selectedCategoryNames = subPackageFormData.selectedCategories.map(catId => 
      categories.find(c => c.id === catId)?.name || ''
    ).join(', ');

    setLocalPackageData(prev => ({
      ...prev,
      subPackages: prev.subPackages.map(sp =>
        sp.id === editingSubPackage.id
          ? {
              ...sp,
              name: subPackageFormData.name,
              categoryId: subPackageFormData.selectedCategories[0],
              categoryName: selectedCategoryNames,
              duration: subPackageFormData.duration,
              totalPrice: subPackageFormData.totalPrice,
              locations: subPackageFormData.locations,
              isActive: subPackageFormData.isActive
            }
          : sp
      )
    }));

    setEditingSubPackage(null);
    resetSubPackageForm();
  };

  const handleDeleteSubPackage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this sub-package?')) {
      setLocalPackageData(prev => ({
        ...prev,
        subPackages: prev.subPackages.filter(sp => sp.id !== id)
      }));
    }
  };

  const openEditSubPackage = (subPackage: SubPackage) => {
    setEditingSubPackage(subPackage);
    setSubPackageFormData({
      name: subPackage.name,
      selectedCategories: subPackage.categoryId ? [subPackage.categoryId] : [],
      duration: subPackage.duration,
      totalPrice: subPackage.totalPrice,
      locations: subPackage.locations || [],
      isActive: subPackage.isActive
    });
    setShowAddSubPackage(true);
  };

  const cancelSubPackageEdit = () => {
    setEditingSubPackage(null);
    setShowAddSubPackage(false);
    resetSubPackageForm();
  };

  const resetSubPackageForm = () => {
    setSubPackageFormData({
      name: '',
      selectedCategories: [],
      duration: '',
      totalPrice: 0,
      locations: [],
      isActive: true
    });
    setSelectedCountries([]);
    setSelectedStates([]);
  };

  const handleCountryToggle = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    );
    setSelectedStates([]);
  };

  const handleStateToggle = (state: string) => {
    setSelectedStates(prev =>
      prev.includes(state) ? prev.filter(s => s !== state) : [...prev, state]
    );
  };

  const handleDistrictToggle = (district: string, country: string, state: string) => {
    const locationKey = `${country}-${state}-${district}`;
    const exists = subPackageFormData.locations.some(loc => 
      `${loc.country}-${loc.state}-${loc.district}` === locationKey
    );

    if (exists) {
      setSubPackageFormData({
        ...subPackageFormData,
        locations: subPackageFormData.locations.filter(loc => 
          `${loc.country}-${loc.state}-${loc.district}` !== locationKey
        )
      });
    } else {
      setSubPackageFormData({
        ...subPackageFormData,
        locations: [...subPackageFormData.locations, { country, state, district }]
      });
    }
  };

  const toggleCategorySelection = (categoryId: string) => {
    setSubPackageFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(id => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
    }));
  };

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
              <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${
                localPackageData.isActive 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {localPackageData.isActive ? 'Active' : 'Inactive'}
              </span>
              <span className="inline-block mt-1 ml-2 px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                Fixed Package
              </span>
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

        {/* Sub-Packages Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-semibold text-gray-900">Sub-Packages</h3>
              <p className="text-sm text-gray-500">Manage sub-packages for this package group</p>
            </div>
            <button
              onClick={() => {
                setEditingSubPackage(null);
                resetSubPackageForm();
                setShowAddSubPackage(true);
              }}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <MdAdd className="w-5 h-5" />
              <span>Add Sub-Package</span>
            </button>
          </div>

          {/* Sub-Packages Grid */}
          {localPackageData.subPackages && localPackageData.subPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {localPackageData.subPackages.map((subPackage) => (
                <div
                  key={subPackage.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">{subPackage.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        subPackage.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {subPackage.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => openEditSubPackage(subPackage)}
                        className="p-1 hover:bg-blue-50 rounded transition-colors"
                        title="Edit"
                      >
                        <MdEdit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubPackage(subPackage.id)}
                        className="p-1 hover:bg-red-50 rounded transition-colors"
                        title="Delete"
                      >
                        <MdDelete className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <p className="text-gray-900 font-medium">{subPackage.categoryName}</p>
                    </div>
                    {subPackage.locations && subPackage.locations.length > 0 && (
                      <div>
                        <span className="text-gray-500">Locations:</span>
                        <p className="text-gray-900 font-medium">
                          {subPackage.locations.map((loc, idx) => (
                            <span key={idx}>
                              {loc.district}, {loc.state}, {loc.country}
                              {idx < subPackage.locations.length - 1 && '; '}
                            </span>
                          ))}
                        </p>
                      </div>
                    )}
                    <div>
                      <span className="text-gray-500">Duration:</span>
                      <p className="text-gray-900 font-medium">{subPackage.duration}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Total Price:</span>
                      <p className="text-gray-900 font-bold text-lg">${subPackage.totalPrice}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
              No sub-packages yet. Click "Add Sub-Package" to create one.
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Sub-Package Form */}
      {showAddSubPackage && (
        <div className="admin-card mt-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-gray-900">
              {editingSubPackage ? 'Edit Sub-Package' : 'Add New Sub-Package'}
            </h3>
            <button
              onClick={cancelSubPackageEdit}
              className="text-gray-400 hover:text-gray-600"
            >
              <MdClose className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Package Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subPackageFormData.name}
                onChange={(e) => setSubPackageFormData({ ...subPackageFormData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Wedding Package"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={subPackageFormData.duration}
                onChange={(e) => setSubPackageFormData({ ...subPackageFormData, duration: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2 hours, 1 day"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={subPackageFormData.totalPrice}
                onChange={(e) => setSubPackageFormData({ ...subPackageFormData, totalPrice: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter total price"
                min="0"
                step="0.01"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={subPackageFormData.isActive}
                onChange={(e) => setSubPackageFormData({ ...subPackageFormData, isActive: e.target.checked })}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-3 text-sm font-medium text-gray-700">
                Active Package
              </label>
            </div>
          </div>

          {/* Location Selection */}
          <div className="mt-6 space-y-4">
            <h4 className="text-sm font-semibold text-gray-900">Location-Based Pricing</h4>
            
            {/* Country Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Countries <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {countries.map((country) => (
                  <label key={country} className="flex items-center p-2 border border-gray-200 rounded hover:bg-blue-100 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCountries.includes(country)}
                      onChange={() => handleCountryToggle(country)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{country}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* State Selection */}
            {selectedCountries.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select States <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {selectedCountries.map((country) =>
                    states[country as keyof typeof states]?.map((state) => (
                      <label key={state} className="flex items-center p-2 border border-gray-200 rounded hover:bg-blue-100 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStates.includes(state)}
                          onChange={() => handleStateToggle(state)}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">{state}</span>
                      </label>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* District Selection */}
            {selectedStates.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Districts <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                  {selectedStates.map((state) =>
                    districts[state as keyof typeof districts]?.map((district) => {
                      const country = Object.keys(states).find(c =>
                        states[c as keyof typeof states]?.includes(state)
                      ) || '';
                      const isSelected = subPackageFormData.locations.some(loc =>
                        loc.district === district && loc.state === state
                      );
                      
                      return (
                        <label key={district} className="flex items-center p-2 border border-gray-200 rounded hover:bg-blue-100 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleDistrictToggle(district, country, state)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-gray-700">{district}</span>
                        </label>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Display Selected Locations */}
            {subPackageFormData.locations.length > 0 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selected Locations ({subPackageFormData.locations.length}):
                </label>
                <div className="flex flex-wrap gap-2">
                  {subPackageFormData.locations.map((location, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {location.district}, {location.state}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Categories <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                  <input
                    type="checkbox"
                    checked={subPackageFormData.selectedCategories.includes(category.id)}
                    onChange={() => toggleCategorySelection(category.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="ml-3 text-sm text-gray-700 font-medium">{category.name}</span>
                </label>
              ))}
            </div>
            {subPackageFormData.selectedCategories.length > 0 && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Selected Categories:</strong> {subPackageFormData.selectedCategories.map(catId => 
                    categories.find(c => c.id === catId)?.name
                  ).join(', ')}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={cancelSubPackageEdit}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={editingSubPackage ? handleUpdateSubPackage : handleAddSubPackage}
              disabled={
                !subPackageFormData.name || 
                subPackageFormData.selectedCategories.length === 0 || 
                !subPackageFormData.duration || 
                subPackageFormData.totalPrice <= 0
              }
              className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {editingSubPackage ? 'Update' : 'Add'} Sub-Package
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
