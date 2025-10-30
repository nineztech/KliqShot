'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface ComparablePhotographer {
  id: number;
  name: string;
  specialty: string;
  image: string;
  price: string;
  rating: number;
  reviews: number;
  location: string;
  experience: string;
  category: string;
  categories?: string[];
}

interface CompareContextValue {
  selected: ComparablePhotographer[];
  isSelected: (id: number) => boolean;
  toggle: (item: ComparablePhotographer) => void;
  remove: (id: number) => void;
  clear: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

const STORAGE_KEY = 'kliqshot.compare.selected';
const MAX_COMPARE = 3;

export const CompareProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [selected, setSelected] = useState<ComparablePhotographer[]>([]);

  // hydrate from storage (session for the browsing session)
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as ComparablePhotographer[];
        setSelected(Array.isArray(parsed) ? parsed.slice(0, MAX_COMPARE) : []);
      }
    } catch {
      // ignore
    }
  }, []);

  // persist to storage
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
    } catch {
      // ignore
    }
  }, [selected]);

  const isSelected = useCallback((id: number) => selected.some(s => s.id === id), [selected]);

  const toggle = useCallback((item: ComparablePhotographer) => {
    setSelected(prev => {
      const exists = prev.some(p => p.id === item.id);
      if (exists) {
        return prev.filter(p => p.id !== item.id);
      }
      if (prev.length >= MAX_COMPARE) {
        return prev; // silently ignore when full
      }
      return [...prev, item];
    });
  }, []);

  const remove = useCallback((id: number) => {
    setSelected(prev => prev.filter(p => p.id !== id));
  }, []);

  const clear = useCallback(() => setSelected([]), []);

  const value = useMemo(() => ({ selected, isSelected, toggle, remove, clear }), [selected, isSelected, toggle, remove, clear]);

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = (): CompareContextValue => {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
};

export const MAX_COMPARABLE = MAX_COMPARE;


