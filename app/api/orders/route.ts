import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    const body = await request.json()

    const { restaurantId, tableNumber, items } = body

    console.log('Order request received:', { restaurantId, tableNumber, itemsCount: items?.length })

    if (!restaurantId || !tableNumber || !items || items.length === 0) {
      console.error('Missing required fields:', { restaurantId, tableNumber, items })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let totalAmount = 0
    const orderItems = items.map((item: any) => {
      totalAmount += item.price * item.quantity
      return {
        menuItemId: item.id,
        quantity: item.quantity,
        price: item.price,
      }
    })

    const order = await prisma.order.create({
      data: {
        restaurantId,
        tableNumber,
        totalAmount,
        userId: session?.user?.id,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: true,
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            menuItem: true,
          },
        },
        restaurant: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
