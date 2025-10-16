'use client';

import Sidebar from '@/components/sidebar';
import CategoryManagement from '@/components/category';
import { useState, useEffect } from 'react';
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

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError('');
      const response = await categoryApi.getAll();
      
      if (response.success && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err: any) {
      console.error('Error fetching categories:', err);
      setError(err.message || 'Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="categories" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="pt-16 transition-all duration-300 p-4 md:p-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading categories...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchCategories}
              className="mt-2 text-sm text-red-700 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        ) : (
          <CategoryManagement 
            categories={categories} 
            setCategories={setCategories}
            onRefresh={fetchCategories}
          />
        )}
      </div>
    </div>
  );
}

