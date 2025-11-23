'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/app/components/ui/Button'
import { Card, CardBody } from '@/app/components/ui/Card'

export default function Home() {
  const router = useRouter()
  const { data: session } = useSession()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraActive, setCameraActive] = useState(false)

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          setCameraActive(true)
        }
      } catch (error) {
        console.error('Camera access denied:', error)
        setCameraActive(false)
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
    const qrCode = prompt('Enter QR code (for testing):')
    if (qrCode) {
      router.push(`/menu?qr=${encodeURIComponent(qrCode)}`)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-2xl">🍽️</div>
            <h1 className="text-2xl font-bold text-primary">Restaurant Menu</h1>
          </div>
          {session ? (
            <Link href="/accounts">
              <Button variant="secondary" size="md">
                👤 {session.user?.name || 'Account'}
              </Button>
            </Link>
          ) : (
            <Link href="/auth/signin">
              <Button variant="secondary" size="md">
                Sign In
              </Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=400&fit=crop"
          alt="Restaurant dining"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">Order Your Meal</h2>
            <p className="text-xl">Scan a QR code to start browsing our menu</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* QR Scanner Card */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20 animate-slide-up">
          <Card variant="elevated" className="overflow-hidden">
            <CardBody className="p-0">
              {cameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-80 object-cover"
                />
              ) : (
                <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <p className="text-gray-600">Camera access required</p>
                  </div>
                </div>
              )}
            </CardBody>
          </Card>

          <div>
            <h3 className="text-4xl font-bold text-primary mb-6">
              📷 Scan to Order
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Simply point your device at the QR code on your table to start browsing our menu, place your order, and pay securely.
            </p>
            <div className="space-y-4">
              <Button
                onClick={handleQRScan}
                variant="primary"
                size="lg"
                fullWidth
              >
                Enter QR Code
              </Button>
              <p className="text-gray-500 text-center text-sm">
                Or use your device camera to scan automatically
              </p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-20">
          <h3 className="text-4xl font-bold text-primary text-center mb-16">
            Why Choose Us?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card variant="elevated" hover className="animate-fade-in">
              <CardBody>
                <div className="text-5xl mb-4">🍽️</div>
                <h4 className="text-2xl font-bold text-primary mb-4">
                  Browse Menu
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Explore our full interactive menu with high-quality photos, detailed descriptions, and nutritional information for every dish.
                </p>
              </CardBody>
            </Card>

            {/* Feature 2 */}
            <Card variant="elevated" hover className="animate-fade-in">
              <CardBody>
                <div className="text-5xl mb-4">🛒</div>
                <h4 className="text-2xl font-bold text-primary mb-4">
                  Add to Cart
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Easily customize your items and manage your order with our intuitive cart system. Review everything before checkout.
                </p>
              </CardBody>
            </Card>

            {/* Feature 3 */}
            <Card variant="elevated" hover className="animate-fade-in">
              <CardBody>
                <div className="text-5xl mb-4">💳</div>
                <h4 className="text-2xl font-bold text-primary mb-4">
                  Secure Payment
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  Complete your payment securely using industry-leading Stripe technology. Your payment information is always safe.
                </p>
              </CardBody>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-primary to-accent rounded-2xl p-16 text-center text-white">
          <h3 className="text-4xl font-bold mb-6">Ready to Order?</h3>
          <p className="text-xl mb-8 opacity-90">
            Get started now by scanning a QR code on your table
          </p>
          <Button
            onClick={handleQRScan}
            variant="outline"
            size="lg"
            className="bg-white text-primary hover:bg-gray-50 border-white"
          >
            Start Ordering
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-4">&copy; 2024 Restaurant Menu Ordering System</p>
          <p className="text-sm text-gray-500">
            Powered by QR Code Technology for seamless dining
          </p>
        </div>
      </footer>
    </div>
  )
}
