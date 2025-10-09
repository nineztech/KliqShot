'use client';

import { useState, useEffect } from 'react';
import DesktopUserManagement from './DesktopUserManagement';
import MobileUserManagement from './MobileUserManagement';
import { useSidebar } from '@/components/sidebar/SidebarContext';

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

interface UserManagementProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

export default function UserManagement({ users, setUsers }: UserManagementProps) {
  const [isMobile, setIsMobile] = useState(false);
  const { isMinimized } = useSidebar();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div 
      className="transition-all duration-300"
      style={{ marginLeft: isMobile ? '0' : (isMinimized ? '5rem' : '16rem') }}
    >
      {isMobile ? (
        <MobileUserManagement users={users} setUsers={setUsers} />
      ) : (
        <DesktopUserManagement users={users} setUsers={setUsers} />
      )}
    </div>
  );
}

