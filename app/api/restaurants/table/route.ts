import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const qrCode = request.nextUrl.searchParams.get('qrCode')

    if (!qrCode) {
      return NextResponse.json(
        { error: 'QR code is required' },
        { status: 400 }
      )
    }

    const table = await prisma.restaurantTable.findUnique({
      where: { qrCode },
      include: {
        restaurant: {
          select: {
            id: true,
            name: true,
            description: true,
            address: true,
          },
        },
      },
    })

    if (!table) {
      return NextResponse.json(
        { error: 'Table not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      restaurantId: table.restaurant.id,
      restaurantName: table.restaurant.name,
      tableNumber: table.tableNumber,
      restaurant: table.restaurant,
    })
  } catch (error) {
    console.error('Error fetching table:', error)
    return NextResponse.json(
      { error: 'Failed to fetch table information' },
      { status: 500 }
    )
  }
}
