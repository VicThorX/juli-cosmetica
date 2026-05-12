import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WcProduct } from '@/services/mockData';

export interface CartItem {
  id: string; // generate a unique ID for cart item (e.g. product_id + variation_string)
  product: WcProduct;
  quantity: number;
  selectedAttributes?: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
  
  // Actions
  addItem: (product: WcProduct, quantity: number, attributes?: Record<string, string>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  
  // UI Actions
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  
  // Computed (getters)
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,

      addItem: (product, quantity, attributes) => {
        set((state) => {
          // Create a unique identifier based on product ID and selected attributes
          const attributesKey = attributes ? JSON.stringify(attributes) : '';
          const cartItemId = `${product.id}-${attributesKey}`;

          const existingItemIndex = state.items.findIndex(item => item.id === cartItemId);

          if (existingItemIndex >= 0) {
            // Update quantity if item already exists
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems, isDrawerOpen: true };
          } else {
            // Add new item
            const newItem: CartItem = {
              id: cartItemId,
              product,
              quantity,
              selectedAttributes: attributes
            };
            return { items: [...state.items, newItem], isDrawerOpen: true };
          }
        });
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },

      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.on_sale && item.product.sale_price 
            ? parseFloat(item.product.sale_price) || parseFloat(item.product.price) 
            : parseFloat(item.product.price);
          return total + (price * item.quantity);
        }, 0);
      }
    }),
    {
      name: 'juli-cosmetica-cart',
      // We don't want to persist the drawer state, only the items
      partialize: (state) => ({ items: state.items }),
    }
  )
);
