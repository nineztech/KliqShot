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

interface MobileCarouselManagementProps {
  carouselSlides: CarouselSlide[];
  setCarouselSlides: (slides: CarouselSlide[]) => void;
  categoryFilters: CategoryFilter[];
  setCategoryFilters: (filters: CategoryFilter[]) => void;
  bannerPhotos: BannerPhoto[];
  setBannerPhotos: (photos: BannerPhoto[]) => void;
  onRefresh?: () => void;
}

export default function MobileCarouselManagement({ 
  carouselSlides, 
  setCarouselSlides,
  categoryFilters,
  setCategoryFilters,
  bannerPhotos,
  setBannerPhotos,
  onRefresh 
}: MobileCarouselManagementProps) {
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
    <div className="space-y-2 p-4">
      {/* Header */}
      <div className="admin-card">
        <div className="flex flex-col space-y-2">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Carousel & Content</h2>
            <p className="text-gray-600 text-xs">Manage carousel, filters, and banners</p>
          </div>
          <button 
            onClick={() => {
              setEditingType(activeTab === 'carousel' ? 'carousel' : activeTab === 'filters' ? 'filter' : 'banner');
              setShowAddModal(true);
            }}
            className="admin-button-primary text-sm px-3 py-2 flex items-center"
          >
            <MdAdd className="w-4 h-4 mr-1" />
            Add New
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mt-4 overflow-x-auto pb-2">
          {['carousel', 'filters', 'banners'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-3 py-2 text-xs font-medium whitespace-nowrap ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600'
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
              <div className="flex flex-col space-y-2">
                <div className="flex items-start space-x-2">
                  {slide.image && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                      <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-sm text-gray-900">{slide.title}</h3>
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{index + 1}</span>
                      <button
                        onClick={() => setCarouselSlides(carouselSlides.map(s => 
                          s.id === slide.id ? { ...s, isActive: !s.isActive } : s
                        ))}
                        title={slide.isActive ? 'Active' : 'Inactive'}
                      >
                        {slide.isActive ? (
                          <MdToggleOn className="w-5 h-5 text-green-600" />
                        ) : (
                          <MdToggleOff className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-600">{slide.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <button
                    onClick={() => handleEditCarouselSlide(slide)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <MdEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCarouselSlide(slide.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {carouselSlides.length === 0 && (
            <div className="admin-card">
              <p className="text-gray-500 text-center py-8 text-sm">No carousel slides added yet</p>
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
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-sm text-gray-900">{filter.label}</h3>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{index + 1}</span>
                    <button
                      onClick={() => setCategoryFilters(categoryFilters.map(f => 
                        f.id === filter.id ? { ...f, isActive: !f.isActive } : f
                      ))}
                      title={filter.isActive ? 'Active' : 'Inactive'}
                    >
                      {filter.isActive ? (
                        <MdToggleOn className="w-5 h-5 text-green-600" />
                      ) : (
                        <MdToggleOff className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">Icon: {filter.icon || 'None'}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditFilter(filter)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <MdEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteFilter(filter.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {categoryFilters.length === 0 && (
            <div className="admin-card">
              <p className="text-gray-500 text-center py-8 text-sm">No filters added yet</p>
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
              <div className="flex items-start space-x-2">
                {banner.image && (
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
                    <img src={banner.image} alt={banner.name} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-sm text-gray-900">{banner.name}</h3>
                    <span className="text-xs bg-blue-100 px-2 py-0.5 rounded">{banner.position}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{index + 1}</span>
                    <button
                      onClick={() => setBannerPhotos(bannerPhotos.map(b => 
                        b.id === banner.id ? { ...b, isActive: !b.isActive } : b
                      ))}
                      title={banner.isActive ? 'Active' : 'Inactive'}
                    >
                      {banner.isActive ? (
                        <MdToggleOn className="w-5 h-5 text-green-600" />
                      ) : (
                        <MdToggleOff className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditBanner(banner)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                  >
                    <MdEdit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(banner.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <MdDelete className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {bannerPhotos.length === 0 && (
            <div className="admin-card">
              <p className="text-gray-500 text-center py-8 text-sm">No banner photos added yet</p>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
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
                <MdClose className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-3">
              {/* Carousel Form */}
              {((editingType === 'carousel' && activeTab === 'carousel' && !showEditModal) || (showEditModal && editingType === 'carousel')) && (
                <>
                  <div>
                    <label className="admin-label text-xs">Title</label>
                    <input
                      type="text"
                      value={newSlide.title}
                      onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                      className="admin-input w-full text-sm"
                      placeholder="Enter slide title"
                    />
                  </div>
                  <div>
                    <label className="admin-label text-xs">Subtitle</label>
                    <input
                      type="text"
                      value={newSlide.subtitle}
                      onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                      className="admin-input w-full text-sm"
                      placeholder="Enter subtitle"
                    />
                  </div>
                  <div>
                    <label className="admin-label text-xs">Description</label>
                    <textarea
                      value={newSlide.description}
                      onChange={(e) => setNewSlide({ ...newSlide, description: e.target.value })}
                      className="admin-input w-full h-16 resize-none text-sm"
                      placeholder="Enter description"
                    />
                  </div>
                  <div>
                    <label className="admin-label text-xs">CTA Text</label>
                    <input
                      type="text"
                      value={newSlide.ctaText}
                      onChange={(e) => setNewSlide({ ...newSlide, ctaText: e.target.value })}
                      className="admin-input w-full text-sm"
                      placeholder="Enter CTA button text"
                    />
                  </div>
                  <div>
                    <label className="admin-label text-xs">CTA Link</label>
                    <input
                      type="text"
                      value={newSlide.ctaLink}
                      onChange={(e) => setNewSlide({ ...newSlide, ctaLink: e.target.value })}
                      className="admin-input w-full text-sm"
                      placeholder="/categories/wedding"
                    />
                  </div>
                  <div>
                    <label className="admin-label text-xs">Badge</label>
                    <input
                      type="text"
                      value={newSlide.badge}
                      onChange={(e) => setNewSlide({ ...newSlide, badge: e.target.value })}
                      className="admin-input w-full text-sm"
                      placeholder="e.g., Trending"
                    />
                  </div>
                  <div>
                    <label className="admin-label text-xs">Image</label>
                    <label className="flex items-center justify-center px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                      <MdImage className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-600">Choose Image</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {imagePreview && (
                      <div className="relative w-full h-32 border border-gray-200 rounded-lg overflow-hidden mt-2">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-200">
                    <button onClick={() => { setShowAddModal(false); setShowEditModal(false); resetCarouselForm(); }} className="admin-button-secondary text-xs px-3 py-2">Cancel</button>
                    <button onClick={showEditModal ? handleUpdateCarouselSlide : handleAddCarouselSlide} className="admin-button-primary text-xs px-3 py-2">
                      {showEditModal ? 'Update' : 'Add'} Slide
                    </button>
                  </div>
                </>
              )}

              {/* Filter Form */}
              {((editingType === 'filter' && activeTab === 'filters' && !showEditModal) || (showEditModal && editingType === 'filter')) && (
                <>
                  <div>
                    <label className="admin-label text-xs">Label</label>
                    <input
                      type="text"
                      value={newFilter.label}
                      onChange={(e) => setNewFilter({ ...newFilter, label: e.target.value })}
                      className="admin-input w-full text-sm"
                      placeholder="e.g., Wedding"
                    />
                  </div>
                  <div>
                    <label className="admin-label text-xs">Icon Name</label>
                    <input
                      type="text"
                      value={newFilter.icon}
                      onChange={(e) => setNewFilter({ ...newFilter, icon: e.target.value })}
                      className="admin-input w-full text-sm"
                      placeholder="e.g., HeartIcon"
                    />
                  </div>
                  <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-200">
                    <button onClick={() => { setShowAddModal(false); setShowEditModal(false); resetFilterForm(); }} className="admin-button-secondary text-xs px-3 py-2">Cancel</button>
                    <button onClick={showEditModal ? handleUpdateFilter : handleAddFilter} className="admin-button-primary text-xs px-3 py-2">
                      {showEditModal ? 'Update' : 'Add'} Filter
                    </button>
                  </div>
                </>
              )}

              {/* Banner Form */}
              {((editingType === 'banner' && activeTab === 'banners' && !showEditModal) || (showEditModal && editingType === 'banner')) && (
                <>
                  <div>
                    <label className="admin-label text-xs">Name</label>
                    <input
                      type="text"
                      value={newBanner.name}
                      onChange={(e) => setNewBanner({ ...newBanner, name: e.target.value })}
                      className="admin-input w-full text-sm"
                      placeholder="Banner name"
                    />
                  </div>
                  <div>
                    <label className="admin-label text-xs">Position</label>
                    <select
                      value={newBanner.position}
                      onChange={(e) => setNewBanner({ ...newBanner, position: e.target.value })}
                      className="admin-input w-full text-sm"
                    >
                      <option value="homepage">Homepage</option>
                      <option value="category">Category</option>
                      <option value="sidebar">Sidebar</option>
                    </select>
                  </div>
                  <div>
                    <label className="admin-label text-xs">Image</label>
                    <label className="flex items-center justify-center px-3 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500">
                      <MdImage className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-600">Choose Image</span>
                      <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </label>
                    {imagePreview && (
                      <div className="relative w-full h-32 border border-gray-200 rounded-lg overflow-hidden mt-2">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-end space-x-2 pt-3 border-t border-gray-200">
                    <button onClick={() => { setShowAddModal(false); setShowEditModal(false); resetBannerForm(); }} className="admin-button-secondary text-xs px-3 py-2">Cancel</button>
                    <button onClick={showEditModal ? handleUpdateBanner : handleAddBanner} className="admin-button-primary text-xs px-3 py-2">
                      {showEditModal ? 'Update' : 'Add'} Banner
                    </button>
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

