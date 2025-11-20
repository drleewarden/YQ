'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface OrderSuccessPageProps {
  params: Promise<{ id: string }>
}

export default function OrderSuccessPage({ params }: OrderSuccessPageProps) {
  const [orderId, setOrderId] = useState<string>('')

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const { id } = await params
        setOrderId(id)
      } catch (error) {
        console.error('Error loading order:', error)
      }
    }

    loadOrder()
  }, [params])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your order has been successfully placed. Your order ID is:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="text-lg font-mono font-bold text-gray-800">{orderId}</p>
          </div>

          <p className="text-gray-600 mb-8">
            The restaurant will begin preparing your food. You'll be notified when your order is ready to collect from the table.
          </p>

          <div className="space-y-3">
            <Link
              href="/"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/accounts"
              className="block w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-bold hover:bg-gray-300 transition-colors"
            >
              View Order History
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
