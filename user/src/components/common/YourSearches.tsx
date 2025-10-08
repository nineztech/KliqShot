'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface SearchItem {
  id: number;
  query: string;
  category: string;
  timestamp: string;
  resultCount: number;
}

interface YourSearchesProps {
  searches?: SearchItem[];
}

export default function YourSearches({ searches }: YourSearchesProps) {
  const [searchHistory, setSearchHistory] = useState<SearchItem[]>(
    searches || [
      {
        id: 1,
        query: "Wedding photographer near me",
        category: "Wedding Photography",
        timestamp: "2 hours ago",
        resultCount: 24
      },
      {
        id: 2,
        query: "Portrait photographer Mumbai",
        category: "Portrait Photography",
        timestamp: "1 day ago",
        resultCount: 18
      },
      {
        id: 3,
        query: "Pre wedding shoot",
        category: "Pre Wedding",
        timestamp: "3 days ago",
        resultCount: 32
      },
      {
        id: 4,
        query: "Baby photographer",
        category: "Baby Photography",
        timestamp: "1 week ago",
        resultCount: 15
      },
      {
        id: 5,
        query: "Event photographer Delhi",
        category: "Event Photography",
        timestamp: "2 weeks ago",
        resultCount: 28
      }
    ]
  );

  const [showAll, setShowAll] = useState(false);

  const displayedSearches = showAll ? searchHistory : searchHistory.slice(0, 3);

  const clearSearch = (id: number) => {
    setSearchHistory(prev => prev.filter(search => search.id !== id));
  };

  const clearAllSearches = () => {
    setSearchHistory([]);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Your Recent Searches</h2>
      </div>

      {searchHistory.length === 0 ? (
        <div className="text-center py-8">
          <MagnifyingGlassIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No recent searches found</p>
          <p className="text-sm text-gray-400 mt-1">Start searching for photographers to see your history here</p>
        </div>
      ) : (
        <>
          <div className="space-y-3">
            {displayedSearches.map((search) => (
              <div
                key={search.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {search.query}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {search.category}
                      </span>
                      <span>•</span>
                      <span>{search.resultCount} results</span>
                      <span>•</span>
                      <span>{search.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                    Search again
                  </button>
                  <button
                    onClick={() => clearSearch(search.id)}
                    className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 transition-all duration-200"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {searchHistory.length > 3 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
              >
                {showAll ? 'Show less' : `Show all ${searchHistory.length} searches`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
