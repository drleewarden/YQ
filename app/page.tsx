'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Camera access denied:', error)
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  const handleQRScan = async () => {
    // This is a placeholder - in production, you'd use a QR scanner library
    const qrCode = prompt('Enter QR code (for testing):')
    if (qrCode) {
      router.push(`/menu?qr=${encodeURIComponent(qrCode)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Restaurant Menu</h1>
          {session ? (
            <Link href="/accounts" className="text-blue-600 hover:text-blue-800 font-semibold">
              My Account
            </Link>
          ) : (
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-800 font-semibold">
              Sign In
            </Link>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* QR Scanner Section */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Scan QR Code to Order</h2>

            <div className="mb-8">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg border-2 border-gray-300 max-h-96 object-cover"
              />
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={handleQRScan}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors"
              >
                📷 Scan QR Code
              </button>

              <p className="text-gray-600 text-center">
                or use a mobile device to scan the QR code on your table
              </p>
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-gray-50 p-8 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🍽️</div>
              <h3 className="font-bold text-lg mb-2">Browse Menu</h3>
              <p className="text-gray-600">
                Explore our full interactive menu with detailed descriptions
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🛒</div>
              <h3 className="font-bold text-lg mb-2">Add to Cart</h3>
              <p className="text-gray-600">
                Easily add items to your cart and customize your order
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💳</div>
              <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Complete your payment securely using Stripe
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
