import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const menuItems = await prisma.menuItem.findMany({
      where: {
        restaurantId: id,
        isAvailable: true,
      },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        category: true,
        image: true,
      },
    })

    return NextResponse.json(menuItems)
  } catch (error) {
    console.error('Error fetching menu:', error)
    return NextResponse.json(
      { error: 'Failed to fetch menu' },
      { status: 500 }
    )
  }
}
