'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

export default function EwasteCompliancePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">E-waste Compliance</h1>
          <p className="text-sm text-gray-600 mt-1">Environmental responsibility and electronic waste management</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="prose prose-lg max-w-none">
          
          {/* Introduction */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Commitment to E-waste Management</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At KliqShot, we are committed to responsible electronic waste management and environmental sustainability. 
              We recognize our responsibility to minimize the environmental impact of electronic devices and ensure 
              proper disposal and recycling of electronic waste.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This page outlines our compliance with e-waste management rules and regulations, our commitment to 
              environmental protection, and how you can contribute to responsible e-waste disposal.
            </p>
          </div>

          {/* Compliance Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">E-waste Management Compliance</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Registration Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Company Name:</span>
                  <p className="text-gray-600">KliqShot Internet Private Limited</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Registration Number:</span>
                  <p className="text-gray-600">EW-2024-KLIQ-001</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Registration Date:</span>
                  <p className="text-gray-600">January 15, 2024</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Valid Until:</span>
                  <p className="text-gray-600">January 14, 2027</p>
                </div>
              </div>
            </div>
          </div>

          {/* E-waste Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">E-waste Categories We Handle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Photography Equipment</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Digital cameras</li>
                  <li>• Camera lenses</li>
                  <li>• Camera accessories</li>
                  <li>• Memory cards</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Electronic Devices</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Smartphones</li>
                  <li>• Tablets</li>
                  <li>• Laptops</li>
                  <li>• Chargers & cables</li>
                </ul>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Office Equipment</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Printers</li>
                  <li>• Scanners</li>
                  <li>• Monitors</li>
                  <li>• Networking devices</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Collection Process */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">E-waste Collection Process</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Collection Request</h3>
                  <p className="text-gray-600 text-sm">Contact our e-waste collection team or submit a request through our website.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Scheduling</h3>
                  <p className="text-gray-600 text-sm">We schedule a convenient time for collection at your location.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Collection</h3>
                  <p className="text-gray-600 text-sm">Our certified team collects the e-waste and provides proper documentation.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">4</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Processing</h3>
                  <p className="text-gray-600 text-sm">E-waste is processed at authorized recycling facilities following environmental standards.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact for E-waste Collection</h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Collection Team</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Phone:</span>
                      <a href="tel:+919510102450" className="text-blue-600 hover:underline ml-2">+91 95101 02450</a>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <a href="mailto:ewaste@kliqshot.com" className="text-blue-600 hover:underline ml-2">ewaste@kliqshot.com</a>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Hours:</span>
                      <span className="text-gray-600 ml-2">Mon - Sat: 9:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Registered Office</h3>
                  <div className="text-sm text-gray-600">
                    <p>KliqShot Internet Private Limited</p>
                    <p>407, Elite Business Hub</p>
                    <p>Opp. Kargil Petrol Pump, SG Highway</p>
                    <p>Ahmedabad, Gujarat - 380060, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Environmental Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">500+</div>
                <div className="text-sm font-medium text-green-800">Devices Recycled</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">2.5 Tons</div>
                <div className="text-sm font-medium text-blue-800">E-waste Processed</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">95%</div>
                <div className="text-sm font-medium text-purple-800">Recycling Rate</div>
              </div>
            </div>
          </div>

          {/* Legal Compliance */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Legal Compliance</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-medium text-gray-900">E-waste (Management) Rules, 2016</h3>
                <p className="text-gray-600 text-sm">We comply with all provisions of the E-waste (Management) Rules, 2016 as amended from time to time.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-medium text-gray-900">Extended Producer Responsibility (EPR)</h3>
                <p className="text-gray-600 text-sm">We fulfill our Extended Producer Responsibility obligations for all electronic products sold through our platform.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-medium text-gray-900">Environmental Clearance</h3>
                <p className="text-gray-600 text-sm">All our e-waste processing facilities have obtained necessary environmental clearances and certifications.</p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-yellow-800 mb-3">Important Notice</h2>
            <div className="text-yellow-700 text-sm space-y-2">
              <p>• E-waste collection is free of cost for consumers</p>
              <p>• We do not charge any fees for e-waste disposal</p>
              <p>• All collected e-waste is processed through authorized recyclers only</p>
              <p>• We maintain complete transparency in our e-waste management process</p>
              <p>• For any queries or complaints, please contact our e-waste helpline</p>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
