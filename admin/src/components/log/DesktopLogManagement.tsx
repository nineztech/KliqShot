'use client';

import { useState, useMemo } from 'react';
import { 
  MdSearch,
  MdVisibility,
  MdPerson,
  MdAccessTime,
  MdLocationOn,
  MdPhoneAndroid,
  MdCalendarToday,
  MdInfo,
  MdClose,
  MdPeople,
  MdFilterList
} from 'react-icons/md';

interface Log {
  id: string;
  logId: string;
  clientName: string;
  clientEmail: string;
  action: string;
  targetType: 'photographer' | 'package' | 'category' | 'booking' | 'other';
  targetName: string;
  timestamp: string;
  duration?: string;
  ipAddress?: string;
  device?: string;
}

interface DesktopLogManagementProps {
  logs: Log[];
  setLogs: (logs: Log[]) => void;
}

type TabType = 'today' | 'yesterday' | 'week' | 'month';

// Helper to get current date string
const getDateString = (daysOffset: number, time: string) => {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day} ${time}`;
};

// Sample log data - Using current dates dynamically
const createSampleLogs = (): Log[] => [
    // Today's logs
    {
      id: '1',
      logId: 'LOG-001',
      clientName: 'Rajesh Kumar',
      clientEmail: 'rajesh.kumar@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Arjun Singh - Wedding Photographer',
      timestamp: getDateString(0, '10:30 AM'),
      duration: '5 minutes',
      ipAddress: '192.168.1.1',
      device: 'Mobile (iOS)'
    },
    {
      id: '2',
      logId: 'LOG-002',
      clientName: 'Priya Sharma',
      clientEmail: 'priya.sharma@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Vikram Patel - Pre-Wedding Specialist',
      timestamp: getDateString(0, '09:15 AM'),
      duration: '3 minutes',
      ipAddress: '192.168.1.2',
      device: 'Desktop (Windows)'
    },
    {
      id: '3',
      logId: 'LOG-003',
      clientName: 'Amit Verma',
      clientEmail: 'amit.verma@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Rahul Mehta - Corporate Photographer',
      timestamp: getDateString(0, '08:45 AM'),
      duration: '8 minutes',
      ipAddress: '192.168.1.3',
      device: 'Mobile (Android)'
    },
    {
      id: '4',
      logId: 'LOG-004',
      clientName: 'Sneha Reddy',
      clientEmail: 'sneha.reddy@example.com',
      action: 'viewed package',
      targetType: 'package',
      targetName: 'Platinum Package',
      timestamp: getDateString(0, '07:30 AM'),
      duration: '4 minutes',
      ipAddress: '192.168.1.4',
      device: 'Tablet (iPad)'
    },
    {
      id: '5',
      logId: 'LOG-005',
      clientName: 'Rohit Malhotra',
      clientEmail: 'rohit.malhotra@example.com',
      action: 'searched',
      targetType: 'other',
      targetName: 'Wedding Photographers in Mumbai',
      timestamp: getDateString(0, '06:00 AM'),
      duration: '12 minutes',
      ipAddress: '192.168.1.5',
      device: 'Desktop (Mac)'
    },
    {
      id: '6',
      logId: 'LOG-006',
      clientName: 'Kavya Nair',
      clientEmail: 'kavya.nair@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Karan Chopra - Travel Photographer',
      timestamp: getDateString(0, '04:30 AM'),
      duration: '6 minutes',
      ipAddress: '192.168.1.6',
      device: 'Mobile (iOS)'
    },
    {
      id: '7',
      logId: 'LOG-007',
      clientName: 'Vikram Sood',
      clientEmail: 'vikram.sood@example.com',
      action: 'viewed category',
      targetType: 'category',
      targetName: 'Wedding Photography',
      timestamp: getDateString(0, '02:00 PM'),
      duration: '15 minutes',
      ipAddress: '192.168.1.7',
      device: 'Desktop (Windows)'
    },
    {
      id: '8',
      logId: 'LOG-008',
      clientName: 'Shreya Agarwal',
      clientEmail: 'shreya.agarwal@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Aditya Kumar - Haldi Specialist',
      timestamp: getDateString(0, '01:45 PM'),
      duration: '7 minutes',
      ipAddress: '192.168.1.8',
      device: 'Mobile (Android)'
    },
    {
      id: '9',
      logId: 'LOG-009',
      clientName: 'Rohan Gupta',
      clientEmail: 'rohan.gupta@example.com',
      action: 'viewed package',
      targetType: 'package',
      targetName: 'Gold Package',
      timestamp: getDateString(0, '01:30 PM'),
      duration: '5 minutes',
      ipAddress: '192.168.1.9',
      device: 'Desktop (Mac)'
    },
    {
      id: '10',
      logId: 'LOG-010',
      clientName: 'Isha Patel',
      clientEmail: 'isha.patel@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Siddharth Rao - Destination Wedding Specialist',
      timestamp: getDateString(0, '12:00 PM'),
      duration: '10 minutes',
      ipAddress: '192.168.1.10',
      device: 'Tablet (iPad)'
    },
    {
      id: '11',
      logId: 'LOG-011',
      clientName: 'Aditya Khanna',
      clientEmail: 'aditya.khanna@example.com',
      action: 'searched',
      targetType: 'other',
      targetName: 'Corporate Event Photographers',
      timestamp: getDateString(0, '11:00 AM'),
      duration: '8 minutes',
      ipAddress: '192.168.1.11',
      device: 'Mobile (iOS)'
    },
    {
      id: '12',
      logId: 'LOG-012',
      clientName: 'Deepika Reddy',
      clientEmail: 'deepika.reddy@example.com',
      action: 'viewed category',
      targetType: 'category',
      targetName: 'Pre-Wedding Photography',
      timestamp: getDateString(0, '10:00 AM'),
      duration: '12 minutes',
      ipAddress: '192.168.1.12',
      device: 'Desktop (Windows)'
    },
    // Yesterday's logs
    {
      id: '13',
      logId: 'LOG-013',
      clientName: 'Meera Joshi',
      clientEmail: 'meera.joshi@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Prateek Sharma - Portrait Photographer',
      timestamp: getDateString(-1, '11:00 PM'),
      duration: '6 minutes',
      ipAddress: '192.168.1.13',
      device: 'Mobile (iOS)'
    },
    {
      id: '14',
      logId: 'LOG-014',
      clientName: 'Kabir Kapoor',
      clientEmail: 'kabir.kapoor@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Kunal Verma - Fashion Photographer',
      timestamp: getDateString(-1, '10:30 PM'),
      duration: '4 minutes',
      ipAddress: '192.168.1.14',
      device: 'Mobile (Android)'
    },
    {
      id: '15',
      logId: 'LOG-015',
      clientName: 'Neha Gupta',
      clientEmail: 'neha.gupta@example.com',
      action: 'viewed package',
      targetType: 'package',
      targetName: 'Silver Package',
      timestamp: getDateString(-1, '09:30 PM'),
      duration: '7 minutes',
      ipAddress: '192.168.1.15',
      device: 'Desktop (Windows)'
    },
    {
      id: '16',
      logId: 'LOG-016',
      clientName: 'Anjali Verma',
      clientEmail: 'anjali.verma@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Nikhil Desai - Pet Photographer',
      timestamp: getDateString(-1, '08:00 PM'),
      duration: '9 minutes',
      ipAddress: '192.168.1.16',
      device: 'Tablet (iPad)'
    },
    {
      id: '17',
      logId: 'LOG-017',
      clientName: 'Sandeep Reddy',
      clientEmail: 'sandeep.reddy@example.com',
      action: 'viewed category',
      targetType: 'category',
      targetName: 'Corporate Photography',
      timestamp: getDateString(-1, '07:00 PM'),
      duration: '11 minutes',
      ipAddress: '192.168.1.17',
      device: 'Desktop (Mac)'
    },
    {
      id: '18',
      logId: 'LOG-018',
      clientName: 'Preeti Agarwal',
      clientEmail: 'preeti.agarwal@example.com',
      action: 'searched',
      targetType: 'other',
      targetName: 'Birthday Photographers in Delhi',
      timestamp: getDateString(-1, '06:00 PM'),
      duration: '14 minutes',
      ipAddress: '192.168.1.18',
      device: 'Mobile (iOS)'
    },
    // This week's logs
    {
      id: '19',
      logId: 'LOG-019',
      clientName: 'Rajesh Kumar',
      clientEmail: 'rajesh.kumar@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Manish Patel - Product Photographer',
      timestamp: getDateString(-2, '05:00 PM'),
      duration: '3 minutes',
      ipAddress: '192.168.1.19',
      device: 'Mobile (Android)'
    },
    {
      id: '20',
      logId: 'LOG-020',
      clientName: 'Manish Tiwari',
      clientEmail: 'manish.tiwari@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Suresh Nair - Event Photographer',
      timestamp: getDateString(-3, '04:00 PM'),
      duration: '8 minutes',
      ipAddress: '192.168.1.20',
      device: 'Desktop (Windows)'
    },
    {
      id: '21',
      logId: 'LOG-021',
      clientName: 'Sunita Iyer',
      clientEmail: 'sunita.iyer@example.com',
      action: 'viewed package',
      targetType: 'package',
      targetName: 'Basic Package',
      timestamp: getDateString(-4, '03:00 PM'),
      duration: '5 minutes',
      ipAddress: '192.168.1.21',
      device: 'Mobile (iOS)'
    },
    {
      id: '22',
      logId: 'LOG-022',
      clientName: 'Akash Joshi',
      clientEmail: 'akash.joshi@example.com',
      action: 'viewed category',
      targetType: 'category',
      targetName: 'Travel Photography',
      timestamp: getDateString(-5, '02:00 PM'),
      duration: '18 minutes',
      ipAddress: '192.168.1.22',
      device: 'Tablet (iPad)'
    },
    {
      id: '23',
      logId: 'LOG-023',
      clientName: 'Pooja Saxena',
      clientEmail: 'pooja.saxena@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Gaurav Mehta - Music Video Producer',
      timestamp: getDateString(-6, '01:00 PM'),
      duration: '6 minutes',
      ipAddress: '192.168.1.23',
      device: 'Desktop (Mac)'
    },
    // This month's logs
    {
      id: '24',
      logId: 'LOG-024',
      clientName: 'Vishal Agarwal',
      clientEmail: 'vishal.agarwal@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Manoj Kumar - Drone Photographer',
      timestamp: getDateString(-7, '12:00 PM'),
      duration: '7 minutes',
      ipAddress: '192.168.1.24',
      device: 'Mobile (Android)'
    },
    {
      id: '25',
      logId: 'LOG-025',
      clientName: 'Swati Joshi',
      clientEmail: 'swati.joshi@example.com',
      action: 'viewed booking',
      targetType: 'booking',
      targetName: 'Booking #BK042 - Wedding Event',
      timestamp: getDateString(-10, '11:00 AM'),
      duration: '4 minutes',
      ipAddress: '192.168.1.25',
      device: 'Mobile (iOS)'
    },
    {
      id: '26',
      logId: 'LOG-026',
      clientName: 'Kiran Sharma',
      clientEmail: 'kiran.sharma@example.com',
      action: 'viewed profile',
      targetType: 'photographer',
      targetName: 'Deepak Patel - Aerial Photographer',
      timestamp: getDateString(-12, '10:00 AM'),
      duration: '9 minutes',
      ipAddress: '192.168.1.26',
      device: 'Desktop (Windows)'
    },
    {
      id: '27',
      logId: 'LOG-027',
      clientName: 'Harsh Patel',
      clientEmail: 'harsh.patel@example.com',
      action: 'viewed package',
      targetType: 'package',
      targetName: 'Custom Package',
      timestamp: getDateString(-15, '09:00 AM'),
      duration: '12 minutes',
      ipAddress: '192.168.1.27',
      device: 'Tablet (iPad)'
    },
    {
      id: '28',
      logId: 'LOG-028',
      clientName: 'Nikhil Gupta',
      clientEmail: 'nikhil.gupta@example.com',
      action: 'searched',
      targetType: 'other',
      targetName: 'Fashion Photographers in Bangalore',
      timestamp: getDateString(-17, '08:00 AM'),
      duration: '10 minutes',
      ipAddress: '192.168.1.28',
      device: 'Mobile (Android)'
    },
    {
      id: '29',
      logId: 'LOG-029',
      clientName: 'Anita Desai',
      clientEmail: 'anita.desai@example.com',
      action: 'viewed category',
      targetType: 'category',
      targetName: 'Fashion Photography',
      timestamp: getDateString(-19, '07:00 AM'),
      duration: '16 minutes',
      ipAddress: '192.168.1.29',
      device: 'Desktop (Mac)'
    }
  ];

export default function DesktopLogManagement({ logs, setLogs }: DesktopLogManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<TabType>('today');
  const [targetTypeFilter, setTargetTypeFilter] = useState('all');
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Sample team members
  const teamMembers = [
    'John Smith', 
    'Sarah Johnson', 
    'Mike Wilson', 
    'Emily Davis',
    'David Brown'
  ];

  const [allLogs, setAllLogs] = useState<Log[]>(createSampleLogs());

  // Helper functions to filter logs by date
  const parseDateTime = (dateString: string): Date => {
    // Format: '2024-02-20 10:30 AM'
    try {
      const parts = dateString.split(' ');
      const datePart = parts[0]; // '2024-02-20'
      const timePart = parts[1]; // '10:30'
      const ampm = parts[2]; // 'AM'
      
      const [year, month, day] = datePart.split('-').map(Number);
      const [hours, minutes] = timePart.split(':').map(Number);
      
      let hour24 = hours;
      if (ampm === 'PM' && hours !== 12) hour24 += 12;
      if (ampm === 'AM' && hours === 12) hour24 = 0;
      
      return new Date(year, month - 1, day, hour24, minutes);
    } catch {
      // Fallback to current date if parsing fails
      return new Date();
    }
  };

  const isToday = (dateString: string) => {
    const today = new Date();
    const logDate = parseDateTime(dateString);
    return logDate.toDateString() === today.toDateString();
  };

  const isYesterday = (dateString: string) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const logDate = parseDateTime(dateString);
    return logDate.toDateString() === yesterday.toDateString();
  };

  const isThisWeek = (dateString: string) => {
    const today = new Date();
    const logDate = parseDateTime(dateString);
    const diffTime = today.getTime() - logDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  const isThisMonth = (dateString: string) => {
    const today = new Date();
    const logDate = parseDateTime(dateString);
    return today.getMonth() === logDate.getMonth() && today.getFullYear() === logDate.getFullYear();
  };

  // Filter logs based on active tab
  const filteredLogs = useMemo(() => {
    let tabFilteredLogs = [...allLogs];

    switch (activeTab) {
      case 'today':
        tabFilteredLogs = allLogs.filter(log => isToday(log.timestamp));
        break;
      case 'yesterday':
        tabFilteredLogs = allLogs.filter(log => isYesterday(log.timestamp));
        break;
      case 'week':
        tabFilteredLogs = allLogs.filter(log => isThisWeek(log.timestamp));
        break;
      case 'month':
        tabFilteredLogs = allLogs.filter(log => isThisMonth(log.timestamp));
        break;
    }

    // Apply search filter
    tabFilteredLogs = tabFilteredLogs.filter(log => {
      const matchesSearch = 
        log.logId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTargetType = targetTypeFilter === 'all' || log.targetType === targetTypeFilter;
      
      return matchesSearch && matchesTargetType;
    });

    return tabFilteredLogs;
  }, [allLogs, activeTab, searchTerm, targetTypeFilter]);

  const getTargetTypeColor = (type: string) => {
    switch (type) {
      case 'photographer': return 'bg-blue-100 text-blue-800';
      case 'package': return 'bg-purple-100 text-purple-800';
      case 'category': return 'bg-green-100 text-green-800';
      case 'booking': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (log: Log) => {
    setSelectedLog(log);
    setShowDetailModal(true);
  };

  // Get counts for each tab
  const tabCounts = useMemo(() => {
    return {
      today: allLogs.filter(log => isToday(log.timestamp)).length,
      yesterday: allLogs.filter(log => isYesterday(log.timestamp)).length,
      week: allLogs.filter(log => isThisWeek(log.timestamp)).length,
      month: allLogs.filter(log => isThisMonth(log.timestamp)).length,
    };
  }, [allLogs]);

  return (
    <div className="space-y-4">
      {/* Section 1: Header + Search */}
      <div className="admin-card">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Activity Logs</h2>
            <p className="text-gray-600 text-sm mt-1">Track client interactions and profile visits</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative w-80">
              <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by client, photographer, action..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
              />
            </div>
            <select
              value={targetTypeFilter}
              onChange={(e) => setTargetTypeFilter(e.target.value)}
              className="admin-input min-w-[160px]"
            >
              <option value="all">All Types</option>
              <option value="photographer">Photographer</option>
              <option value="package">Package</option>
              <option value="category">Category</option>
              <option value="booking">Booking</option>
            </select>
          </div>
        </div>
      </div>

      {/* Section 2: Tabs + Content */}
      <div className="admin-card">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('today')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'today'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdCalendarToday className="w-4 h-4" />
                Today
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === 'today' 
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tabCounts.today}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('yesterday')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'yesterday'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdAccessTime className="w-4 h-4" />
                Yesterday
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === 'yesterday' 
                    ? 'bg-purple-100 text-purple-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tabCounts.yesterday}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('week')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'week'
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdInfo className="w-4 h-4" />
                This Week
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === 'week' 
                    ? 'bg-orange-100 text-orange-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tabCounts.week}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('month')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'month'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <MdPeople className="w-4 h-4" />
                This Month
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  activeTab === 'month' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tabCounts.month}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Content - Table */}
        {filteredLogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No activity logs found</div>
            <p className="text-gray-500 text-sm">
              {activeTab === 'today' && "No activity today"}
              {activeTab === 'yesterday' && "No activity yesterday"}
              {activeTab === 'week' && "No activity this week"}
              {activeTab === 'month' && "No activity this month"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto" style={{ maxHeight: '580px' }}>
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Target</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Duration</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Timestamp</th>
                  <th className="px-4 py-1.5 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 relative">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-sm font-semibold shadow-md ring-1 ring-gray-200">
                            {log.clientName.charAt(0).toUpperCase()}
                          </div>
                        </div>
                        <div className="ml-2">
                          <div className="text-sm font-semibold text-gray-900">{log.clientName}</div>
                          <div className="text-xs text-gray-500">{log.clientEmail}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <span className="text-sm text-gray-900 capitalize">{log.action}</span>
                    </td>
                    <td className="px-4 py-1.5">
                      <div className="flex flex-col">
                        <span className={`inline-flex items-center px-1.5 py-0.5 text-xs font-semibold rounded-full w-fit ${getTargetTypeColor(log.targetType)}`}>
                          {log.targetType}
                        </span>
                        <span className="text-sm font-medium text-gray-900 mt-1">{log.targetName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      {log.duration ? (
                        <span className="text-sm text-gray-600 flex items-center gap-1">
                          <MdAccessTime className="w-3 h-3" />
                          {log.duration}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap">
                      <span className="text-xs text-gray-500">{log.timestamp}</span>
                    </td>
                    <td className="px-4 py-1.5 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleViewDetails(log)}
                        className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition-colors"
                        title="View Details"
                      >
                        <MdVisibility className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Log Details Modal */}
      {showDetailModal && selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Activity Log Details</h3>
                <p className="text-sm text-gray-600 mt-1">{selectedLog.logId}</p>
              </div>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <MdClose className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Client Information */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MdPerson className="w-5 h-5" />
                  Client Information
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Name</label>
                    <p className="text-sm font-medium text-gray-900">{selectedLog.clientName}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Email</label>
                    <p className="text-sm font-medium text-gray-900">{selectedLog.clientEmail}</p>
                  </div>
                </div>
              </div>

              {/* Activity Details */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3">Activity Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-600">Action</label>
                    <p className="text-sm font-medium text-gray-900 capitalize">{selectedLog.action}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Target Type</label>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${getTargetTypeColor(selectedLog.targetType)}`}>
                      {selectedLog.targetType}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm text-gray-600">Target</label>
                    <p className="text-sm font-medium text-gray-900">{selectedLog.targetName}</p>
                  </div>
                  {selectedLog.duration && (
                    <div>
                      <label className="text-sm text-gray-600 flex items-center gap-2">
                        <MdAccessTime className="w-4 h-4" />
                        Duration
                      </label>
                      <p className="text-sm font-medium text-gray-900">{selectedLog.duration}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Details */}
              {(selectedLog.ipAddress || selectedLog.device) && (
                <div>
                  <h4 className="text-md font-semibold text-gray-900 mb-3">Technical Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedLog.ipAddress && (
                      <div>
                        <label className="text-sm text-gray-600 flex items-center gap-2">
                          <MdLocationOn className="w-4 h-4" />
                          IP Address
                        </label>
                        <p className="text-sm font-medium text-gray-900">{selectedLog.ipAddress}</p>
                      </div>
                    )}
                    {selectedLog.device && (
                      <div>
                        <label className="text-sm text-gray-600 flex items-center gap-2">
                          <MdPhoneAndroid className="w-4 h-4" />
                          Device
                        </label>
                        <p className="text-sm font-medium text-gray-900">{selectedLog.device}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Timestamp */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MdCalendarToday className="w-5 h-5" />
                  Timestamp
                </h4>
                <p className="text-sm font-medium text-gray-900">{selectedLog.timestamp}</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="admin-button-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

