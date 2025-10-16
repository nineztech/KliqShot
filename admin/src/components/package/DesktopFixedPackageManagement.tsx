'use client';

import { useState } from 'react';
import { MdAdd, MdSettings, MdDelete, MdClose } from 'react-icons/md';
import { PackageGroup } from './FixedPackageTypes';

interface DesktopFixedPackageManagementProps {
  packageGroups: PackageGroup[];
  setPackageGroups: (groups: PackageGroup[]) => void;
  onConfigurePackage?: (pkg: PackageGroup) => void;
}

export default function DesktopFixedPackageManagement({ 
  packageGroups, 
  setPackageGroups,
  onConfigurePackage 
}: DesktopFixedPackageManagementProps) {
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<PackageGroup | null>(null);
  
  const [groupFormData, setGroupFormData] = useState({
    name: '',
    description: '',
    isActive: true
  });

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

  const handleConfigureGroup = (pkg: PackageGroup) => {
    if (onConfigurePackage) {
      onConfigurePackage(pkg);
    }
  };

  const resetGroupForm = () => {
    setGroupFormData({
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
          <h2 className="text-2xl font-bold text-gray-900">Fixed Package Management</h2>
          <button
            onClick={() => {
              setEditingGroup(null);
              resetGroupForm();
              setShowGroupModal(true);
            }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <MdAdd className="w-5 h-5" />
            <span>Add Package Group</span>
          </button>
        </div>

        {/* Package Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packageGroups.map((group) => (
            <div
              key={group.id}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleConfigureGroup(group)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{group.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Click to manage sub-packages</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  group.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {group.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-4">{group.description}</p>

              <div className="mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MdSettings className="w-4 h-4" />
                  <span>
                    {group.subPackages?.length || 0} sub-package{group.subPackages?.length !== 1 ? 's' : ''} configured
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Fixed Pricing
                  </span>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleConfigureGroup(group);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors"
                >
                  <MdSettings className="w-4 h-4" />
                  <span>Configure</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteGroup(group.id);
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

        {packageGroups.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No package groups found
          </div>
        )}
      </div>

      {/* Add/Edit Group Modal */}
      {showGroupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">
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

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Package Group Name
                </label>
                <input
                  type="text"
                  value={groupFormData.name}
                  onChange={(e) => setGroupFormData({ ...groupFormData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter package group name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={groupFormData.description}
                  onChange={(e) => setGroupFormData({ ...groupFormData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter package group description"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={groupFormData.isActive}
                  onChange={(e) => setGroupFormData({ ...groupFormData, isActive: e.target.checked })}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Active Package Group
                </label>
              </div>

              <div className="p-3 rounded-lg bg-purple-50">
                <p className="text-sm text-purple-800">
                  Fixed Pricing: Create sub-packages with fixed prices for multiple categories.
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowGroupModal(false);
                  setEditingGroup(null);
                  resetGroupForm();
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={editingGroup ? handleUpdateGroup : handleAddGroup}
                disabled={!groupFormData.name}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingGroup ? 'Update' : 'Add'} Package Group
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

