'use client'

import Image from 'next/image'
import { useCartStore } from '@/app/store/cart'
import { useState } from 'react'

interface MenuItemProps {
  id: string
  name: string
  description?: string
  price: number
  image?: string
}

export function MenuItem({ id, name, description, price, image }: MenuItemProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(
      {
        id,
        name,
        price,
        quantity,
        category: 'food',
        image,
      },
      '',
      0
    )
    setQuantity(1)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {image && (
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        {description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">£{price.toFixed(2)}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
