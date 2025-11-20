'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

interface Order {
  id: string
  createdAt: string
  totalAmount: number
  status: string
  restaurant: { name: string }
  items: Array<{
    id: string
    quantity: number
    price: number
    menuItem: {
      name: string
    }
  }>
}

export default function AccountsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
      return
    }

    if (status === 'authenticated') {
      loadOrders()
    }
  }, [status, router])

  const loadOrders = async () => {
    try {
      const response = await axios.get('/api/orders')
      setOrders(response.data)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Restaurant Menu
          </Link>
          <button
            onClick={handleSignOut}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Sign Out
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 font-semibold ${
                activeTab === 'profile'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex-1 py-4 font-semibold ${
                activeTab === 'orders'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Order History
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="p-8">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {session?.user?.name}
                  </h1>
                  <p className="text-gray-600">{session?.user?.email}</p>
                </div>
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-600">Name</label>
                    <p className="text-gray-800 font-semibold">{session?.user?.name}</p>
                  </div>
                  <div>
                    <label className="text-gray-600">Email</label>
                    <p className="text-gray-800 font-semibold">{session?.user?.email}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSignOut}
                className="mt-8 bg-red-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>

              {loading ? (
                <p className="text-gray-600">Loading orders...</p>
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg mb-4">You haven't placed any orders yet</p>
                  <Link
                    href="/"
                    className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700"
                  >
                    Browse Restaurants
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border rounded-lg p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {order.restaurant.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(order.createdAt).toLocaleDateString()} at{' '}
                            {new Date(order.createdAt).toLocaleTimeString()}
                          </p>
                        </div>
                        <span
                          className={`px-4 py-1 rounded-full font-semibold ${
                            order.status === 'COMPLETED'
                              ? 'bg-green-100 text-green-800'
                              : order.status === 'PROCESSING'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="border-t border-b py-4 mb-4">
                        <h4 className="font-semibold text-gray-800 mb-2">Items</h4>
                        <ul className="space-y-2">
                          {order.items.map((item) => (
                            <li key={item.id} className="text-gray-600 flex justify-between">
                              <span>
                                {item.menuItem.name} x {item.quantity}
                              </span>
                              <span>£{(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total:</span>
                        <span className="text-xl font-bold text-blue-600">
                          £{order.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
