import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  date: string;
  status: 'active' | 'inactive';
}

interface Appointment {
  date: string;
  time: string;
  type: string;
  doctor: string;
  status: 'confirmed' | 'pending';
}

const MobileUserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('appointments');

  const appointments: Appointment[] = [
    {
      date: '26 Mei 2025',
      time: '10:00',
      type: 'Cardiology',
      doctor: 'Dr.Smith',
      status: 'confirmed'
    },
    {
      date: '27 Dec 2024',
      time: '14:00',
      type: 'Teeth',
      doctor: 'Dr.Williams',
      status: 'confirmed'
    }
  ];

  const documents: Document[] = [
    { id: '1', name: 'Chest X-Ray Result.pdf', date: '28 Mar 2025', status: 'active' },
    { id: '2', name: 'Lipnea Lab Result.pdf', date: '28 Mar 2025', status: 'inactive' },
    { id: '3', name: 'Blood Lab Result.pdf', date: '28 Mar 2025', status: 'inactive' },
    { id: '4', name: 'Chest X-Ray Result.pdf', date: '28 Mar 2025', status: 'inactive' }
  ];

  const notes = [
    { title: 'Note 01-05-24.txt.pdf', date: '28 Mar 2025' },
    { title: 'Note 01-05-24.p.pdf', date: '28 Mar 2025' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - User Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>
                
                <h2 className="mt-4 text-xl font-semibold text-gray-900">Irene Phyton//Phife</h2>
                <p className="text-sm text-gray-500">irene.phyton@gmail.com</p>
                <p className="text-sm text-gray-500 mt-1">Jakarta, Indonesia</p>
                
                <button className="mt-4 w-full py-2 px-4 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors">
                  Edit Profile
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="mt-6 space-y-2">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`w-full py-2.5 px-4 rounded-lg text-left transition-colors ${
                    activeTab === 'personal'
                      ? 'bg-cyan-50 text-cyan-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab('appointments')}
                  className={`w-full py-2.5 px-4 rounded-lg text-left transition-colors ${
                    activeTab === 'appointments'
                      ? 'bg-cyan-50 text-cyan-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Appointments
                </button>
                <button
                  onClick={() => setActiveTab('records')}
                  className={`w-full py-2.5 px-4 rounded-lg text-left transition-colors ${
                    activeTab === 'records'
                      ? 'bg-cyan-50 text-cyan-600 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Medical records
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* General Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">General Information</h3>
                <button className="text-cyan-500 hover:text-cyan-600 text-sm font-medium">
                  Edit
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <p className="text-sm text-gray-500">Date of Birth</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">July 28, 2000</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">Female</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">+123 456 7890</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Blood Type</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">O+</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">Srengseng, Kec Kb, Jakarta</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Insurance Provider</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">2365846</p>
                </div>
              </div>
            </div>

            {/* Appointments Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Appointments</h3>
                <button className="text-cyan-500 hover:text-cyan-600 text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {appointments.map((apt, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-cyan-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">{apt.date.split(' ')[1]}</p>
                        <p className="text-lg font-semibold text-gray-900">{apt.date.split(' ')[0]}</p>
                        <p className="text-xs text-gray-500">{apt.date.split(' ')[2]}</p>
                      </div>
                      <div className="h-12 w-px bg-gray-200"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{apt.time}</p>
                        <p className="text-sm text-gray-500">{apt.type}</p>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm text-gray-500">{apt.doctor}</p>
                      </div>
                    </div>
                    <button className="px-4 py-1.5 bg-cyan-500 text-white text-sm rounded-lg hover:bg-cyan-600 transition-colors">
                      {apt.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Files Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Files</h3>
                <button className="text-cyan-500 hover:text-cyan-600 text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                        <p className="text-xs text-gray-500">{doc.date}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes Section */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Notes</h3>
                <button className="text-cyan-500 hover:text-cyan-600 text-sm font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {notes.map((note, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{note.title}</p>
                        <p className="text-xs text-gray-500">{note.date}</p>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileUserProfile;