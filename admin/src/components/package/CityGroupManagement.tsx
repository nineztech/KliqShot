'use client';

import { useState, useEffect } from 'react';
import { MdArrowBack, MdAdd, MdDelete, MdSettings, MdClose, MdLocationOn, MdGroup, MdVisibility } from 'react-icons/md';

interface CityGroup {
  id: string;
  name: string;
  description: string;
  locations: {
    country: string;
    state: string;
    district: string;
  }[];
  isActive: boolean;
}

interface Package {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  cityGroups: CityGroup[];
}

interface CityGroupManagementProps {
  packageData: Package;
  onBack: () => void;
  onConfigureGroup: (packageData: Package, groupId: string) => void;
  onSave: (updatedPackage: Package) => void;
}

export default function CityGroupManagement({
  packageData,
  onBack,
  onConfigureGroup,
  onSave
}: CityGroupManagementProps) {
  const [localPackageData, setLocalPackageData] = useState<Package>(packageData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });
  const [selectedLocations, setSelectedLocations] = useState<{
    country: string;
    state: string;
    district: string;
  }[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [previewGroup, setPreviewGroup] = useState<CityGroup | null>(null);

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

  useEffect(() => {
    // Initialize cityGroups if not present
    if (!localPackageData.cityGroups) {
      setLocalPackageData({
        ...localPackageData,
        cityGroups: []
      });
    }
  }, []);

  const handleCountryToggle = (country: string) => {
    setSelectedCountries(prev =>
      prev.includes(country)
        ? prev.filter(c => c !== country)
        : [...prev, country]
    );
    // Clear states when country changes
    setSelectedStates([]);
    setSelectedLocations([]);
  };

  const handleStateToggle = (state: string) => {
    setSelectedStates(prev =>
      prev.includes(state)
        ? prev.filter(s => s !== state)
        : [...prev, state]
    );
    setSelectedLocations([]);
  };

  const handleDistrictToggle = (district: string, country: string, state: string) => {
    const location = { country, state, district };
    const locationKey = `${country}-${state}-${district}`;
    
    setSelectedLocations(prev => {
      const exists = prev.some(loc => 
        `${loc.country}-${loc.state}-${loc.district}` === locationKey
      );
      
      if (exists) {
        return prev.filter(loc => 
          `${loc.country}-${loc.state}-${loc.district}` !== locationKey
        );
      } else {
        return [...prev, location];
      }
    });
  };

  const handleAddCityGroup = () => {
    if (!formData.name.trim() || selectedLocations.length === 0) {
      alert('Please provide a group name and select at least one location.');
      return;
    }

    const newCityGroup: CityGroup = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      locations: selectedLocations,
      isActive: formData.isActive
    };

    const updatedPackage = {
      ...localPackageData,
      cityGroups: [...(localPackageData.cityGroups || []), newCityGroup]
    };

    setLocalPackageData(updatedPackage);
    onSave(updatedPackage);
    setShowAddModal(false);
    resetForm();
  };

  const handleDeleteCityGroup = (groupId: string) => {
    if (window.confirm('Are you sure you want to delete this city group?')) {
      const updatedPackage = {
        ...localPackageData,
        cityGroups: localPackageData.cityGroups?.filter(group => group.id !== groupId) || []
      };
      setLocalPackageData(updatedPackage);
      onSave(updatedPackage);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      isActive: true
    });
    setSelectedLocations([]);
    setSelectedCountries([]);
    setSelectedStates([]);
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
              <h2 className="text-2xl font-bold text-gray-900">City Groups</h2>
              <p className="text-sm text-gray-600">{localPackageData.name} - Configure location-based pricing groups</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <MdAdd className="w-5 h-5" />
            <span>Add City Group</span>
          </button>
        </div>

        {/* City Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localPackageData.cityGroups?.map((group) => (
            <div
              key={group.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MdGroup className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{group.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  group.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {group.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Location Summary */}
              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <MdLocationOn className="w-4 h-4" />
                  <span>{group.locations.length} locations configured</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {group.locations.slice(0, 3).map((location, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                      {location.district}
                    </span>
                  ))}
                  {group.locations.length > 3 && (
                    <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{group.locations.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPreviewGroup(group)}
                    title="Preview"
                    className="inline-flex items-center gap-1 px-2.5 py-1 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-md text-xs"
                  >
                    <MdVisibility className="w-3.5 h-3.5" />
                    <span>Preview</span>
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onConfigureGroup(localPackageData, group.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 border border-blue-200 text-blue-700 hover:bg-blue-50 rounded-md text-xs"
                  >
                    <MdSettings className="w-3.5 h-3.5" />
                    <span>Configure</span>
                  </button>
                  <button
                    onClick={() => handleDeleteCityGroup(group.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 border border-red-200 text-red-700 hover:bg-red-50 rounded-md text-xs"
                  >
                    <MdDelete className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {(!localPackageData.cityGroups || localPackageData.cityGroups.length === 0) && (
          <div className="text-center py-12">
            <MdGroup className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No City Groups Configured</h3>
            <p className="text-gray-500 mb-6">Create city groups to organize your pricing by location</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors mx-auto"
            >
              <MdAdd className="w-5 h-5" />
              <span>Add Your First City Group</span>
            </button>
          </div>
        )}
      </div>

      {/* Add City Group Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-white/10">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Add New City Group</h3>
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

            {/* Modal Content */}
            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto">
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Group Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Metro Cities, Tier-1 Cities"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief description of this group"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm font-medium text-gray-700">
                    Active Group
                  </label>
                </div>

                {/* Location Selection */}
                <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-gray-900 mb-4">Select Locations</h5>
                  
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
                    <div className="mb-4">
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
                              <span className="ml-2 text-sm text-gray-700">{state} ({country})</span>
                            </label>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* District Selection */}
                  {selectedStates.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Districts <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-60 overflow-y-auto">
                        {selectedStates.map((state) => 
                          districts[state as keyof typeof districts]?.map((district) => {
                            const country = Object.keys(states).find(c => 
                              states[c as keyof typeof states]?.includes(state)
                            ) || '';
                            const isSelected = selectedLocations.some(loc => 
                              loc.district === district && loc.state === state && loc.country === country
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

                  {/* Selected Locations Display */}
                  {selectedLocations.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Selected Locations ({selectedLocations.length}):
                      </label>
                      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                        {selectedLocations.map((location, idx) => (
                          <span key={idx} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {location.district}, {location.state}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-gray-200">
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
                onClick={handleAddCityGroup}
                disabled={!formData.name.trim() || selectedLocations.length === 0}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Add City Group
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewGroup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-sm bg-white/10">
          <div className="bg-white rounded-xl shadow-xl ring-1 ring-black/5 w-full max-w-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50">
                  <MdGroup className="w-3.5 h-3.5 text-blue-600" />
                </span>
                <h4 className="text-base font-semibold text-gray-900">{previewGroup.name}</h4>
                <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-medium ${previewGroup.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>{previewGroup.isActive ? 'Active' : 'Inactive'}</span>
              </div>
              <button onClick={() => setPreviewGroup(null)} className="text-gray-400 hover:text-gray-600">
                <MdClose className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-gray-600">{previewGroup.description || 'No description provided.'}</p>
              <div className="rounded-lg border border-gray-100 p-3 bg-gray-50/50">
                <div className="flex items-center gap-1.5 text-xs text-gray-600 mb-2">
                  <MdLocationOn className="w-3.5 h-3.5" />
                  <span>{previewGroup.locations.length} locations</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {previewGroup.locations.map((l, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100 text-[10px]">
                      {l.district}, {l.state}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-3 bg-gray-50 border-t border-gray-100">
              <button onClick={() => setPreviewGroup(null)} className="px-3 py-1.5 text-xs border border-gray-200 rounded-md hover:bg-white text-gray-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
