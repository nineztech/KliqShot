'use client';

import { useState } from 'react';
import Sidebar from '@/components/sidebar';
import UserManagement from '@/components/user';

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

// Sample initial users data
const initialUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    role: 'customer',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2024-03-20',
    bookings: 5
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+91 98765 43211',
    role: 'photographer',
    status: 'active',
    joinDate: '2024-02-10',
    lastActive: '2024-03-21',
    bookings: 0
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@kliqshot.com',
    phone: '+91 98765 43212',
    role: 'admin',
    status: 'active',
    joinDate: '2024-01-01',
    lastActive: '2024-03-22',
    bookings: 0
  },
  {
    id: '4',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    phone: '+91 98765 43213',
    role: 'customer',
    status: 'inactive',
    joinDate: '2024-03-01',
    lastActive: '2024-03-10',
    bookings: 2
  },
  {
    id: '5',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+91 98765 43214',
    role: 'photographer',
    status: 'suspended',
    joinDate: '2024-02-20',
    lastActive: '2024-03-15',
    bookings: 0
  }
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab="users" onTabChange={(tab) => window.location.href = `/${tab}`} />
      <div className="ml-20 transition-all duration-300 p-4 md:p-8">
        <UserManagement users={users} setUsers={setUsers} />
      </div>
    </div>
  );
}

