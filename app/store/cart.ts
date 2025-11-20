import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
  image?: string
}

interface CartStore {
  items: CartItem[]
  restaurantId: string | null
  tableNumber: number | null
  addItem: (item: CartItem, restaurantId: string, tableNumber: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  restaurantId: null,
  tableNumber: null,

  addItem: (item, restaurantId, tableNumber) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id)

      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
          restaurantId,
          tableNumber,
        }
      }

      return {
        items: [...state.items, item],
        restaurantId,
        tableNumber,
      }
    })
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }))
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }))
  },

  clearCart: () => {
    set({
      items: [],
      restaurantId: null,
      tableNumber: null,
    })
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  },
}))
