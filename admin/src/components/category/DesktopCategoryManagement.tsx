'use client';

import { useState } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdExpandMore,
  MdChevronRight,
  MdClose
} from 'react-icons/md';

interface SubCategory {
  id: string;
  name: string;
  photographerCount: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  photographerCount: number;
  subCategories: SubCategory[];
}

interface DesktopCategoryManagementProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export default function DesktopCategoryManagement({ categories, setCategories }: DesktopCategoryManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    photographerCount: 0
  });
  const [newSubCategory, setNewSubCategory] = useState({
    name: '',
    photographerCount: 0
  });

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.description) {
      const category: Category = {
        id: Date.now().toString(),
        name: newCategory.name,
        description: newCategory.description,
        photographerCount: newCategory.photographerCount,
        subCategories: []
      };
      setCategories([...categories, category]);
      setNewCategory({ name: '', description: '', photographerCount: 0 });
      setShowAddModal(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      photographerCount: category.photographerCount
    });
    setShowEditModal(true);
  };

  const handleUpdateCategory = () => {
    if (selectedCategory && newCategory.name && newCategory.description) {
      setCategories(categories.map(cat => 
        cat.id === selectedCategory.id 
          ? { ...cat, ...newCategory }
          : cat
      ));
      setShowEditModal(false);
      setSelectedCategory(null);
      setNewCategory({ name: '', description: '', photographerCount: 0 });
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  const handleAddSubCategory = (categoryId: string) => {
    setSelectedCategory(categories.find(cat => cat.id === categoryId) || null);
    setNewSubCategory({ name: '', photographerCount: 0 });
    setShowSubCategoryModal(true);
  };

  const handleSaveSubCategory = () => {
    if (selectedCategory && newSubCategory.name) {
      const subCategory: SubCategory = {
        id: `${selectedCategory.id}-${Date.now()}`,
        name: newSubCategory.name,
        photographerCount: newSubCategory.photographerCount
      };
      
      setCategories(categories.map(cat => 
        cat.id === selectedCategory.id 
          ? { ...cat, subCategories: [...cat.subCategories, subCategory] }
          : cat
      ));
      
      setShowSubCategoryModal(false);
      setSelectedCategory(null);
      setNewSubCategory({ name: '', photographerCount: 0 });
    }
  };

  const handleDeleteSubCategory = (categoryId: string, subCategoryId: string) => {
    if (confirm('Are you sure you want to delete this subcategory?')) {
      setCategories(categories.map(cat => 
        cat.id === categoryId 
          ? { ...cat, subCategories: cat.subCategories.filter(sub => sub.id !== subCategoryId) }
          : cat
      ));
    }
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="admin-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Category Management</h2>
            <p className="text-gray-600 text-sm">Manage categories and subcategories for the platform</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="admin-button-primary text-sm px-3 py-2"
          >
            <MdAdd className="w-3 h-3 mr-1" />
            Add Category
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-2">
        {categories.map((category) => (
          <div key={category.id} className="admin-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleCategoryExpansion(category.id)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  {expandedCategories.includes(category.id) ? (
                    <MdExpandMore className="w-5 h-5 text-gray-500" />
                  ) : (
                    <MdChevronRight className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                  <p className="text-xs text-blue-600">{category.photographerCount} photographers</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAddSubCategory(category.id)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Add Subcategory"
                >
                  <MdAdd className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleEditCategory(category)}
                  className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  title="Edit Category"
                >
                  <MdEdit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Category"
                >
                  <MdDelete className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Subcategories */}
            {expandedCategories.includes(category.id) && (
              <div className="mt-4 pl-8 border-l-2 border-gray-200">
                <div className="space-y-2">
                  {category.subCategories.map((subCategory) => (
                    <div key={subCategory.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{subCategory.name}</h4>
                        <p className="text-xs text-blue-600">{subCategory.photographerCount} photographers</p>
                      </div>
                      <button
                        onClick={() => handleDeleteSubCategory(category.id, subCategory.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                        title="Delete Subcategory"
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {category.subCategories.length === 0 && (
                    <p className="text-gray-500 text-sm py-4">No subcategories added yet</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add New Category</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="admin-label">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="admin-input w-full h-20 resize-none"
                  placeholder="Enter category description"
                />
              </div>
              <div>
                <label className="admin-label">Photographer Count</label>
                <input
                  type="number"
                  value={newCategory.photographerCount}
                  onChange={(e) => setNewCategory({ ...newCategory, photographerCount: parseInt(e.target.value) || 0 })}
                  className="admin-input w-full"
                  placeholder="0"
                />
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
                onClick={handleAddCategory}
                className="admin-button-primary"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Edit Category</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="admin-label">Category Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="admin-input w-full h-20 resize-none"
                  placeholder="Enter category description"
                />
              </div>
              <div>
                <label className="admin-label">Photographer Count</label>
                <input
                  type="number"
                  value={newCategory.photographerCount}
                  onChange={(e) => setNewCategory({ ...newCategory, photographerCount: parseInt(e.target.value) || 0 })}
                  className="admin-input w-full"
                  placeholder="0"
                />
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
                onClick={handleUpdateCategory}
                className="admin-button-primary"
              >
                Update Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subcategory Modal */}
      {showSubCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add Subcategory to {selectedCategory?.name}</h3>
              <button
                onClick={() => setShowSubCategoryModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="admin-label">Subcategory Name</label>
                <input
                  type="text"
                  value={newSubCategory.name}
                  onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter subcategory name"
                />
              </div>
              <div>
                <label className="admin-label">Photographer Count</label>
                <input
                  type="number"
                  value={newSubCategory.photographerCount}
                  onChange={(e) => setNewSubCategory({ ...newSubCategory, photographerCount: parseInt(e.target.value) || 0 })}
                  className="admin-input w-full"
                  placeholder="0"
                />
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowSubCategoryModal(false)}
                className="admin-button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSubCategory}
                className="admin-button-primary"
              >
                Add Subcategory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
