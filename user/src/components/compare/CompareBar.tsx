'use client';

import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCompare, MAX_COMPARABLE } from './CompareContext';

export default function CompareBar() {
  const { selected, remove, clear } = useCompare();
  const router = useRouter();

  if (selected.length === 0) return null;

  const canCompare = selected.length >= 2 && selected.length <= MAX_COMPARABLE;

  const handleCompare = () => {
    if (!canCompare) return;
    router.push('/compare');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000]">
      <div className="mx-auto max-w-7xl px-3 pb-3">
        <div className="bg-white/95 backdrop-blur border border-gray-200 rounded-xl shadow-xl p-3 flex items-center gap-2">
          <div className="flex-1 overflow-x-auto">
            <div className="flex items-center gap-2 min-h-[40px]">
              {selected.map(item => (
                <div key={item.id} className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-2 py-1 shrink-0">
                  <img src={item.image} alt={item.name} className="w-6 h-6 rounded object-cover" />
                  <span className="text-sm text-gray-800 whitespace-nowrap max-w-[180px] truncate">{item.name}</span>
                  <button className="p-1 hover:text-red-600 text-gray-500" onClick={() => remove(item.id)} aria-label="Remove from compare">
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clear}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg border border-gray-200"
            >
              Clear
            </button>
            <button
              onClick={handleCompare}
              disabled={!canCompare}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                canCompare ? 'bg-orange-600 text-white hover:bg-orange-700' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Compare
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


