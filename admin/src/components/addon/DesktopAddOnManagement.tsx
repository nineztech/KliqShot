'use client';

import { useMemo, useState } from 'react';
import { MdAdd, MdClose, MdDelete, MdEdit, MdSearch, MdToggleOff, MdToggleOn } from 'react-icons/md';

interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
}

interface DesktopAddOnManagementProps {
  addons: AddOnItem[];
  setAddons: (addons: AddOnItem[]) => void;
}

export default function DesktopAddOnManagement({ addons, setAddons }: DesktopAddOnManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selected, setSelected] = useState<AddOnItem | null>(null);
  const [form, setForm] = useState({ name: '', description: '', price: '' });
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return addons;
    return addons.filter((a) =>
      a.name.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
    );
  }, [addons, query]);

  const resetForm = () => setForm({ name: '', description: '', price: '' });

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
    resetForm();
    setShowAddModal(false);
  };

  const handleEdit = (item: AddOnItem) => {
    setSelected(item);
    setForm({
      name: item.name,
      description: item.description,
      price: String(item.price),
    });
    setShowEditModal(true);
  };

  const handleUpdate = () => {
    if (!selected) return;
    const updated = addons.map((a) =>
      a.id === selected.id
        ? { ...a, name: form.name, description: form.description, price: Number(form.price) || 0 }
        : a
    );
    setAddons(updated);
    setSelected(null);
    resetForm();
    setShowEditModal(false);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Delete this add-on?')) return;
    setAddons(addons.filter((a) => a.id !== id));
  };

  const toggleActive = (id: string) => {
    setAddons(addons.map((a) => (a.id === id ? { ...a, isActive: !a.isActive } : a)));
  };

  return (
    <div className="space-y-2">
      <div className="admin-card">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Add Ons</h2>
            <p className="text-gray-600 text-sm">Create and manage photography add-ons like Drone, Extra Album, etc.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <MdSearch className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search add-ons"
                className="admin-input pl-10 w-64"
              />
            </div>
            <button onClick={() => setShowAddModal(true)} className="admin-button-primary text-sm px-3 py-2 flex items-center">
              <MdAdd className="w-4 h-4 mr-1" />
              New Add-On
            </button>
          </div>
        </div>
      </div>

      <div className="admin-card">
        {filtered.length === 0 ? (
          <p className="text-gray-600">No add-ons yet. Click "New Add-On" to create one.</p>
        ) : (
          <div className="overflow-x-auto -mx-2">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Name</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Description</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Price</th>
                  <th className="px-3 py-2 text-left text-xs font-semibold text-gray-700">Status</th>
                  <th className="px-3 py-2 text-right text-xs font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 text-sm font-medium text-gray-900">{item.name}</td>
                    <td className="px-3 py-2 text-sm text-gray-600 max-w-md truncate" title={item.description}>{item.description}</td>
                    <td className="px-3 py-2 text-sm text-gray-900">₹ {item.price.toFixed(2)}</td>
                    <td className="px-3 py-2">
                      <button onClick={() => toggleActive(item.id)} className="inline-flex items-center gap-1 text-sm">
                        {item.isActive ? (
                          <><MdToggleOn className="w-5 h-5 text-green-600" /><span className="text-green-700">Active</span></>
                        ) : (
                          <><MdToggleOff className="w-5 h-5 text-gray-400" /><span className="text-gray-600">Inactive</span></>
                        )}
                      </button>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(item)} className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg" title="Edit">
                          <MdEdit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                          <MdDelete className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">Edit Add-On</h3>
              <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600">
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="admin-label">Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="admin-input w-full" />
              </div>
              <div>
                <label className="admin-label">Price (₹)</label>
                <input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="admin-input w-full" />
              </div>
              <div>
                <label className="admin-label">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="admin-input w-full h-24 resize-none" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button onClick={() => setShowEditModal(false)} className="admin-button-secondary">Cancel</button>
              <button onClick={handleUpdate} className="admin-button-primary">Update</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


