'use client';

import React, { useState } from 'react';
import { Camera, Upload, Heart, UserRound, Mountain, PartyPopper, Box, Sparkles, Image, X, Plus, Trash2, Save, Award, Calendar, MapPin, Briefcase, FolderOpen, Image as ImageIcon, Star, Eye } from 'lucide-react';
import { useSidebar } from '@/components/Sidebar/SidebarContext';
interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  category: string;
  uploadDate: string;
  size: number;
  location: string;
  isCover: boolean;
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  category: string;
}

interface CategoryImages {
  [key: string]: PortfolioImage[];
}

interface PhotographerPortfolioProps {
  isMinimized?: boolean;
}

const PhotographerPortfolio: React.FC<PhotographerPortfolioProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState('wedding');
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [viewingImage, setViewingImage] = useState<PortfolioImage | null>(null);
  const [editingImageId, setEditingImageId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  
  const categories = [
    { id: 'wedding', name: 'Wedding Photography', icon: <Heart /> },
    { id: 'portrait', name: 'Portrait Sessions', icon: <UserRound /> },
    { id: 'landscape', name: 'Landscape & Nature', icon: <Mountain /> },
    { id: 'event', name: 'Event Coverage', icon: <PartyPopper />},
    { id: 'product', name: 'Product Photography', icon: <Box />},
    { id: 'fashion', name: 'Fashion & Editorial', icon: <Sparkles />}
  ];

  const [portfolioImages, setPortfolioImages] = useState<CategoryImages>({
    wedding: [],
    portrait: [],
    landscape: [],
    event: [],
    product: [],
    fashion: []
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);

  const gradients = [
    'from-emerald-500 to-cyan-500',
    'from-blue-600 to-cyan-500',
    'from-fuchsia-600 to-rose-500',
    'from-amber-500 to-orange-600',
    'from-indigo-600 to-purple-500',
    'from-green-500 to-emerald-500',
    'from-rose-500 to-pink-600',
    'from-teal-500 to-cyan-500',
    'from-emerald-600 to-lime-400',
    'from-rose-500 to-orange-500',
    'from-indigo-600 to-teal-500',
  ];

  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    category: 'wedding'
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    
    fileArray.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            const currentDate = new Date();
            const categoryName = categories.find(c => c.id === selectedCategory)?.name || selectedCategory;
            const defaultLocation = 'Unknown';
            const timestamp = currentDate.toLocaleString('en-US', { 
              month: 'short', 
              day: '2-digit', 
              year: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit' 
            });
            
            const imageData: PortfolioImage = {
              id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              url: reader.result as string,
              name: `${categoryName}_${defaultLocation}_${timestamp}`,
              category: selectedCategory,
              uploadDate: currentDate.toISOString(),
              size: file.size,
              location: defaultLocation,
              isCover: false
            };
            
            setPortfolioImages(prev => ({
              ...prev,
              [selectedCategory]: [...prev[selectedCategory], imageData]
            }));
          }
        };
        reader.onerror = () => {
          console.error('Error reading file:', file.name);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (categoryId: string, imageId: string) => {
    setPortfolioImages(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].filter(img => img.id !== imageId)
    }));
  };

  const addExperience = () => {
    if (newExperience.title && newExperience.company) {
      const newExp: Experience = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...newExperience
      };
      
      setExperiences([...experiences, newExp]);
      setNewExperience({
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        category: selectedCategory
      });
      setShowAddExperience(false);
    }
  };

  const removeExperience = (id: string) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const startEditingName = (image: PortfolioImage) => {
    setEditingImageId(image.id);
    setEditingName(image.name);
  };

  const saveImageName = (categoryId: string, imageId: string) => {
    if (editingName.trim()) {
      setPortfolioImages(prev => ({
        ...prev,
        [categoryId]: prev[categoryId].map(img => 
          img.id === imageId ? { ...img, name: editingName.trim() } : img
        )
      }));
    }
    setEditingImageId(null);
    setEditingName('');
  };

  const cancelEditingName = () => {
    setEditingImageId(null);
    setEditingName('');
  };

  const setAsCover = (categoryId: string, imageId: string) => {
    setPortfolioImages(prev => ({
      ...prev,
      [categoryId]: prev[categoryId].map(img => ({
        ...img,
        isCover: img.id === imageId
      }))
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getCurrentCategory = () => {
    return categories.find(c => c.id === selectedCategory);
  };

  const getTotalImagesCount = () => {
    return Object.values(portfolioImages).reduce((total, imgs) => total + imgs.length, 0);
  };

  const getCategoryExperiences = (categoryId: string) => {
    return experiences.filter(exp => exp.category === categoryId);
  };

  const handleViewImage = (image: PortfolioImage, e: React.MouseEvent) => {
    e.stopPropagation();
    setViewingImage(image);
  };

  const currentCategory = getCurrentCategory();
  const currentImages = portfolioImages[selectedCategory] || [];
  const currentExperiences = getCategoryExperiences(selectedCategory);
 const { isMinimized } = useSidebar();
  const [activeTab, setActiveTab] = useState('all');
  return (
     <div className="mt-8 p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen">
      <div 
        className="p-4 md:p-6 lg:p-8 transition-all duration-300"
        style={{ 
          marginLeft: isMinimized ? '3rem' : '14rem',
           
        }}
      >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }

        .animate-fadeInDown {
          animation: fadeInDown 0.5s ease-out forwards;
        }

        .animate-fadeInLeft {
          animation: fadeInLeft 0.3s ease-out forwards;
        }

        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out forwards;
        }

        @media (max-width: 768px) {
          .portfolio-container {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>

      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 opacity-0 animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 rounded-2xl flex items-center justify-center shadow-xl">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">My Portfolio</h1>
                <p className="text-xs md:text-sm lg:text-base text-gray-600 flex items-center gap-2 mt-1">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-500 fill-yellow-500" />
                  {getTotalImagesCount()} photos across {categories.length} categories
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs - Grid Layout */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FolderOpen className="w-4 h-4 md:w-5 md:h-5 text-indigo-500" />
            Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 overflow-visible">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative rounded-2xl transition-all duration-300 transform ${
                  selectedCategory === category.id
                    ? 'scale-105 shadow-2xl'
                    : 'hover:scale-105 hover:shadow-xl'
                }`}
              >
                <div
                  className={`relative p-2 md:p-3 bg-gradient-to-br ${
                    gradients[categories.indexOf(category) % gradients.length]
                  } rounded-2xl overflow-hidden ${
                    selectedCategory === category.id
                      ? 'opacity-100'
                      : 'opacity-90 group-hover:opacity-100'
                  }`}
                >
                  <div className="relative text-center space-y-1.5">
                    <div className="text-white">
                      <p className="font-bold text-xs md:text-sm lg:text-base leading-tight">
                        {category.name}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 px-2 md:px-3 py-1 bg-white/25 backdrop-blur-md rounded-full border border-white/30 shadow-lg">
                      <Image className="w-3 h-3 md:w-3.5 md:h-3.5 text-white" />
                      <span className="text-xs md:text-sm font-bold text-white">
                        {portfolioImages[category.id]?.length || 0}
                      </span>
                    </div>
                  </div>

                  {selectedCategory === category.id && (
                    <>
                      <div className="absolute top-6 md:top-10 right-2 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-indigo-500 rounded-full"></div>
                      </div>
                      <div className="absolute inset-0 border-2 md:border-3 border-white rounded-2xl pointer-events-none"></div>
                    </>
                  )}
                </div>

                {selectedCategory === category.id && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl -z-10 blur-sm"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column - Upload & Stats */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-base md:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="w-4 h-4 md:w-5 md:h-5 text-indigo-500" />
                Upload Photos
              </h3>
              
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-4 md:p-6 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center gap-2 md:gap-3">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-2xl md:text-3xl text-white">{currentCategory?.icon}</span>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1">
                      Drop photos here
                    </p>
                    <p className="text-xs text-gray-500">to {currentCategory?.name}</p>
                  </div>
                  <label className="px-3 md:px-4 py-2 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white text-xs md:text-sm rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg font-medium">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileInput}
                      className="hidden"
                    />
                    Browse Files
                  </label>
                </div>
              </div>
            </div>

            {/* Category Info */}
            <div className="rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900" style={{ animationDelay: '0.3s' }}>
              <div className="text-white">
                <div className="text-4xl md:text-5xl mb-3">{currentCategory?.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-2">{currentCategory?.name}</h3>
                <div className="space-y-2 text-xs md:text-sm opacity-90">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{currentImages.length} Photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{currentExperiences.length} Experience{currentExperiences.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Gallery & Experience */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Photo Gallery */}
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FolderOpen className="w-4 h-4 md:w-5 md:h-5 text-indigo-500" />
                  Photo Gallery
                </h3>
                <span className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-semibold bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-900 text-white">
                  {currentImages.length} Photos
                </span>
              </div>

              {currentImages.length === 0 ? (
                <div className="text-center py-12 md:py-16 text-gray-500">
                  <div className="w-12 h-12 md:w-14 md:h-14 p-2 mx-auto mb-4 rounded-full bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 flex items-center justify-center">
                    <span className="text-4xl md:text-5xl text-white">{currentCategory?.icon}</span>
                  </div>
                  <p className="text-lg md:text-xl font-semibold text-gray-700 mb-2">No photos yet</p>
                  <p className="text-xs md:text-sm">Upload your first {currentCategory?.name.toLowerCase()} photo to get started!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4">
                  {currentImages.map((image, idx) => (
                    <div 
                      key={image.id} 
                      className="relative group opacity-0 animate-scaleIn"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-shadow duration-300">
                        <div className="aspect-square">
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        {image.isCover && (
                          <div className="absolute top-2 right-2 px-2 py-0.5 md:py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg z-10">
                            <span className="text-xs font-bold text-white flex items-center gap-1">
                              <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-white" />
                              Cover
                            </span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                            {editingImageId === image.id ? (
                              <div className="mb-2">
                                <input
                                  type="text"
                                  value={editingName}
                                  onChange={(e) => setEditingName(e.target.value)}
                                  className="w-full px-2 py-1 text-xs md:text-sm text-gray-900 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') saveImageName(selectedCategory, image.id);
                                    if (e.key === 'Escape') cancelEditingName();
                                  }}
                                  autoFocus
                                />
                              </div>
                            ) : (
                              <p className="text-white text-xs md:text-sm font-medium truncate mb-2">
                                {image.name}
                              </p>
                            )}
                            <div className="flex items-center gap-2">
                              {editingImageId === image.id ? (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      saveImageName(selectedCategory, image.id);
                                    }}
                                    className="flex-1 px-2 md:px-3 py-1.5 md:py-2 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium flex items-center justify-center gap-1"
                                  >
                                    <Save className="w-3 h-3" />
                                    Save
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      cancelEditingName();
                                    }}
                                    className="flex-1 px-2 md:px-3 py-1.5 md:py-2 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium"
                                  >
                                    Cancel
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={(e) => handleViewImage(image, e)}
                                    className="flex-1 px-2 md:px-3 py-1.5 md:py-2 bg-indigo-500 text-white text-xs rounded-lg hover:bg-indigo-600 transition-colors duration-200 font-medium flex items-center justify-center gap-1"
                                  >
                                    <Eye className="w-3 h-3" />
                                    View
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeImage(selectedCategory, image.id);
                                    }}
                                    className="flex-1 px-2 md:px-3 py-1.5 md:py-2 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium flex items-center justify-center gap-1"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                    Delete
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-2 left-2 flex gap-2">
                          {editingImageId !== image.id && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startEditingName(image);
                              }}
                              className="px-2 py-0.5 md:py-1 bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                              <span className="text-xs font-bold text-white">Rename</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-indigo-500" />
                  Experience in {currentCategory?.name}
                </h3>
                <button
                  onClick={() => setShowAddExperience(!showAddExperience)}
                  className="px-3 md:px-4 py-2 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 text-white text-xs md:text-sm rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium flex items-center gap-2 justify-center sm:justify-start"
                >
                  <Plus className="w-3 h-3 md:w-4 md:h-4" />
                  Add Experience
                </button>
              </div>

              {/* Add Experience Form */}
              {showAddExperience && (
                <div className="rounded-xl p-4 md:p-6 mb-4 md:mb-6 border-2 bg-indigo-50 border-gray-200">
                  <h4 className="font-semibold text-sm md:text-base text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-xl md:text-2xl">{currentCategory?.icon}</span>
                    New Experience for {currentCategory?.name}
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                    <input
                      type="text"
                      placeholder="Job Title *"
                      value={newExperience.title}
                      onChange={(e) => setNewExperience({...newExperience, title: e.target.value, category: selectedCategory})}
                      className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Company/Studio *"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({...newExperience, company: e.target.value, category: selectedCategory})}
                      className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={newExperience.location}
                      onChange={(e) => setNewExperience({...newExperience, location: e.target.value, category: selectedCategory})}
                      className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Start Date (e.g., Jan 2020)"
                      value={newExperience.startDate}
                      onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value, category: selectedCategory})}
                      className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      placeholder="End Date (or 'Present')"
                      value={newExperience.endDate}
                      onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value, category: selectedCategory})}
                      className="px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({...newExperience, description: e.target.value, category: selectedCategory})}
                    className="w-full mt-3 md:mt-4 px-3 md:px-4 py-2 md:py-3 text-xs md:text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                    rows={3}
                  />
                  <div className="flex flex-col sm:flex-row gap-3 mt-3 md:mt-4">
                    <button
                      onClick={addExperience}
                      className="px-4 md:px-6 py-2 text-xs md:text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-medium flex items-center justify-center gap-2"
                    >
                      <Save className="w-3 h-3 md:w-4 md:h-4" />
                      Save Experience
                    </button>
                    <button
                      onClick={() => setShowAddExperience(false)}
                      className="px-4 md:px-6 py-2 text-xs md:text-sm bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Experience List */}
              {currentExperiences.length === 0 ? (
                <div className="text-center py-6 md:py-8 text-gray-500">
                  <Award className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-xs md:text-sm">No experience added yet</p>
                  <p className="text-xs">Share your achievements in this category!</p>
                </div>
              ) : (
                <div className="space-y-3 md:space-y-4">
                  {currentExperiences.map((exp, idx) => (
                    <div 
                      key={exp.id} 
                      className="p-4 md:p-5 rounded-xl border-2 border-gray-200 hover:shadow-lg transition-all duration-300 opacity-0 animate-fadeInLeft"
                      style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
                    >
                      <div className="flex justify-between items-start mb-2 md:mb-3 gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg md:text-xl">{currentCategory?.icon}</span>
                            <h4 className="text-sm md:text-base lg:text-lg font-bold text-gray-900 truncate">{exp.title}</h4>
                          </div>
                          <p className="text-xs md:text-sm lg:text-base text-indigo-600 font-semibold truncate">{exp.company}</p>
                        </div>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="p-1.5 md:p-2 text-red-500 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
                        >
                          <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm text-gray-600 mb-2">
                        {exp.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                            <span className="truncate">{exp.location}</span>
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      {exp.description && (
                        <p className="text-xs md:text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Image Viewer Modal */}
      {viewingImage && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setViewingImage(null)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
              {/* Left Side - Image */}
              <div className="lg:w-2/3 bg-gray-900 flex items-center justify-center p-4 md:p-6 lg:p-8 relative min-h-[250px] md:min-h-[400px] lg:min-h-[500px]">
                <button
                  onClick={() => setViewingImage(null)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 p-1.5 md:p-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full text-white transition-colors z-10"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <img
                  src={viewingImage.url}
                  alt={viewingImage.name}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>

              {/* Right Side - Details */}
              <div className="lg:w-1/3 p-4 md:p-6 overflow-y-auto bg-gradient-to-br from-slate-50 to-indigo-50 max-h-[40vh] md:max-h-[50vh] lg:max-h-full">
                <div className="space-y-4 md:space-y-6">
                  {/* Header */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-slate-800 via-purple-800 to-indigo-900 rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg md:text-xl">{currentCategory?.icon}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900">Photo Details</h3>
                    </div>
                    <p className="text-xs md:text-sm text-gray-500">{currentCategory?.name}</p>
                  </div>

                  {/* Image Name */}
                  <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-200">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                      File Name
                    </label>
                    <p className="text-sm md:text-base font-medium text-gray-900 break-words">
                      {viewingImage.name}
                    </p>
                  </div>

                  {/* Details Grid */}
                  <div className="space-y-3">
                    {/* Location */}
                    <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-500" />
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Location
                        </label>
                      </div>
                      <p className="text-sm md:text-base text-gray-900 font-medium">
                        {viewingImage.location}
                      </p>
                    </div>

                    {/* Upload Date */}
                    <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-500" />
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          Upload Date
                        </label>
                      </div>
                      <p className="text-sm md:text-base text-gray-900 font-medium">
                        {new Date(viewingImage.uploadDate).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    {/* File Size */}
                    <div className="bg-white rounded-xl p-3 md:p-4 shadow-sm border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <ImageIcon className="w-3.5 h-3.5 md:w-4 md:h-4 text-indigo-500" />
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                          File Size
                        </label>
                      </div>
                      <p className="text-sm md:text-base text-gray-900 font-medium">
                        {formatFileSize(viewingImage.size)}
                      </p>
                    </div>
                  </div>

                  {/* Cover Status */}
                  {viewingImage.isCover && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-3 md:p-4 shadow-lg">
                      <div className="flex items-center gap-2 text-white">
                        <Star className="w-4 h-4 md:w-5 md:h-5 fill-white" />
                        <span className="font-bold text-sm md:text-base">Cover Photo</span>
                      </div>
                      <p className="text-xs md:text-sm text-white/90 mt-1">
                        This is the cover photo for this category
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="space-y-2 md:space-y-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => {
                        setAsCover(selectedCategory, viewingImage.id);
                        setViewingImage({ ...viewingImage, isCover: true });
                      }}
                      disabled={viewingImage.isCover}
                      className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-xl text-sm md:text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        viewingImage.isCover
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 shadow-md hover:shadow-lg'
                      }`}
                    >
                      <Star className={`w-3.5 h-3.5 md:w-4 md:h-4 ${viewingImage.isCover ? '' : 'fill-white'}`} />
                      {viewingImage.isCover ? 'Already Cover Photo' : 'Set as Cover Photo'}
                    </button>

                    <button
                      onClick={() => {
                        startEditingName(viewingImage);
                        setViewingImage(null);
                      }}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-900 text-white rounded-xl text-sm md:text-base font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      Rename Photo
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this photo?')) {
                          removeImage(selectedCategory, viewingImage.id);
                          setViewingImage(null);
                        }
                      }}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-red-500 text-white rounded-xl text-sm md:text-base font-semibold hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      Delete Photo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotographerPortfolio;