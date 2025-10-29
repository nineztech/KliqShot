'use client';

import { useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit } from 'react-icons/md';

interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

interface MobileAddOnManagementProps {
  addons: AddOnItem[];
  setAddons: (addons: AddOnItem[]) => void;
}

export default function MobileAddOnManagement({ addons, setAddons }: MobileAddOnManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '' });

  const handleAdd = () => {
    if (!form.name || !form.price) return;
    const newItem: AddOnItem = {
      id: Math.random().toString(36).slice(2),
      name: form.name,
      description: form.description,
      price: Number(form.price) || 0,
      isActive: true,
    };
    setAddons([newItem, ...addons]);
    setForm({ name: '', description: '', price: '' });
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this add-on?')) return;
    setAddons(addons.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-2">
      <div className="admin-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gray-900">Add Ons</h2>
            <p className="text-gray-600 text-sm">Manage photography add-ons</p>
          </div>
          <button onClick={() => setShowAddModal(true)} className="admin-button-primary text-sm px-3 py-2 flex items-center">
            <MdAdd className="w-4 h-4 mr-1" />
            New
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {addons.map((item) => (
          <div key={item.id} className="admin-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-600 mt-1">{item.description}</div>
                <div className="text-sm font-medium text-gray-900 mt-2">₹ {item.price.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg" title="Edit">
                  <MdEdit className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                  <MdDelete className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {addons.length === 0 && (
          <div className="admin-card text-gray-600">No add-ons yet.</div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">New Add-On</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="admin-label">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="admin-input w-full" placeholder="Drone Photography" />
              </div>
              <div>
                <label className="admin-label">Price (₹)</label>
                <input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="admin-input w-full" placeholder="5000" />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="admin-input w-full h-24 resize-none" placeholder="Brief details about this add-on" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowAddModal(false)} className="admin-button-secondary">Cancel</button>
              <button onClick={handleAdd} className="admin-button-primary">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


