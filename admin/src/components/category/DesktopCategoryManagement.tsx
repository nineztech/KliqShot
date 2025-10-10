'use client';

import { useState } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdExpandMore,
  MdChevronRight,
  MdClose,
  MdImage
} from 'react-icons/md';
import { categoryApi } from '@/lib/api';

interface SubCategory {
  id: string;
  name: string;
  photographerCount: number;
  image?: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  photographerCount: number;
  subCategories: SubCategory[];
  image?: string;
}

interface DesktopCategoryManagementProps {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  onRefresh?: () => void;
}

export default function DesktopCategoryManagement({ categories, setCategories, onRefresh }: DesktopCategoryManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSubCategoryModal, setShowSubCategoryModal] = useState(false);
  const [showEditSubCategoryModal, setShowEditSubCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    image: ''
  });
  const [newSubCategory, setNewSubCategory] = useState({
    name: '',
    image: ''
  });
  const [categoryImagePreview, setCategoryImagePreview] = useState<string>('');
  const [subCategoryImagePreview, setSubCategoryImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddCategory = async () => {
    if (newCategory.name && newCategory.description) {
      setIsSubmitting(true);
      setError('');
      
      try {
        const response = await categoryApi.create({
          name: newCategory.name,
          description: newCategory.description,
          image: newCategory.image || undefined,
          parentId: null
        });

        if (response.success) {
          // Refresh categories from server
          if (onRefresh) {
            await onRefresh();
          }
          setNewCategory({ name: '', description: '', image: '' });
          setCategoryImagePreview('');
          setShowAddModal(false);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to create category');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setNewCategory({
      name: category.name,
      description: category.description,
      image: category.image || ''
    });
    setCategoryImagePreview(category.image || '');
    setShowEditModal(true);
  };

  const handleUpdateCategory = async () => {
    if (selectedCategory && newCategory.name && newCategory.description) {
      setIsSubmitting(true);
      setError('');
      
      try {
        const response = await categoryApi.update(selectedCategory.id, {
          name: newCategory.name,
          description: newCategory.description,
          image: newCategory.image || undefined
        });

        if (response.success) {
          // Refresh categories from server
          if (onRefresh) {
            await onRefresh();
          }
          setShowEditModal(false);
          setSelectedCategory(null);
          setNewCategory({ name: '', description: '', image: '' });
          setCategoryImagePreview('');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to update category');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  const handleAddSubCategory = (categoryId: string) => {
    setSelectedCategory(categories.find(cat => cat.id === categoryId) || null);
    setNewSubCategory({ name: '', image: '' });
    setSubCategoryImagePreview('');
    setShowSubCategoryModal(true);
  };

  const handleSaveSubCategory = async () => {
    if (selectedCategory && newSubCategory.name) {
      setIsSubmitting(true);
      setError('');
      
      try {
        const response = await categoryApi.create({
          name: newSubCategory.name,
          image: newSubCategory.image || undefined,
          parentId: selectedCategory.id
        });

        if (response.success) {
          // Refresh categories from server
          if (onRefresh) {
            await onRefresh();
          }
          setShowSubCategoryModal(false);
          setSelectedCategory(null);
          setNewSubCategory({ name: '', image: '' });
          setSubCategoryImagePreview('');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to create subcategory');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCategoryImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setCategoryImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file to server
      try {
        setIsSubmitting(true);
        const uploadResponse = await categoryApi.uploadImage(file);
        if (uploadResponse.success && uploadResponse.data) {
          setNewCategory({ ...newCategory, image: uploadResponse.data.url });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to upload image');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSubCategoryImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Show preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        setSubCategoryImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload file to server
      try {
        setIsSubmitting(true);
        const uploadResponse = await categoryApi.uploadImage(file);
        if (uploadResponse.success && uploadResponse.data) {
          setNewSubCategory({ ...newSubCategory, image: uploadResponse.data.url });
        }
      } catch (err: any) {
        setError(err.message || 'Failed to upload image');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleEditSubCategory = (categoryId: string, subCategory: SubCategory) => {
    setSelectedCategory(categories.find(cat => cat.id === categoryId) || null);
    setSelectedSubCategory(subCategory);
    setNewSubCategory({
      name: subCategory.name,
      image: subCategory.image || ''
    });
    setSubCategoryImagePreview(subCategory.image || '');
    setShowEditSubCategoryModal(true);
  };

  const handleUpdateSubCategory = async () => {
    if (selectedCategory && selectedSubCategory && newSubCategory.name) {
      setIsSubmitting(true);
      setError('');
      
      try {
        const response = await categoryApi.update(selectedSubCategory.id, {
          name: newSubCategory.name,
          image: newSubCategory.image || undefined
        });

        if (response.success) {
          // Refresh categories from server
          if (onRefresh) {
            await onRefresh();
          }
          setShowEditSubCategoryModal(false);
          setSelectedCategory(null);
          setSelectedSubCategory(null);
          setNewSubCategory({ name: '', image: '' });
          setSubCategoryImagePreview('');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to update subcategory');
      } finally {
        setIsSubmitting(false);
      }
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
                {category.image && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                  <p className="text-xs text-blue-600">{category.photographerCount} KliqChamps</p>
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
                      <div className="flex items-center space-x-3">
                        {subCategory.image && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                            <img
                              src={subCategory.image}
                              alt={subCategory.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h4 className="font-medium text-gray-900">{subCategory.name}</h4>
                          <p className="text-xs text-blue-600">{subCategory.photographerCount} KliqChamps</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleEditSubCategory(category.id, subCategory)}
                          className="p-1 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          title="Edit Subcategory"
                        >
                          <MdEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSubCategory(category.id, subCategory.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete Subcategory"
                        >
                          <MdDelete className="w-4 h-4" />
                        </button>
                      </div>
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
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
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
                <label className="admin-label">Category Image</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                      <MdImage className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Choose Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCategoryImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {categoryImagePreview && (
                    <div className="relative w-full h-32 border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={categoryImagePreview}
                        alt="Category preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setCategoryImagePreview('');
                          setNewCategory({ ...newCategory, image: '' });
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
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
                disabled={isSubmitting}
                className="admin-button-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding...' : 'Add Category'}
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
                <label className="admin-label">Category Image</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                      <MdImage className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Choose Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleCategoryImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {categoryImagePreview && (
                    <div className="relative w-full h-32 border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={categoryImagePreview}
                        alt="Category preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setCategoryImagePreview('');
                          setNewCategory({ ...newCategory, image: '' });
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
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
                <label className="admin-label">Subcategory Image</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                      <MdImage className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Choose Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSubCategoryImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {subCategoryImagePreview && (
                    <div className="relative w-full h-32 border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={subCategoryImagePreview}
                        alt="Subcategory preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setSubCategoryImagePreview('');
                          setNewSubCategory({ ...newSubCategory, image: '' });
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
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

      {/* Edit Subcategory Modal */}
      {showEditSubCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Edit Subcategory</h3>
              <button
                onClick={() => setShowEditSubCategoryModal(false)}
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
                <label className="admin-label">Subcategory Image</label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                      <MdImage className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Choose Image</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSubCategoryImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  {subCategoryImagePreview && (
                    <div className="relative w-full h-32 border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={subCategoryImagePreview}
                        alt="Subcategory preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setSubCategoryImagePreview('');
                          setNewSubCategory({ ...newSubCategory, image: '' });
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <MdClose className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowEditSubCategoryModal(false)}
                className="admin-button-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubCategory}
                className="admin-button-primary"
              >
                Update Subcategory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
