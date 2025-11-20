'use client'

import { useCartStore } from '@/app/store/cart'
import { useState } from 'react'
import Image from 'next/image'

interface CartProps {
  onCheckout: () => void
}

export function Cart({ onCheckout }: CartProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)

  if (items.length === 0 && !isOpen) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold hover:bg-blue-700 shadow-lg relative"
        >
          🛒
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {getTotalItems()}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Your Cart</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>

          {items.length === 0 ? (
            <p className="text-gray-600 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border-b pb-4">
                    {item.image && (
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">£{item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="text-xl font-bold text-blue-600">£{getTotalPrice().toFixed(2)}</span>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false)
                    onCheckout()
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
