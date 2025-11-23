'use client'

import Image from 'next/image'
import { useCartStore } from '@/app/store/cart'
import { useState } from 'react'
import { Card, CardBody } from './ui/Card'
import { Button } from './ui/Button'

interface MenuItemProps {
  id: string
  name: string
  description?: string
  price: number
  image?: string
  category?: string
}

export function MenuItem({ id, name, description, price, image, category }: MenuItemProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = () => {
    addItem(
      {
        id,
        name,
        price,
        quantity,
        category: category || 'food',
        image,
      },
      '',
      0
    )
    setQuantity(1)
  }

  return (
    <Card variant="elevated" hover className="overflow-hidden animate-fade-in">
      {image && (
        <div className="relative w-full h-48 overflow-hidden bg-gray-200">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <CardBody className="flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-primary">{name}</h3>
          {description && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
          )}
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-accent">£{price.toFixed(2)}</span>
            <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-primary font-bold w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="text-primary font-bold w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors"
              >
                +
              </button>
            </div>
          </div>
          <Button
            onClick={handleAddToCart}
            variant="secondary"
            size="md"
            fullWidth
          >
            🛒 Add to Cart
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}
