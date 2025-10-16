'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity?: number;
  // Booking-specific fields
  photographerId?: string;
  photographerName?: string;
  category?: string;
  subcategory?: string;
  selectedDate?: string;
  selectedTimeSlots?: string[];
  addons?: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  timestamp?: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever items change
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      // For booking items, use timestamp as unique identifier
      const itemId = item.timestamp ? `booking_${item.timestamp}` : item.id;
      const existingItem = prev.find(cartItem => 
        cartItem.timestamp ? `booking_${cartItem.timestamp}` === itemId : cartItem.id === itemId
      );
      
      if (existingItem) {
        return prev.map(cartItem => {
          const cartItemId = cartItem.timestamp ? `booking_${cartItem.timestamp}` : cartItem.id;
          return cartItemId === itemId
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem;
        });
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prev => prev.filter(item => {
      const cartItemId = item.timestamp ? `booking_${item.timestamp}` : item.id;
      return cartItemId !== itemId;
    }));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item => {
        const cartItemId = item.timestamp ? `booking_${item.timestamp}` : item.id;
        return cartItemId === itemId ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      // Calculate base price based on time slots
      const hourlyRate = parseInt(item.price.toString().replace(/[^\d]/g, '')) || 0;
      const timeSlotsCount = item.selectedTimeSlots ? item.selectedTimeSlots.length : 1;
      const basePrice = hourlyRate * timeSlotsCount;
      
      let itemTotal = basePrice * (item.quantity || 1);
      
      // Add addon costs if they exist
      if (item.addons && item.addons.length > 0) {
        const addonTotal = item.addons.reduce((addonSum, addon) => 
          addonSum + (addon.price * addon.quantity), 0
        );
        itemTotal += addonTotal;
      }
      
      return total + itemTotal;
    }, 0);
  };

  const itemCount = items.reduce((total, item) => total + (item.quantity || 1), 0);

  const value = {
    items,
    itemCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
