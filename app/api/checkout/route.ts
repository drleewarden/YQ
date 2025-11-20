import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

// Check if Stripe key is configured
const stripeKey = process.env.STRIPE_SECRET_KEY
const stripe = stripeKey ? new Stripe(stripeKey) : null

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, successUrl, cancelUrl } = body

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      )
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
      },
    })

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // If Stripe is not configured, use mock checkout (for development)
    if (!stripe || !stripeKey) {
      console.log('Stripe not configured, using mock checkout for order:', orderId)

      // Mark order as paid in mock mode
      await prisma.order.update({
        where: { id: orderId },
        data: {
          stripePaymentId: `mock_${orderId}`,
        },
      })

      // Return mock session with success URL
      return NextResponse.json({
        sessionId: `mock_${orderId}`,
        url: successUrl,
        isMock: true,
      })
    }

    const lineItems = order.items.map((item: any) => ({
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.menuItem.name,
          description: item.menuItem.description || undefined,
          images: item.menuItem.image ? [item.menuItem.image] : undefined,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }))

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        orderId,
      },
    })

    await prisma.order.update({
      where: { id: orderId },
      data: {
        stripePaymentId: session.id,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
