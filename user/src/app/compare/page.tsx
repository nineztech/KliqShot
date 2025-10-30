'use client';

import { useMemo } from 'react';
import { useCompare } from '@/components/compare/CompareContext';
import { CheckCircleIcon, XCircleIcon, StarIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/navigation';

export default function ComparePage() {
  const { selected } = useCompare();
  const router = useRouter();

  const columns = useMemo(() => selected.slice(0, 4), [selected]);

  if (columns.length < 2) {
    // If user lands here without enough items, redirect back
    if (typeof window !== 'undefined') router.push('/');
    return null;
  }

  const rows: { key: string; label: string; render: (i: number) => React.ReactNode }[] = [
    { key: 'specialty', label: 'Specialty', render: (i) => columns[i]?.specialty },
    { key: 'price', label: 'Price', render: (i) => columns[i]?.price },
    { key: 'rating', label: 'Rating', render: (i) => (
      <div className="flex items-center gap-1">
        <span className="font-medium">{columns[i]?.rating}</span>
        <StarIcon className="w-4 h-4 text-yellow-400" />
        <span className="text-gray-500 text-sm">({columns[i]?.reviews})</span>
      </div>
    ) },
    { key: 'location', label: 'Location', render: (i) => columns[i]?.location },
    { key: 'experience', label: 'Experience', render: (i) => columns[i]?.experience },
    { key: 'category', label: 'Primary Category', render: (i) => columns[i]?.category },
    { key: 'categories', label: 'Tags', render: (i) => (
      <div className="flex flex-wrap gap-1">
        {(columns[i]?.categories || []).map((c) => (
          <span key={c} className="px-2 py-0.5 rounded-full bg-gray-100 border border-gray-200 text-xs text-gray-700">{c}</span>
        ))}
      </div>
    ) },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Compare Photographers</h1>
          <p className="text-gray-600">Choose the best by comparing up to 4 photographers side by side.</p>
        </div>

        {/* Header cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
          {columns.map((p) => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-3">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md mb-3">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="font-semibold text-gray-900 truncate" title={p.name}>{p.name}</div>
              <div className="text-sm text-gray-600">{p.specialty}</div>
            </div>
          ))}
        </div>

        {/* Comparison grid */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="grid" style={{ gridTemplateColumns: `260px repeat(${columns.length}, minmax(0, 1fr))` }}>
            <div className="bg-gray-50 p-3 font-semibold text-gray-900 border-b border-gray-200">RFQ Overview</div>
            {columns.map((_, i) => (
              <div key={i} className="bg-gray-50 p-3 font-semibold text-gray-900 border-b border-gray-200">&nbsp;</div>
            ))}

            {rows.map((row) => (
              <>
                <div key={`${row.key}-label`} className="p-3 border-t border-gray-200 bg-gray-50 text-sm font-medium text-gray-700">
                  {row.label}
                </div>
                {columns.map((_, i) => (
                  <div key={`${row.key}-${i}`} className="p-3 border-t border-gray-200 text-sm text-gray-800">
                    {row.render(i)}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


