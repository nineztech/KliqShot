'use client';

import { useState } from 'react';
import { MdAdd, MdEdit, MdDelete, MdClose, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { PackageGroup, SubPackage } from './FixedPackageTypes';

interface MobileFixedPackageManagementProps {
  packageGroups: PackageGroup[];
  setPackageGroups: (groups: PackageGroup[]) => void;
}

export default function MobileFixedPackageManagement({ 
  packageGroups, 
  setPackageGroups 
}: MobileFixedPackageManagementProps) {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<PackageGroup | null>(null);
  const [editingSubPackage, setEditingSubPackage] = useState<SubPackage | null>(null);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [showAddSubPackageForGroup, setShowAddSubPackageForGroup] = useState<string | null>(null);
  
  const [groupFormData, setGroupFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });

  const [subPackageFormData, setSubPackageFormData] = useState({
    name: '',
    selectedCategories: [] as string[],
    duration: '',
    totalPrice: 0,
    isActive: true
  });

  // Mock categories - in real app, fetch from API
  const categories = [
    { id: '1', name: 'Wedding Photography' },
    { id: '2', name: 'Birthday Photography' },
    { id: '3', name: 'Corporate Events' },
    { id: '4', name: 'Pre-Wedding Shoot' },
    { id: '5', name: 'Baby Shower' },
  ];

  const handleAddGroup = () => {
    const newGroup: PackageGroup = {
      id: Date.now().toString(),
      name: groupFormData.name,
      description: groupFormData.description,
      isActive: groupFormData.isActive,
      subPackages: []
    };
    setPackageGroups([...packageGroups, newGroup]);
    setShowGroupModal(false);
    resetGroupForm();
  };

  const handleUpdateGroup = () => {
    if (!editingGroup) return;
    
    setPackageGroups(packageGroups.map(group => 
      group.id === editingGroup.id 
        ? { ...group, ...groupFormData }
        : group
    ));
    setShowGroupModal(false);
    setEditingGroup(null);
    resetGroupForm();
  };

  const handleDeleteGroup = (id: string) => {
    if (window.confirm('Are you sure you want to delete this package group? All sub-packages will be deleted.')) {
      setPackageGroups(packageGroups.filter(group => group.id !== id));
    }
  };

  const handleAddSubPackage = (groupId: string) => {
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
      isActive: subPackageFormData.isActive
    };

    setPackageGroups(packageGroups.map(group =>
      group.id === groupId
        ? { ...group, subPackages: [...group.subPackages, newSubPackage] }
        : group
    ));

    setShowAddSubPackageForGroup(null);
    resetSubPackageForm();
  };

  const handleUpdateSubPackage = (groupId: string) => {
    if (!editingSubPackage) return;

    const selectedCategoryNames = subPackageFormData.selectedCategories.map(catId => 
      categories.find(c => c.id === catId)?.name || ''
    ).join(', ');
    
    setPackageGroups(packageGroups.map(group =>
      group.id === groupId
        ? {
            ...group,
            subPackages: group.subPackages.map(sp =>
              sp.id === editingSubPackage.id
                ? { 
                    ...sp, 
                    name: subPackageFormData.name,
                    categoryId: subPackageFormData.selectedCategories[0],
                    categoryName: selectedCategoryNames,
                    duration: subPackageFormData.duration,
                    totalPrice: subPackageFormData.totalPrice,
                    isActive: subPackageFormData.isActive
                  }
                : sp
            )
          }
        : group
    ));

    setEditingSubPackage(null);
    resetSubPackageForm();
  };

  const handleDeleteSubPackage = (groupId: string, subPackageId: string) => {
    if (window.confirm('Are you sure you want to delete this sub-package?')) {
      setPackageGroups(packageGroups.map(group =>
        group.id === groupId
          ? { ...group, subPackages: group.subPackages.filter(sp => sp.id !== subPackageId) }
          : group
      ));
    }
  };

  const openEditGroupModal = (group: PackageGroup) => {
    setEditingGroup(group);
    setGroupFormData({
      name: group.name,
      description: group.description,
      isActive: group.isActive
    });
    setShowGroupModal(true);
  };

  const openAddSubPackageInline = (groupId: string) => {
    // Auto-expand the group when adding sub-package
    const newExpanded = new Set(expandedGroups);
    newExpanded.add(groupId);
    setExpandedGroups(newExpanded);
    
    setShowAddSubPackageForGroup(groupId);
    setEditingSubPackage(null);
    resetSubPackageForm();
  };

  const openEditSubPackageInline = (groupId: string, subPackage: SubPackage) => {
    // Auto-expand the group when editing sub-package
    const newExpanded = new Set(expandedGroups);
    newExpanded.add(groupId);
    setExpandedGroups(newExpanded);
    
    setEditingSubPackage(subPackage);
    setSubPackageFormData({
      name: subPackage.name,
      selectedCategories: subPackage.categoryId ? [subPackage.categoryId] : [],
      duration: subPackage.duration,
      totalPrice: subPackage.totalPrice,
      isActive: subPackage.isActive
    });
  };

  const cancelSubPackageEdit = () => {
    setEditingSubPackage(null);
    setShowAddSubPackageForGroup(null);
    resetSubPackageForm();
  };

  const toggleGroupExpanded = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const resetGroupForm = () => {
    setGroupFormData({
      name: '',
      description: '',
      isActive: true
    });
  };

  const resetSubPackageForm = () => {
    setSubPackageFormData({
      name: '',
      selectedCategories: [],
      duration: '',
      totalPrice: 0,
      isActive: true
    });
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
    <div className="p-4">
      <div className="admin-card">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Fixed Package Management</h2>
          <p className="text-xs text-gray-500 mb-4">Create package groups and add sub-packages</p>
          <button
            onClick={() => {
              setEditingGroup(null);
              resetGroupForm();
              setShowGroupModal(true);
            }}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <MdAdd className="w-5 h-5" />
            <span>Add Package Group</span>
          </button>
        </div>

        {/* Package Groups List */}
        <div className="space-y-3">
          {packageGroups.map((group) => (
            <div
              key={group.id}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Group Header */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-gray-900">{group.name}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        group.isActive 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {group.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs mb-2">{group.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-medium">
                        {group.subPackages.length} Sub-package{group.subPackages.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleGroupExpanded(group.id)}
                    className="p-1 hover:bg-white/50 rounded transition-colors"
                  >
                    {expandedGroups.has(group.id) ? (
                      <MdExpandLess className="w-5 h-5 text-gray-600" />
                    ) : (
                      <MdExpandMore className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditGroupModal(group)}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1.5 rounded text-xs transition-colors"
                  >
                    <MdEdit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteGroup(group.id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded text-xs transition-colors"
                  >
                    <MdDelete className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                  <button
                    onClick={() => openAddSubPackageInline(group.id)}
                    className="flex-1 flex items-center justify-center gap-1 bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded text-xs transition-colors"
                  >
                    <MdAdd className="w-3.5 h-3.5" />
                    <span>Add Sub</span>
                  </button>
                </div>
              </div>

              {/* Sub-packages */}
              {expandedGroups.has(group.id) && (
                <div className="p-3 bg-white">
                  {group.subPackages.length > 0 ? (
                    <div className="space-y-3">
                      {group.subPackages.map((subPackage) => (
                        <div
                          key={subPackage.id}
                          className="border border-gray-200 rounded-lg p-3"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-sm mb-1">{subPackage.name}</h4>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                subPackage.isActive 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {subPackage.isActive ? 'Active' : 'Inactive'}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <button
                                onClick={() => openEditSubPackageInline(group.id, subPackage)}
                                className="p-1 hover:bg-blue-50 rounded transition-colors"
                              >
                                <MdEdit className="w-4 h-4 text-blue-600" />
                              </button>
                              <button
                                onClick={() => handleDeleteSubPackage(group.id, subPackage.id)}
                                className="p-1 hover:bg-red-50 rounded transition-colors"
                              >
                                <MdDelete className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="space-y-1 text-xs">
                            <div>
                              <span className="text-gray-500">Category:</span>
                              <p className="text-gray-900 font-medium">{subPackage.categoryName}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Duration:</span>
                              <p className="text-gray-900 font-medium">{subPackage.duration}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Total Price:</span>
                              <p className="text-gray-900 font-bold text-base">${subPackage.totalPrice}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500 text-sm">
                      No sub-packages yet. Click "Add Sub-Package" to create one.
                    </div>
                  )}
                </div>
              )}

            </div>
          ))}
        </div>

        {packageGroups.length === 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            No package groups found
          </div>
        )}
      </div>

      {/* Standalone Add/Edit Sub-Package Form */}
      {(showAddSubPackageForGroup || editingSubPackage) && (
        <div className="mt-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">
                {editingSubPackage ? 'Edit Sub-Package' : 'Add New Sub-Package'}
              </h4>
              <button
                onClick={cancelSubPackageEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
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

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Categories <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
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

            <div className="flex gap-3 mt-6">
              <button
                onClick={cancelSubPackageEdit}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => editingSubPackage ? handleUpdateSubPackage(editingSubPackage ? packageGroups.find(g => g.subPackages.some(sp => sp.id === editingSubPackage.id))?.id || '' : '') : handleAddSubPackage(showAddSubPackageForGroup || '')}
                disabled={
                  !subPackageFormData.name || 
                  subPackageFormData.selectedCategories.length === 0 || 
                  !subPackageFormData.duration || 
                  subPackageFormData.totalPrice <= 0
                }
                className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {editingSubPackage ? 'Update' : 'Add'} Sub-Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Group Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                {editingGroup ? 'Edit Package Group' : 'Add Package Group'}
              </h3>
              <button
                onClick={() => {
                  setShowGroupModal(false);
                  setEditingGroup(null);
                  resetGroupForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Group Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={groupFormData.name}
                  onChange={(e) => setGroupFormData({ ...groupFormData, name: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Basic, Premium"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={groupFormData.description}
                  onChange={(e) => setGroupFormData({ ...groupFormData, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Describe this package group"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={groupFormData.isActive}
                  onChange={(e) => setGroupFormData({ ...groupFormData, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-xs font-medium text-gray-700">
                  Active Group
                </label>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => {
                  setShowGroupModal(false);
                  setEditingGroup(null);
                  resetGroupForm();
                }}
                className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingGroup ? handleUpdateGroup : handleAddGroup}
                disabled={!groupFormData.name || !groupFormData.description}
                className="flex-1 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingGroup ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

