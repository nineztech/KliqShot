'use client';

import Sidebar from '@/components/sidebar';
import AddOnManagement from '@/components/addon';
import { useState } from 'react';

interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

export default function AddOnsPage() {
  const [addons, setAddons] = useState<AddOnItem[]>([]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="addons" onTabChange={(tab) => (window.location.href = `/${tab}`)} />
      <div className="pt-16 transition-all duration-300 p-4 md:p-8">
        <AddOnManagement addons={addons} setAddons={setAddons} />
      </div>
    </div>
  );
}


