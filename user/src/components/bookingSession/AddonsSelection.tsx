'use client';

import { useEffect } from 'react';

interface Addon {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface AddonSelection {
  quantity: number;
  hours: number;
}

interface AddonsSelectionProps {
  selectedAddons: { [key: number]: AddonSelection };
  onAddonToggle: (addonId: number, quantity: number, hours: number) => void;
  selectedTimeSlots: string[];
}

const availableAddons: Addon[] = [
  {
    id: 1,
    name: "Extra Hours",
    price: 500,
    description: "Extend your photography session with additional hours"
  },
  {
    id: 2,
    name: "Drone Photography",
    price: 2000,
    description: "Aerial shots and cinematic drone footage"
  },
  {
    id: 3,
    name: "Photo Album",
    price: 1500,
    description: "Premium printed photo album with 50 pages"
  },
  {
    id: 4,
    name: "Video Coverage",
    price: 3000,
    description: "Professional video recording and editing"
  },
  {
    id: 5,
    name: "Same Day Delivery",
    price: 800,
    description: "Get your photos delivered on the same day"
  },
  {
    id: 6,
    name: "Makeup Artist",
    price: 2500,
    description: "Professional makeup artist for the session"
  }
];

export default function AddonsSelection({ selectedAddons, onAddonToggle, selectedTimeSlots }: AddonsSelectionProps) {
  // Auto-update hours when time slots change
  useEffect(() => {
    const maxHours = selectedTimeSlots.length || 1;
    // Update if hours exceed the current time slots limit
    Object.keys(selectedAddons).forEach((addonIdStr) => {
      const addonId = parseInt(addonIdStr);
      const selection = selectedAddons[addonId];
      if (selection && selection.quantity > 0 && selection.hours > maxHours) {
        onAddonToggle(addonId, selection.quantity, maxHours);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTimeSlots.length]);

  const handleQuantityChange = (addonId: number, newQuantity: number) => {
    const quantity = Math.max(0, Math.min(10, newQuantity)); // Limit to 0-10
    const currentSelection = selectedAddons[addonId];
    const hours = currentSelection?.hours || selectedTimeSlots.length || 1;
    onAddonToggle(addonId, quantity, hours);
  };

  const handleHoursChange = (addonId: number, newHours: number) => {
    const currentSelection = selectedAddons[addonId];
    const quantity = currentSelection?.quantity || 1;
    const maxHours = selectedTimeSlots.length || 1;
    const hours = Math.max(1, Math.min(maxHours, newHours)); // Limit based on selected time slots
    onAddonToggle(addonId, quantity, hours);
  };

  const selectedCount = Object.values(selectedAddons).filter(selection => selection.quantity > 0).length;
  const totalPrice = availableAddons
    .filter(addon => selectedAddons[addon.id] && selectedAddons[addon.id].quantity > 0)
    .reduce((sum, addon) => {
      const selection = selectedAddons[addon.id];
      return sum + (addon.price * (selection.quantity || 0) * (selection.hours || 1));
    }, 0);

  return (
    <div className="bg-white rounded-lg shadow-sm p-3 h-full flex flex-col">
      <h2 className="text-lg font-bold text-gray-900 mb-3">Add-ons & Services</h2>
      
      {selectedCount > 0 && (
        <div className="mb-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-xs text-blue-800">
              <span className="font-semibold">{selectedCount} add-on{selectedCount > 1 ? 's' : ''} selected</span>
              <span className="text-blue-600 mx-1">•</span>
              <span className="font-medium">
                {Object.values(selectedAddons).reduce((sum, selection) => sum + (selection.quantity || 0), 0)} item{Object.values(selectedAddons).reduce((sum, selection) => sum + (selection.quantity || 0), 0) > 1 ? 's' : ''}
              </span>
            </p>
            <p className="text-sm font-bold text-blue-700">
              ₹{totalPrice.toLocaleString()}
            </p>
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="space-y-2">
          {availableAddons.map((addon) => {
            const selection = selectedAddons[addon.id];
            const quantity = selection?.quantity || 0;
            const hours = selection?.hours || selectedTimeSlots.length || 1;
            const isSelected = quantity > 0;
            
            return (
              <div
                key={addon.id}
                className={`
                  border rounded-lg p-3 transition-all duration-200
                  ${isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-start space-x-2.5">
                  <div className="flex items-center h-5 pt-0.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        if (e.target.checked) {
                          onAddonToggle(addon.id, 1, selectedTimeSlots.length || 1);
                        } else {
                          onAddonToggle(addon.id, 0, 1);
                        }
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer transition-all"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {addon.name}
                      </h3>
                      <span className={`text-sm font-bold whitespace-nowrap ${isSelected ? 'text-blue-700' : 'text-blue-600'}`}>
                        ₹{addon.price.toLocaleString()} <span className="text-[10px] font-normal">per hr</span>
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                      {addon.description}
                    </p>
                    
                    {/* Hours and Quantity Controls on Same Row */}
                    {isSelected && (
                      <div className="mt-2 flex items-center gap-3 flex-wrap">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-gray-700">Quantity:</span>
                          <button
                            onClick={() => handleQuantityChange(addon.id, quantity - 1)}
                            disabled={quantity <= 1}
                            className={`
                              w-7 h-7 rounded-md flex items-center justify-center font-semibold text-sm transition-all duration-200
                              ${quantity <= 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 active:scale-95'
                              }
                            `}
                          >
                            −
                          </button>
                          
                          <div className="w-12 h-7 bg-white border-2 border-blue-500 rounded-md flex items-center justify-center">
                            <span className="text-sm font-bold text-blue-700">{quantity}</span>
                          </div>
                          
                          <button
                            onClick={() => handleQuantityChange(addon.id, quantity + 1)}
                            disabled={quantity >= 10}
                            className={`
                              w-7 h-7 rounded-md flex items-center justify-center font-semibold text-sm transition-all duration-200
                              ${quantity >= 10
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-white border border-blue-300 text-blue-600 hover:bg-blue-50 hover:border-blue-400 active:scale-95'
                              }
                            `}
                          >
                            +
                          </button>
                         </div>
                         
                         {/* Vertical Separator */}
                         <div className="h-6 w-px bg-gray-300"></div>
                         
                         {/* Hours Dropdown */}
                         <div className="flex items-center space-x-2">
                           <span className="text-xs font-medium text-gray-700 whitespace-nowrap">Hours:</span>
                           <select
                             value={hours}
                             onChange={(e) => handleHoursChange(addon.id, parseInt(e.target.value))}
                             className="px-2 py-1 text-xs border border-blue-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                           >
                             {Array.from({ length: selectedTimeSlots.length || 1 }, (_, i) => i + 1).map((h) => (
                               <option key={h} value={h}>{h}</option>
                             ))}
                           </select>
                         </div>
                        
                        {(quantity > 1 || hours > 1) && (
                          <div className="flex-1 text-right min-w-full md:min-w-0">
                            <span className="text-xs font-semibold text-blue-700">
                              Total: ₹{(addon.price * quantity * hours).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
