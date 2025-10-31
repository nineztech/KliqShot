'use client';

import { useRouter, usePathname } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCompare, MAX_COMPARABLE } from './CompareContext';

export default function CompareBar() {
  const { selected, remove, clear } = useCompare();
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === '/compare') return null;
  if (selected.length === 0) return null;

  const canCompare = selected.length >= 2 && selected.length <= MAX_COMPARABLE;

  const handleCompare = () => {
    if (!canCompare) return;
    router.push('/compare');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1000]">
      <div className="mx-auto max-w-full px-3 pb-2">
        <div className="bg-neutral-900/90 backdrop-blur border border-neutral-800 shadow-2xl p-3 flex items-center gap-3">
          <div className="flex-1 overflow-x-auto">
            <div className="flex items-center gap-2 min-h-[56px]">
              {selected.map(item => (
                <div key={item.id} className="flex items-center gap-2 bg-neutral-800/80 border border-neutral-700 rounded-lg px-2 py-1 shrink-0 hover:border-neutral-500 transition-colors">
                  <img src={item.image} alt={item.name} className="w-6 h-6 rounded object-cover" />
                  <span className="text-sm text-neutral-200 whitespace-nowrap max-w-[180px] truncate">{item.name}</span>
                  <button className="p-1 text-neutral-400 hover:text-red-400" onClick={() => remove(item.id)} aria-label="Remove from compare">
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clear}
              className="px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-lg border border-neutral-700"
            >
              Clear
            </button>
            <button
              onClick={handleCompare}
              disabled={!canCompare}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                canCompare ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20' : 'bg-neutral-800 text-neutral-500 border border-neutral-700 cursor-not-allowed'
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


