import { create } from 'zustand';
import { Product } from '../lib/types';

export interface CartItem {
  product: Product;
  quantity: number;
  observation?: string;
  // Futuramente aqui entrarão os adicionais selecionados
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,

  addItem: (newItem) => set((state) => {
    // Verifica se já existe o produto igual (mesmo ID)
    const existingItemIndex = state.items.findIndex(
      (item) => item.product.id === newItem.product.id
    );

    let updatedItems;

    if (existingItemIndex >= 0) {
      // Se já existe, atualiza a quantidade
      updatedItems = [...state.items];
      updatedItems[existingItemIndex].quantity += newItem.quantity;
    } else {
      // Se não, adiciona novo
      updatedItems = [...state.items, newItem];
    }

    // Recalcula total
    const total = updatedItems.reduce((acc, item) => {
      return acc + (item.product.price * item.quantity);
    }, 0);

    return { items: updatedItems, total };
  }),

  removeItem: (productId) => set((state) => {
    const updatedItems = state.items.filter(item => item.product.id !== productId);
    const total = updatedItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    return { items: updatedItems, total };
  }),

  clearCart: () => set({ items: [], total: 0 }),
}));