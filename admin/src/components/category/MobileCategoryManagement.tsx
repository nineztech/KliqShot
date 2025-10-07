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

interface MobileCategoryManagementProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
}

export default function MobileCategoryManagement({ categories, setCategories }: MobileCategoryManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
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
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="admin-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Categories</h2>
            <p className="text-gray-600 text-sm">Manage categories and subcategories</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="admin-button-primary text-sm px-3 py-2"
          >
            <MdAdd className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        {categories.map((category) => (
          <div key={category.id} className="admin-card p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <button
                  onClick={() => toggleCategoryExpansion(category.id)}
                  className="p-1 hover:bg-gray-100 rounded mt-1"
                >
                  {expandedCategories.includes(category.id) ? (
                    <MdExpandMore className="w-4 h-4 text-gray-500" />
                  ) : (
                    <MdChevronRight className="w-4 h-4 text-gray-500" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600 mb-1">{category.description}</p>
                  <p className="text-xs text-blue-600">{category.photographerCount} photographers</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 ml-2">
                <button
                  onClick={() => handleAddSubCategory(category.id)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  title="Add Subcategory"
                >
                  <MdAdd className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="Delete Category"
                >
                  <MdDelete className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Subcategories */}
            {expandedCategories.includes(category.id) && (
              <div className="mt-3 pl-6 border-l-2 border-gray-200">
                <div className="space-y-2">
                  {category.subCategories.map((subCategory) => (
                    <div key={subCategory.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">{subCategory.name}</h4>
                        <p className="text-xs text-blue-600">{subCategory.photographerCount} photographers</p>
                      </div>
                      <button
                        onClick={() => handleDeleteSubCategory(category.id, subCategory.id)}
                        className="p-1 text-red-600 hover:bg-red-100 rounded"
                        title="Delete Subcategory"
                      >
                        <MdDelete className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {category.subCategories.length === 0 && (
                    <p className="text-gray-500 text-xs py-2">No subcategories added yet</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add Category</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
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
            <div className="flex flex-col space-y-2 p-4 border-t border-gray-200">
              <button
                onClick={handleAddCategory}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Add Category
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subcategory Modal */}
      {showSubCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add Subcategory to {selectedCategory?.name}</h3>
              <button
                onClick={() => setShowSubCategoryModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
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
            <div className="flex flex-col space-y-2 p-4 border-t border-gray-200">
              <button
                onClick={handleSaveSubCategory}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Add Subcategory
              </button>
              <button
                onClick={() => setShowSubCategoryModal(false)}
                className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
