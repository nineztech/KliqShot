'use client';

import { useState } from 'react';
import { 
  MdAdd, 
  MdEdit, 
  MdDelete, 
  MdSearch,
  MdClose,
  MdBlock,
  MdCheckCircle
} from 'react-icons/md';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'photographer' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActive: string;
  bookings: number;
}

interface MobileUserManagementProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

export default function MobileUserManagement({ users, setUsers }: MobileUserManagementProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer' as 'admin' | 'photographer' | 'customer',
    status: 'active' as 'active' | 'inactive' | 'suspended',
    bookings: 0
  });

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const user: User = {
        id: Date.now().toString(),
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        status: newUser.status,
        joinDate: new Date().toISOString().split('T')[0],
        lastActive: new Date().toISOString().split('T')[0],
        bookings: newUser.bookings
      };
      setUsers([...users, user]);
      setNewUser({
        name: '',
        email: '',
        phone: '',
        role: 'customer',
        status: 'active',
        bookings: 0
      });
      setShowAddModal(false);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status,
      bookings: user.bookings
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = () => {
    if (selectedUser && newUser.name && newUser.email) {
      setUsers(users.map(user => 
        user.id === selectedUser.id 
          ? { ...user, ...newUser }
          : user
      ));
      setShowEditModal(false);
      setSelectedUser(null);
      setNewUser({
        name: '',
        email: '',
        phone: '',
        role: 'customer',
        status: 'active',
        bookings: 0
      });
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleStatusChange = (userId: string, newStatus: 'active' | 'inactive' | 'suspended') => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: newStatus }
        : user
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'photographer': return 'bg-blue-100 text-blue-800';
      case 'customer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="admin-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Client</h2>
            <p className="text-gray-600 text-sm">Manage users</p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="admin-button-primary text-sm px-3 py-2"
          >
            <MdAdd className="w-4 h-4 mr-1" />
            Add
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="admin-card p-3">
          <h3 className="text-xs text-gray-600 mb-1">Total Client</h3>
          <p className="text-xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="admin-card p-3">
          <h3 className="text-xs text-gray-600 mb-1">Active</h3>
          <p className="text-xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="admin-card p-4 space-y-3">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input pl-10 w-full"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="admin-input w-full"
        >
          <option value="all">All Roles</option>
          <option value="admin">Admin</option>
          <option value="photographer">Photographer</option>
          <option value="customer">Customer</option>
        </select>
      </div>

      {/* Client List */}
      <div className="space-y-3">
        {filteredUsers.map((user) => (
          <div key={user.id} className="admin-card p-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{user.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{user.email}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                  <p className="text-xs text-gray-500">{user.bookings} bookings</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Joined {user.joinDate}</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <MdEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <MdDelete className="w-4 h-4" />
                    </button>
                    {user.status === 'active' ? (
                      <button
                        onClick={() => handleStatusChange(user.id, 'suspended')}
                        className="p-1 text-orange-600 hover:bg-orange-50 rounded"
                        title="Suspend"
                      >
                        <MdBlock className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(user.id, 'active')}
                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                        title="Activate"
                      >
                        <MdCheckCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Client Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Add Client</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="admin-label">Name *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter user name"
                />
              </div>
              <div>
                <label className="admin-label">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="admin-label">Phone</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="admin-label">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'photographer' | 'customer' })}
                  className="admin-input w-full"
                >
                  <option value="customer">Customer</option>
                  <option value="photographer">Photographer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({ ...newUser, status: e.target.value as 'active' | 'inactive' | 'suspended' })}
                  className="admin-input w-full"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-2 p-4 border-t border-gray-200">
              <button
                onClick={handleAddUser}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Add Client
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Edit User</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="admin-label">Name *</label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter user name"
                />
              </div>
              <div>
                <label className="admin-label">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className="admin-label">Phone</label>
                <input
                  type="tel"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="admin-input w-full"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="admin-label">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'admin' | 'photographer' | 'customer' })}
                  className="admin-input w-full"
                >
                  <option value="customer">Customer</option>
                  <option value="photographer">Photographer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div>
                <label className="admin-label">Status</label>
                <select
                  value={newUser.status}
                  onChange={(e) => setNewUser({ ...newUser, status: e.target.value as 'active' | 'inactive' | 'suspended' })}
                  className="admin-input w-full"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col space-y-2 p-4 border-t border-gray-200">
              <button
                onClick={handleUpdateUser}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Update User
              </button>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-full py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

