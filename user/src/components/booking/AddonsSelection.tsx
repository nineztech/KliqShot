'use client';

interface Addon {
  id: number;
  name: string;
  price: number;
  description: string;
}

interface AddonsSelectionProps {
  selectedAddons: number[];
  onAddonToggle: (addonId: number) => void;
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

export default function AddonsSelection({ selectedAddons, onAddonToggle }: AddonsSelectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Add-ons & Services</h2>
      
      <div className="space-y-4">
        {availableAddons.map((addon) => (
          <div
            key={addon.id}
            className={`
              border rounded-lg p-4 transition-all duration-200 cursor-pointer
              ${selectedAddons.includes(addon.id)
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }
            `}
            onClick={() => onAddonToggle(addon.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  checked={selectedAddons.includes(addon.id)}
                  onChange={() => onAddonToggle(addon.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-900">
                    {addon.name}
                  </h3>
                  <span className="text-sm font-bold text-blue-600">
                    ₹{addon.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  {addon.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {selectedAddons.length === 0 && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            Select add-ons to enhance your photography session
          </p>
        </div>
      )}
    </div>
  );
}
