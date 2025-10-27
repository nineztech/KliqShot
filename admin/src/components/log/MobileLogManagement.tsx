'use client';

import { useState } from 'react';
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
  MdExpandMore,
  MdChevronRight
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

interface MobileLogManagementProps {
  logs: Log[];
  setLogs: (logs: Log[]) => void;
}

export default function MobileLogManagement({ logs, setLogs }: MobileLogManagementProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'today' | 'yesterday' | 'week' | 'month'>('today');
  const [expandedLogs, setExpandedLogs] = useState<string[]>([]);
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Sample log data (same as desktop)
  const sampleLogs: Log[] = [
    { id: '1', logId: 'LOG-001', clientName: 'Rajesh Kumar', clientEmail: 'rajesh.kumar@example.com', action: 'viewed profile', targetType: 'photographer', targetName: 'Arjun Singh - Wedding Photographer', timestamp: '2024-02-20 10:30 AM', duration: '5 minutes', ipAddress: '192.168.1.1', device: 'Mobile (iOS)' },
    { id: '2', logId: 'LOG-002', clientName: 'Priya Sharma', clientEmail: 'priya.sharma@example.com', action: 'viewed profile', targetType: 'photographer', targetName: 'Vikram Patel - Pre-Wedding Specialist', timestamp: '2024-02-20 09:15 AM', duration: '3 minutes', ipAddress: '192.168.1.2', device: 'Desktop (Windows)' },
    { id: '3', logId: 'LOG-003', clientName: 'Amit Verma', clientEmail: 'amit.verma@example.com', action: 'viewed profile', targetType: 'photographer', targetName: 'Rahul Mehta - Corporate Photographer', timestamp: '2024-02-20 08:45 AM', duration: '8 minutes', ipAddress: '192.168.1.3', device: 'Mobile (Android)' },
    { id: '4', logId: 'LOG-004', clientName: 'Sneha Reddy', clientEmail: 'sneha.reddy@example.com', action: 'viewed package', targetType: 'package', targetName: 'Platinum Package', timestamp: '2024-02-20 07:30 AM', duration: '4 minutes', ipAddress: '192.168.1.4', device: 'Tablet (iPad)' },
    { id: '5', logId: 'LOG-005', clientName: 'Rohit Malhotra', clientEmail: 'rohit.malhotra@example.com', action: 'searched', targetType: 'other', targetName: 'Wedding Photographers in Mumbai', timestamp: '2024-02-20 06:00 AM', duration: '12 minutes', ipAddress: '192.168.1.5', device: 'Desktop (Mac)' },
    { id: '6', logId: 'LOG-006', clientName: 'Kavya Nair', clientEmail: 'kavya.nair@example.com', action: 'viewed profile', targetType: 'photographer', targetName: 'Karan Chopra - Travel Photographer', timestamp: '2024-02-20 04:30 AM', duration: '6 minutes', ipAddress: '192.168.1.6', device: 'Mobile (iOS)' },
    { id: '7', logId: 'LOG-007', clientName: 'Vikram Sood', clientEmail: 'vikram.sood@example.com', action: 'viewed category', targetType: 'category', targetName: 'Wedding Photography', timestamp: '2024-02-20 02:00 PM', duration: '15 minutes', ipAddress: '192.168.1.7', device: 'Desktop (Windows)' },
    { id: '8', logId: 'LOG-008', clientName: 'Shreya Agarwal', clientEmail: 'shreya.agarwal@example.com', action: 'viewed profile', targetType: 'photographer', targetName: 'Aditya Kumar - Haldi Specialist', timestamp: '2024-02-20 01:45 PM', duration: '7 minutes', ipAddress: '192.168.1.8', device: 'Mobile (Android)' },
    { id: '9', logId: 'LOG-009', clientName: 'Rohan Gupta', clientEmail: 'rohan.gupta@example.com', action: 'viewed package', targetType: 'package', targetName: 'Gold Package', timestamp: '2024-02-20 01:30 PM', duration: '5 minutes', ipAddress: '192.168.1.9', device: 'Desktop (Mac)' },
    { id: '10', logId: 'LOG-010', clientName: 'Isha Patel', clientEmail: 'isha.patel@example.com', action: 'viewed profile', targetType: 'photographer', targetName: 'Siddharth Rao - Destination Wedding Specialist', timestamp: '2024-02-20 12:00 PM', duration: '10 minutes', ipAddress: '192.168.1.10', device: 'Tablet (iPad)' }
  ];

  const [allLogs, setAllLogs] = useState<Log[]>(sampleLogs);

  const filteredLogs = allLogs.filter(log => {
    const matchesSearch = searchTerm === '' || 
      log.logId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.targetName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const toggleLogExpansion = (logId: string) => {
    setExpandedLogs(prev => 
      prev.includes(logId) 
        ? prev.filter(id => id !== logId)
        : [...prev, logId]
    );
  };

  const getTargetTypeColor = (type: string) => {
    switch (type) {
      case 'photographer': return 'bg-blue-100 text-blue-800';
      case 'package': return 'bg-purple-100 text-purple-800';
      case 'category': return 'bg-green-100 text-green-800';
      case 'booking': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-full">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Activity Logs</h1>
        <p className="text-sm text-gray-600">Track client interactions</p>
      </div>

      {/* Search */}
      <div className="mb-4">
        <div className="relative">
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm p-3 mb-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setActiveTab('today')}
            className={`text-sm px-3 py-2 rounded-lg border transition-colors ${
              activeTab === 'today' ? 'bg-blue-100 border-blue-500 text-blue-700' : 'border-gray-300'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setActiveTab('week')}
            className={`text-sm px-3 py-2 rounded-lg border transition-colors ${
              activeTab === 'week' ? 'bg-blue-100 border-blue-500 text-blue-700' : 'border-gray-300'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <div key={log.id} className="bg-white rounded-lg shadow-sm p-4">
            <button
              onClick={() => toggleLogExpansion(log.id)}
              className="w-full flex items-center justify-between mb-3"
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-gray-900">{log.clientName}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTargetTypeColor(log.targetType)}`}>
                    {log.targetType}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{log.action}</p>
              </div>
              {expandedLogs.includes(log.id) ? (
                <MdExpandMore className="w-5 h-5 text-gray-400" />
              ) : (
                <MdChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {/* Expanded Details */}
            {expandedLogs.includes(log.id) && (
              <div className="pt-3 space-y-3 border-t border-gray-200">
                <div>
                  <label className="text-xs font-medium text-gray-500">Target</label>
                  <p className="text-sm text-gray-900">{log.targetName}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-gray-500">Duration</label>
                    <p className="text-sm text-gray-900">{log.duration}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">Time</label>
                    <p className="text-sm text-gray-900">{log.timestamp}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedLog(log);
                    setShowDetailModal(true);
                  }}
                  className="w-full text-center text-sm text-blue-600 hover:text-blue-800 py-2"
                >
                  View Full Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500">No logs found</p>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedLog && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">{selectedLog.logId}</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <MdClose className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Client Information</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-medium text-gray-500">Name</label>
                      <p className="text-sm text-gray-900">{selectedLog.clientName}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Email</label>
                      <p className="text-sm text-gray-900">{selectedLog.clientEmail}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Activity</h3>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-medium text-gray-500">Action</label>
                      <p className="text-sm text-gray-900 capitalize">{selectedLog.action}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500">Target</label>
                      <p className="text-sm text-gray-900">{selectedLog.targetName}</p>
                    </div>
                    {selectedLog.duration && (
                      <div>
                        <label className="text-xs font-medium text-gray-500">Duration</label>
                        <p className="text-sm text-gray-900">{selectedLog.duration}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500">Timestamp</label>
                  <p className="text-sm text-gray-900">{selectedLog.timestamp}</p>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-4 py-3">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

