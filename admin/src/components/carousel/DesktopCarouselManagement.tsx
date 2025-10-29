'use client';

import { useState } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete,
  MdClose,
  MdImage,
  MdToggleOn,
  MdToggleOff,
  MdArrowUpward,
  MdArrowDownward
} from 'react-icons/md';
import { CarouselSlide, CategoryFilter, BannerPhoto } from './index';

interface DesktopCarouselManagementProps {
  carouselSlides: CarouselSlide[];
  setCarouselSlides: (slides: CarouselSlide[]) => void;
  categoryFilters: CategoryFilter[];
  setCategoryFilters: (filters: CategoryFilter[]) => void;
  bannerPhotos: BannerPhoto[];
  setBannerPhotos: (photos: BannerPhoto[]) => void;
  onRefresh?: () => void;
}

export default function DesktopCarouselManagement({ 
  carouselSlides, 
  setCarouselSlides,
  categoryFilters,
  setCategoryFilters,
  bannerPhotos,
  setBannerPhotos,
  onRefresh 
}: DesktopCarouselManagementProps) {
  const [activeTab, setActiveTab] = useState<'carousel' | 'filters' | 'banners'>('carousel');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingType, setEditingType] = useState<'carousel' | 'filter' | 'banner'>('carousel');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Carousel Form State
  const [newSlide, setNewSlide] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    ctaText: '',
    ctaLink: '',
    badge: '',
    isActive: true,
    displayOrder: 0
  });

  // Filter Form State
  const [newFilter, setNewFilter] = useState({
    label: '',
    icon: '',
    isActive: true,
    displayOrder: 0
  });

  // Banner Form State
  const [newBanner, setNewBanner] = useState({
    name: '',
    image: '',
    position: 'homepage',
    isActive: true,
    displayOrder: 0
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  // Carousel Management
  const handleAddCarouselSlide = () => {
    if (newSlide.title && newSlide.image) {
      const slide: CarouselSlide = {
        id: Date.now().toString(),
        ...newSlide,
        displayOrder: carouselSlides.length,
        stats: []
      };
      setCarouselSlides([...carouselSlides, slide].sort((a, b) => a.displayOrder - b.displayOrder));
      resetCarouselForm();
      setShowAddModal(false);
    }
  };

  const handleEditCarouselSlide = (slide: CarouselSlide) => {
    setSelectedItem(slide);
    setEditingType('carousel');
    setNewSlide({
      title: slide.title,
      subtitle: slide.subtitle,
      description: slide.description,
      image: slide.image,
      ctaText: slide.ctaText,
      ctaLink: slide.ctaLink,
      badge: slide.badge || '',
      isActive: slide.isActive,
      displayOrder: slide.displayOrder
    });
    setImagePreview(slide.image);
    setShowEditModal(true);
  };

  const handleUpdateCarouselSlide = () => {
    if (selectedItem && newSlide.title && newSlide.image) {
      setCarouselSlides(carouselSlides.map(s => 
        s.id === selectedItem.id 
          ? { ...selectedItem, ...newSlide }
          : s
      ).sort((a, b) => a.displayOrder - b.displayOrder));
      resetCarouselForm();
      setShowEditModal(false);
      setSelectedItem(null);
    }
  };

  const handleDeleteCarouselSlide = (id: string) => {
    if (confirm('Are you sure you want to delete this carousel slide?')) {
      setCarouselSlides(carouselSlides.filter(s => s.id !== id));
    }
  };

  // Filter Management
  const handleAddFilter = () => {
    if (newFilter.label) {
      const filter: CategoryFilter = {
        id: Date.now().toString(),
        ...newFilter,
        displayOrder: categoryFilters.length
      };
      setCategoryFilters([...categoryFilters, filter].sort((a, b) => a.displayOrder - b.displayOrder));
      resetFilterForm();
      setShowAddModal(false);
    }
  };

  const handleEditFilter = (filter: CategoryFilter) => {
    setSelectedItem(filter);
    setEditingType('filter');
    setNewFilter({
      label: filter.label,
      icon: filter.icon,
      isActive: filter.isActive,
      displayOrder: filter.displayOrder
    });
    setShowEditModal(true);
  };

  const handleUpdateFilter = () => {
    if (selectedItem && newFilter.label) {
      setCategoryFilters(categoryFilters.map(f => 
        f.id === selectedItem.id 
          ? { ...selectedItem, ...newFilter }
          : f
      ).sort((a, b) => a.displayOrder - b.displayOrder));
      resetFilterForm();
      setShowEditModal(false);
      setSelectedItem(null);
    }
  };

  const handleDeleteFilter = (id: string) => {
    if (confirm('Are you sure you want to delete this filter?')) {
      setCategoryFilters(categoryFilters.filter(f => f.id !== id));
    }
  };

  // Banner Management
  const handleAddBanner = () => {
    if (newBanner.name && newBanner.image) {
      const banner: BannerPhoto = {
        id: Date.now().toString(),
        ...newBanner,
        displayOrder: bannerPhotos.length
      };
      setBannerPhotos([...bannerPhotos, banner].sort((a, b) => a.displayOrder - b.displayOrder));
      resetBannerForm();
      setShowAddModal(false);
    }
  };

  const handleEditBanner = (banner: BannerPhoto) => {
    setSelectedItem(banner);
    setEditingType('banner');
    setNewBanner({
      name: banner.name,
      image: banner.image,
      position: banner.position,
      isActive: banner.isActive,
      displayOrder: banner.displayOrder
    });
    setImagePreview(banner.image);
    setShowEditModal(true);
  };

  const handleUpdateBanner = () => {
    if (selectedItem && newBanner.name && newBanner.image) {
      setBannerPhotos(bannerPhotos.map(b => 
        b.id === selectedItem.id 
          ? { ...selectedItem, ...newBanner }
          : b
      ).sort((a, b) => a.displayOrder - b.displayOrder));
      resetBannerForm();
      setShowEditModal(false);
      setSelectedItem(null);
    }
  };

  const handleDeleteBanner = (id: string) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      setBannerPhotos(bannerPhotos.filter(b => b.id !== id));
    }
  };

  // Image upload handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        if (editingType === 'carousel' || activeTab === 'carousel') {
          setNewSlide({ ...newSlide, image: result });
        } else if (editingType === 'banner' || activeTab === 'banners') {
          setNewBanner({ ...newBanner, image: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetCarouselForm = () => {
    setNewSlide({
      title: '',
      subtitle: '',
      description: '',
      image: '',
      ctaText: '',
      ctaLink: '',
      badge: '',
      isActive: true,
      displayOrder: 0
    });
    setImagePreview('');
  };

  const resetFilterForm = () => {
    setNewFilter({
      label: '',
      icon: '',
      isActive: true,
      displayOrder: 0
    });
  };

  const resetBannerForm = () => {
    setNewBanner({
      name: '',
      image: '',
      position: 'homepage',
      isActive: true,
      displayOrder: 0
    });
    setImagePreview('');
  };

  // Drag and Drop Handlers
  const handleDragStart = (index: number) => {
    setDraggedItem(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDraggedOverItem(index);
    if (draggedItem !== null && draggedItem !== index) {
      setDragOverIndex(index);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOverItem(null);
    setDragOverIndex(null);
  };

  const handleDrop = (index: number) => {
    if (draggedItem === null || draggedItem === index) return;

    let newItems: any[] = [];
    
    if (activeTab === 'carousel') {
      newItems = [...carouselSlides];
      const [dragged] = newItems.splice(draggedItem, 1);
      newItems.splice(index, 0, dragged);
      // Update displayOrder
      const updated = newItems.map((item, idx) => ({ ...item, displayOrder: idx }));
      setCarouselSlides(updated);
    } else if (activeTab === 'filters') {
      newItems = [...categoryFilters];
      const [dragged] = newItems.splice(draggedItem, 1);
      newItems.splice(index, 0, dragged);
      const updated = newItems.map((item, idx) => ({ ...item, displayOrder: idx }));
      setCategoryFilters(updated);
    } else if (activeTab === 'banners') {
      newItems = [...bannerPhotos];
      const [dragged] = newItems.splice(draggedItem, 1);
      newItems.splice(index, 0, dragged);
      const updated = newItems.map((item, idx) => ({ ...item, displayOrder: idx }));
      setBannerPhotos(updated);
    }

    setDraggedItem(null);
    setDraggedOverItem(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="admin-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Carousel & Content Management</h2>
            <p className="text-gray-600 text-sm">Manage carousel slides, category filters, and banner photos</p>
          </div>
          <button 
            onClick={() => {
              setEditingType(activeTab === 'carousel' ? 'carousel' : activeTab === 'filters' ? 'filter' : 'banner');
              setShowAddModal(true);
            }}
            className="admin-button-primary text-sm px-3 py-2 flex items-center"
          >
            <MdAdd className="w-3 h-3 mr-1" />
            Add New
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mt-4 border-b border-gray-200">
          {['carousel', 'filters', 'banners'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel Tab */}
      {activeTab === 'carousel' && (
        <div className="space-y-2">
          {carouselSlides.map((slide, index) => (
            <div 
              key={slide.id} 
              style={{
                opacity: draggedItem === index ? 0.4 : 1,
                transition: draggedItem === null ? 'transform 0.3s ease-in-out, margin 0.3s ease-in-out' : 'none',
                zIndex: draggedItem === index ? 50 : 1,
                transform: draggedItem === index ? 'scale(1.05)' : 'scale(1)'
              }}
              className={`admin-card cursor-move transition-all ${draggedItem === index ? 'shadow-2xl rotate-2' : ''} ${draggedOverItem === index && draggedItem !== index ? 'border-2 border-blue-500 bg-blue-50' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDragEnd={handleDragEnd}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(index);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MdArrowUpward className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MdArrowDownward className="w-4 h-4" />
                    </button>
                  </div>
                  {slide.image && (
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{slide.title}</h3>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{index + 1}</span>
                      <button
                        onClick={() => setCarouselSlides(carouselSlides.map(s => 
                          s.id === slide.id ? { ...s, isActive: !s.isActive } : s
                        ))}
                        title={slide.isActive ? 'Active' : 'Inactive'}
                      >
                        {slide.isActive ? (
                          <MdToggleOn className="w-6 h-6 text-green-600" />
                        ) : (
                          <MdToggleOff className="w-6 h-6 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">{slide.subtitle}</p>
                    <p className="text-xs text-gray-500 mt-1">{slide.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditCarouselSlide(slide)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    title="Edit"
                  >
                    <MdEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCarouselSlide(slide.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {carouselSlides.length === 0 && (
            <div className="admin-card">
              <p className="text-gray-500 text-center py-8">No carousel slides added yet</p>
            </div>
          )}
        </div>
      )}

      {/* Filters Tab */}
      {activeTab === 'filters' && (
        <div className="space-y-2">
          {categoryFilters.map((filter, index) => (
            <div 
              key={filter.id} 
              style={{
                opacity: draggedItem === index ? 0.4 : 1,
                transition: draggedItem === null ? 'transform 0.3s ease-in-out, margin 0.3s ease-in-out' : 'none',
                zIndex: draggedItem === index ? 50 : 1,
                transform: draggedItem === index ? 'scale(1.05)' : 'scale(1)'
              }}
              className={`admin-card cursor-move transition-all ${draggedItem === index ? 'shadow-2xl rotate-2' : ''} ${draggedOverItem === index && draggedItem !== index ? 'border-2 border-blue-500 bg-blue-50' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDragEnd={handleDragEnd}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(index);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MdArrowUpward className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MdArrowDownward className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{filter.label}</h3>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{index + 1}</span>
                      <button
                        onClick={() => setCategoryFilters(categoryFilters.map(f => 
                          f.id === filter.id ? { ...f, isActive: !f.isActive } : f
                        ))}
                        title={filter.isActive ? 'Active' : 'Inactive'}
                      >
                        {filter.isActive ? (
                          <MdToggleOn className="w-6 h-6 text-green-600" />
                        ) : (
                          <MdToggleOff className="w-6 h-6 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">Icon: {filter.icon || 'None'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditFilter(filter)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    title="Edit"
                  >
                    <MdEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFilter(filter.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {categoryFilters.length === 0 && (
            <div className="admin-card">
              <p className="text-gray-500 text-center py-8">No filters added yet</p>
            </div>
          )}
        </div>
      )}

      {/* Banners Tab */}
      {activeTab === 'banners' && (
        <div className="space-y-2">
          {bannerPhotos.map((banner, index) => (
            <div 
              key={banner.id} 
              style={{
                opacity: draggedItem === index ? 0.4 : 1,
                transition: draggedItem === null ? 'transform 0.3s ease-in-out, margin 0.3s ease-in-out' : 'none',
                zIndex: draggedItem === index ? 50 : 1,
                transform: draggedItem === index ? 'scale(1.05)' : 'scale(1)'
              }}
              className={`admin-card cursor-move transition-all ${draggedItem === index ? 'shadow-2xl rotate-2' : ''} ${draggedOverItem === index && draggedItem !== index ? 'border-2 border-blue-500 bg-blue-50' : ''}`}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDragEnd={handleDragEnd}
              onDrop={(e) => {
                e.preventDefault();
                handleDrop(index);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col gap-1">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MdArrowUpward className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MdArrowDownward className="w-4 h-4" />
                    </button>
                  </div>
                  {banner.image && (
                    <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <img src={banner.image} alt={banner.name} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{banner.name}</h3>
                      <span className="text-xs bg-blue-100 px-2 py-1 rounded">{banner.position}</span>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">{index + 1}</span>
                      <button
                        onClick={() => setBannerPhotos(bannerPhotos.map(b => 
                          b.id === banner.id ? { ...b, isActive: !b.isActive } : b
                        ))}
                        title={banner.isActive ? 'Active' : 'Inactive'}
                      >
                        {banner.isActive ? (
                          <MdToggleOn className="w-6 h-6 text-green-600" />
                        ) : (
                          <MdToggleOff className="w-6 h-6 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditBanner(banner)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    title="Edit"
                  >
                    <MdEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(banner.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {bannerPhotos.length === 0 && (
            <div className="admin-card">
              <p className="text-gray-500 text-center py-8">No banner photos added yet</p>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modals */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">
                {showEditModal ? 'Edit' : 'Add'} {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setSelectedItem(null);
                  resetCarouselForm();
                  resetFilterForm();
                  resetBannerForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Render form based on type */}
              {(editingType === 'carousel' || activeTab === 'carousel') && !showEditModal && (
                <>
                  <div>
                    <label className="admin-label">Title</label>
                    <input
                      type="text"
                      value={newSlide.title}
                      onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                      className="admin-input w-full"
                      placeholder="Enter slide title"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Subtitle</label>
                    <input
                      type="text"
                      value={newSlide.subtitle}
                      onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                      className="admin-input w-full"
                      placeholder="Enter subtitle"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Description</label>
                    <textarea
                      value={newSlide.description}
                      onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                      className="admin-input w-full h-20 resize-none"
                      placeholder="Enter description"
                    />
                  </div>
                  <div>
                    <label className="admin-label">CTA Text</label>
                    <input
                      type="text"
                      value={newSlide.ctaText}
                      onChange={(e) => setNewSlide({ ...newSlide, ctaText: e.target.value })}
                      className="admin-input w-full"
                      placeholder="Enter CTA button text"
                    />
                  </div>
                  <div>
                    <label className="admin-label">CTA Link</label>
                    <input
                      type="text"
                      value={newSlide.ctaLink}
                      onChange={(e) => setNewSlide({ ...newSlide, ctaLink: e.target.value })}
                      className="admin-input w-full"
                      placeholder="/categories/wedding"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Badge (Optional)</label>
                    <input
                      type="text"
                      value={newSlide.badge}
                      onChange={(e) => setNewSlide({ ...newSlide, badge: e.target.value })}
                      className="admin-input w-full"
                      placeholder="e.g., Trending"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Image</label>
                    <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                      <MdImage className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Choose Image</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {imagePreview && (
                      <div className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden mt-2">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button onClick={() => { setShowAddModal(false); resetCarouselForm(); }} className="admin-button-secondary">Cancel</button>
                    <button onClick={handleAddCarouselSlide} className="admin-button-primary">Add Slide</button>
                  </div>
                </>
              )}

              {/* Edit Carousel */}
              {showEditModal && editingType === 'carousel' && (
                <>
                  <div>
                    <label className="admin-label">Title</label>
                    <input
                      type="text"
                      value={newSlide.title}
                      onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                      className="admin-input w-full"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Subtitle</label>
                    <input
                      type="text"
                      value={newSlide.subtitle}
                      onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                      className="admin-input w-full"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Description</label>
                    <textarea
                      value={newSlide.description}
                      onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                      className="admin-input w-full h-20 resize-none"
                    />
                  </div>
                  <div>
                    <label className="admin-label">CTA Text</label>
                    <input
                      type="text"
                      value={newSlide.ctaText}
                      onChange={(e) => setNewSlide({ ...newSlide, ctaText: e.target.value })}
                      className="admin-input w-full"
                    />
                  </div>
                  <div>
                    <label className="admin-label">CTA Link</label>
                    <input
                      type="text"
                      value={newSlide.ctaLink}
                      onChange={(e) => setNewSlide({ ...newSlide, ctaLink: e.target.value })}
                      className="admin-input w-full"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Badge</label>
                    <input
                      type="text"
                      value={newSlide.badge}
                      onChange={(e) => setNewSlide({ ...newSlide, badge: e.target.value })}
                      className="admin-input w-full"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Image</label>
                    <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                      <MdImage className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Choose Image</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {imagePreview && (
                      <div className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden mt-2">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button onClick={() => { setShowEditModal(false); resetCarouselForm(); }} className="admin-button-secondary">Cancel</button>
                    <button onClick={handleUpdateCarouselSlide} className="admin-button-primary">Update Slide</button>
                  </div>
                </>
              )}

              {/* Add/Edit Filter */}
              {(editingType === 'filter' && activeTab === 'filters' && !showEditModal) && (
                <>
                  <div>
                    <label className="admin-label">Label</label>
                    <input
                      type="text"
                      value={newFilter.label}
                      onChange={(e) => setNewFilter({ ...newFilter, label: e.target.value })}
                      className="admin-input w-full"
                      placeholder="e.g., Wedding"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Icon Name</label>
                    <input
                      type="text"
                      value={newFilter.icon}
                      onChange={(e) => setNewFilter({ ...newFilter, icon: e.target.value })}
                      className="admin-input w-full"
                      placeholder="e.g., HeartIcon"
                    />
                  </div>
                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button onClick={() => { setShowAddModal(false); resetFilterForm(); }} className="admin-button-secondary">Cancel</button>
                    <button onClick={handleAddFilter} className="admin-button-primary">Add Filter</button>
                  </div>
                </>
              )}

              {showEditModal && editingType === 'filter' && (
                <>
                  <div>
                    <label className="admin-label">Label</label>
                    <input
                      type="text"
                      value={newFilter.label}
                      onChange={(e) => setNewFilter({ ...newFilter, label: e.target.value })}
                      className="admin-input w-full"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Icon Name</label>
                    <input
                      type="text"
                      value={newFilter.icon}
                      onChange={(e) => setNewFilter({ ...newFilter, icon: e.target.value })}
                      className="admin-input w-full"
                    />
                  </div>
                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button onClick={() => { setShowEditModal(false); resetFilterForm(); }} className="admin-button-secondary">Cancel</button>
                    <button onClick={handleUpdateFilter} className="admin-button-primary">Update Filter</button>
                  </div>
                </>
              )}

              {/* Add/Edit Banner */}
              {(editingType === 'banner' && activeTab === 'banners' && !showEditModal) && (
                <>
                  <div>
                    <label className="admin-label">Name</label>
                    <input
                      type="text"
                      value={newBanner.name}
                      onChange={(e) => setNewBanner({ ...newBanner, name: e.target.value })}
                      className="admin-input w-full"
                      placeholder="Banner name"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Position</label>
                    <select
                      value={newBanner.position}
                      onChange={(e) => setNewBanner({ ...newBanner, position: e.target.value })}
                      className="admin-input w-full"
                    >
                      <option value="homepage">Homepage</option>
                      <option value="category">Category</option>
                      <option value="sidebar">Sidebar</option>
                    </select>
                  </div>
                  <div>
                    <label className="admin-label">Image</label>
                    <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                      <MdImage className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Choose Image</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {imagePreview && (
                      <div className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden mt-2">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button onClick={() => { setShowAddModal(false); resetBannerForm(); }} className="admin-button-secondary">Cancel</button>
                    <button onClick={handleAddBanner} className="admin-button-primary">Add Banner</button>
                  </div>
                </>
              )}

              {showEditModal && editingType === 'banner' && (
                <>
                  <div>
                    <label className="admin-label">Name</label>
                    <input
                      type="text"
                      value={newBanner.name}
                      onChange={(e) => setNewBanner({ ...newBanner, name: e.target.value })}
                      className="admin-input w-full"
                    />
                  </div>
                  <div>
                    <label className="admin-label">Position</label>
                    <select
                      value={newBanner.position}
                      onChange={(e) => setNewBanner({ ...newBanner, position: e.target.value })}
                      className="admin-input w-full"
                    >
                      <option value="homepage">Homepage</option>
                      <option value="category">Category</option>
                      <option value="sidebar">Sidebar</option>
                    </select>
                  </div>
                  <div>
                    <label className="admin-label">Image</label>
                    <label className="flex items-center justify-center px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                      <MdImage className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Choose Image</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {imagePreview && (
                      <div className="relative w-full h-48 border border-gray-200 rounded-lg overflow-hidden mt-2">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button onClick={() => { setShowEditModal(false); resetBannerForm(); }} className="admin-button-secondary">Cancel</button>
                    <button onClick={handleUpdateBanner} className="admin-button-primary">Update Banner</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

