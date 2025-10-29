'use client';

import React, { useState } from 'react';
import { Camera, Upload, Plus, Trash2, Save, Award, Calendar, MapPin, Briefcase, FolderOpen, Image, Star, Eye } from 'lucide-react';

interface PortfolioImage {
  id: string;
  url: string;
  name: string;
  category: string;
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

const PhotographerPortfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('wedding');
  const [showAddExperience, setShowAddExperience] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  
  const categories = [
    { id: 'wedding', name: 'Wedding Photography', icon: '💒', color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50' },
    { id: 'portrait', name: 'Portrait Sessions', icon: '👤', color: 'from-purple-500 to-indigo-500', bgColor: 'bg-purple-50' },
    { id: 'landscape', name: 'Landscape & Nature', icon: '🏔️', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50' },
    { id: 'event', name: 'Event Coverage', icon: '🎉', color: 'from-yellow-500 to-orange-500', bgColor: 'bg-yellow-50' },
    { id: 'product', name: 'Product Photography', icon: '📦', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50' },
    { id: 'fashion', name: 'Fashion & Editorial', icon: '👗', color: 'from-red-500 to-pink-500', bgColor: 'bg-red-50' }
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
            const imageData: PortfolioImage = {
              id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              url: reader.result as string,
              name: file.name,
              category: selectedCategory
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

  const getCurrentCategory = () => {
    return categories.find(c => c.id === selectedCategory);
  };

  const getTotalImagesCount = () => {
    return Object.values(portfolioImages).reduce((total, imgs) => total + imgs.length, 0);
  };

  const getCategoryExperiences = (categoryId: string) => {
    return experiences.filter(exp => exp.category === categoryId);
  };

  const currentCategory = getCurrentCategory();
  const currentImages = portfolioImages[selectedCategory] || [];
  const currentExperiences = getCategoryExperiences(selectedCategory);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 min-h-screen">
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
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 opacity-0 animate-fadeInDown">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">My Portfolio</h1>
                <p className="text-sm md:text-base text-gray-600 flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  {getTotalImagesCount()} photos across {categories.length} categories
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs - Grid Layout */}
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-indigo-500" />
            Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 overflow-visible">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative rounded-xl transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'ring-4 ring-indigo-500 ring-offset-2 scale-105'
                    : 'hover:scale-105 hover:shadow-lg'
                }`}
              >
                <div className={`relative p-4 bg-gradient-to-br ${category.color} rounded-xl ${
                  selectedCategory === category.id ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'
                }`}>
                  <div className="text-center">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <div className="text-white">
                      <p className="font-bold text-sm mb-1">{category.name.split(' ')[0]}</p>
                      <p className="text-xs opacity-90">{category.name.split(' ').slice(1).join(' ')}</p>
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1 px-2 py-1 bg-white/30 backdrop-blur-sm rounded-full">
                      <Image className="w-3 h-3 text-white" />
                      <span className="text-xs font-bold text-white">{portfolioImages[category.id]?.length || 0}</span>
                    </div>
                  </div>
                </div>
                {selectedCategory === category.id && (
                  <div className="absolute inset-0 border-4 border-white rounded-xl pointer-events-none"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Upload & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-500" />
                Upload Photos
              </h3>
              
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
                  dragActive
                    ? `border-indigo-500 ${currentCategory?.bgColor}`
                    : 'border-gray-300 bg-gray-50'
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-16 h-16 bg-gradient-to-br ${currentCategory?.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <span className="text-3xl">{currentCategory?.icon}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Drop photos here
                    </p>
                    <p className="text-xs text-gray-500">to {currentCategory?.name}</p>
                  </div>
                  <label className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg font-medium">
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

            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-indigo-500" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${currentCategory?.color} text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs opacity-90">Photos</p>
                        <p className="text-2xl font-bold">{currentImages.length}</p>
                      </div>
                    </div>
                    <div className="text-3xl">{currentCategory?.icon}</div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs opacity-90">Experience</p>
                      <p className="text-2xl font-bold">{currentExperiences.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Gallery & Experience */}
          <div className="lg:col-span-2 space-y-6">
            {/* Photo Gallery */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-indigo-500" />
                  Photo Gallery
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${currentCategory?.color} text-white`}>
                  {currentImages.length} Photos
                </span>
              </div>

              {currentImages.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${currentCategory?.color} flex items-center justify-center`}>
                    <span className="text-5xl">{currentCategory?.icon}</span>
                  </div>
                  <p className="text-xl font-semibold text-gray-700 mb-2">No photos yet</p>
                  <p className="text-sm">Upload your first {currentCategory?.name.toLowerCase()} photo to get started!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-white text-sm font-medium truncate mb-2">
                              {image.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => removeImage(selectedCategory, image.id)}
                                className="flex-1 px-3 py-2 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium flex items-center justify-center gap-1"
                              >
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className={`absolute top-2 left-2 px-2 py-1 bg-gradient-to-r ${currentCategory?.color} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            View
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Experience Section */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 opacity-0 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-500" />
                  Experience in {currentCategory?.name}
                </h3>
                <button
                  onClick={() => setShowAddExperience(!showAddExperience)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-medium flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Experience
                </button>
              </div>

              {/* Add Experience Form */}
              {showAddExperience && (
                <div className={`rounded-xl p-6 mb-6 border-2 ${currentCategory?.bgColor} border-gray-200`}>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="text-2xl">{currentCategory?.icon}</span>
                    New Experience for {currentCategory?.name}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Job Title *"
                      value={newExperience.title}
                      onChange={(e) => setNewExperience({...newExperience, title: e.target.value, category: selectedCategory})}
                      className="px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Company/Studio *"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({...newExperience, company: e.target.value, category: selectedCategory})}
                      className="px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={newExperience.location}
                      onChange={(e) => setNewExperience({...newExperience, location: e.target.value, category: selectedCategory})}
                      className="px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Start Date (e.g., Jan 2020)"
                      value={newExperience.startDate}
                      onChange={(e) => setNewExperience({...newExperience, startDate: e.target.value, category: selectedCategory})}
                      className="px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                    <input
                      type="text"
                      placeholder="End Date (or 'Present')"
                      value={newExperience.endDate}
                      onChange={(e) => setNewExperience({...newExperience, endDate: e.target.value, category: selectedCategory})}
                      className="px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={newExperience.description}
                    onChange={(e) => setNewExperience({...newExperience, description: e.target.value, category: selectedCategory})}
                    className="w-full mt-4 px-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none"
                    rows={3}
                  />
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={addExperience}
                      className="px-6 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 font-medium flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Experience
                    </button>
                    <button
                      onClick={() => setShowAddExperience(false)}
                      className="px-6 py-2 text-sm bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Experience List */}
              {currentExperiences.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${currentCategory?.color} flex items-center justify-center`}>
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-lg font-semibold text-gray-700 mb-2">No experience added yet</p>
                  <p className="text-sm">Share your achievements in {currentCategory?.name.toLowerCase()}!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {currentExperiences.map((exp, idx) => (
                    <div 
                      key={exp.id} 
                      className="group relative p-6 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 opacity-0 animate-fadeInLeft bg-white overflow-hidden"
                      style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
                    >
                      <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${currentCategory?.color} group-hover:w-2 transition-all duration-300`}></div>
                      
                      <div className="flex justify-between items-start mb-4 gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentCategory?.color} flex items-center justify-center shadow-md`}>
                              <span className="text-xl">{currentCategory?.icon}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-lg font-bold text-gray-900 truncate">{exp.title}</h4>
                              <p className="text-sm text-indigo-600 font-semibold truncate">{exp.company}</p>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeExperience(exp.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 hover:scale-110 flex-shrink-0"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 mb-3">
                        {exp.location && (
                          <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{exp.location}</span>
                          </span>
                        )}
                        <span className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      
                      {exp.description && (
                        <p className="text-sm text-gray-700 leading-relaxed pl-13">{exp.description}</p>
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
  );
};

export default PhotographerPortfolio;