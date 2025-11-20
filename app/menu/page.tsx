'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { MenuTabs, MenuCategory } from '@/app/components/MenuTabs'
import { Cart } from '@/app/components/Cart'
import { useCartStore } from '@/app/store/cart'
import axios from 'axios'

interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  category: MenuCategory
  image?: string
}

function MenuContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [restaurantInfo, setRestaurantInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(MenuCategory.STARTERS)
  const [localRestaurantId, setLocalRestaurantId] = useState<string | null>(null)
  const [localTableNumber, setLocalTableNumber] = useState<number | null>(null)
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  // Use local state instead of zustand for restaurant/table info
  const restaurantId = localRestaurantId
  const tableNumber = localTableNumber

  useEffect(() => {
    const qrCode = searchParams.get('qr')
    if (!qrCode) {
      router.push('/')
      return
    }

    const loadRestaurantAndMenu = async () => {
      try {
        // Fetch restaurant info from QR code
        const restaurantResponse = await axios.get('/api/restaurants/table', {
          params: { qrCode },
        })

        setRestaurantInfo(restaurantResponse.data)
        const rId = restaurantResponse.data.restaurantId
        const tNum = restaurantResponse.data.tableNumber

        console.log('Setting local state with:', { rId, tNum })
        // Store in local state
        setLocalRestaurantId(rId)
        setLocalTableNumber(tNum)
        // Also store in zustand for cart
        useCartStore.setState({ restaurantId: rId, tableNumber: tNum })
        console.log('Cart store after setState:', useCartStore.getState())

        // Fetch menu items
        const menuResponse = await axios.get(`/api/restaurants/${rId}/menus`)
        setMenuItems(menuResponse.data)
      } catch (error) {
        console.error('Error loading restaurant:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRestaurantAndMenu()
  }, [searchParams, router])

  const handleCheckout = async () => {
    if (items.length === 0) {
      alert('Your cart is empty')
      return
    }

    console.log('Checkout called with:', { restaurantId, tableNumber, itemsCount: items.length })

    try {
      // Create order
      const orderResponse = await axios.post('/api/orders', {
        restaurantId,
        tableNumber,
        items: items.map((item) => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      })

      const orderId = orderResponse.data.id

      // Create Stripe checkout session
      const checkoutResponse = await axios.post('/api/checkout', {
        orderId,
        successUrl: `${window.location.origin}/order-success/${orderId}`,
        cancelUrl: `${window.location.origin}/menu?qr=${searchParams.get('qr')}`,
      })

      // Redirect to Stripe checkout
      if (checkoutResponse.data.url) {
        window.location.href = checkoutResponse.data.url
      }

      clearCart()
    } catch (error) {
      console.error('Error during checkout:', error)
      alert('Failed to process checkout. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-800">Loading menu...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-800">
            {restaurantInfo?.restaurantName}
          </h1>
          {restaurantInfo?.restaurant?.description && (
            <p className="text-gray-600 mt-2">{restaurantInfo.restaurant.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            Table {restaurantInfo?.tableNumber}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <MenuTabs
          items={menuItems}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </main>

      {/* Cart */}
      <Cart onCheckout={handleCheckout} />
    </div>
  )
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><p className="text-2xl font-bold">Loading...</p></div>}>
      <MenuContent />
    </Suspense>
  )
}
