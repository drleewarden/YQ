const { PrismaClient, MenuCategory } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // Create a restaurant
  const restaurant = await prisma.restaurant.create({
    data: {
      name: 'The Gourmet Table',
      description: 'A fine dining experience with international cuisine',
      address: '123 Main Street, London, UK',
      phone: '+44 20 7946 0958',
      email: 'info@gourmet-table.com',
    },
  })

  console.log(`Created restaurant: ${restaurant.name}`)

  // Create tables with QR codes
  const tables = await Promise.all(
    Array.from({ length: 10 }, (_, i) =>
      prisma.restaurantTable.create({
        data: {
          tableNumber: i + 1,
          qrCode: `RESTAURANT_${restaurant.id}_TABLE_${i + 1}`,
          restaurantId: restaurant.id,
        },
      })
    )
  )

  console.log(`Created ${tables.length} tables`)

  // Create menu items
  const menuItems = await Promise.all([
    // Starters
    prisma.menuItem.create({
      data: {
        name: 'Prawn Tempura',
        description: 'Crispy battered prawns served with sweet chili sauce',
        price: 8.99,
        category: MenuCategory.STARTERS,
        restaurantId: restaurant.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Caesar Salad',
        description: 'Fresh romaine lettuce with parmesan cheese and croutons',
        price: 7.99,
        category: MenuCategory.STARTERS,
        restaurantId: restaurant.id,
      },
    }),
    // Main Courses
    prisma.menuItem.create({
      data: {
        name: 'Grilled Salmon',
        description: 'Fresh Atlantic salmon with lemon butter sauce',
        price: 24.99,
        category: MenuCategory.MAIN,
        restaurantId: restaurant.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Beef Ribeye Steak',
        description: '12oz premium beef steak with truffle mashed potatoes',
        price: 28.99,
        category: MenuCategory.MAIN,
        restaurantId: restaurant.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Pasta Carbonara',
        description: 'Classic Italian pasta with pancetta and parmesan',
        price: 14.99,
        category: MenuCategory.MAIN,
        restaurantId: restaurant.id,
      },
    }),
    // Desserts
    prisma.menuItem.create({
      data: {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center and vanilla ice cream',
        price: 8.99,
        category: MenuCategory.DESSERT,
        restaurantId: restaurant.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Crème Brûlée',
        description: 'Classic custard with caramelized sugar top',
        price: 7.99,
        category: MenuCategory.DESSERT,
        restaurantId: restaurant.id,
      },
    }),
    // Drinks
    prisma.menuItem.create({
      data: {
        name: 'Fresh Orange Juice',
        description: 'Freshly squeezed orange juice',
        price: 4.99,
        category: MenuCategory.DRINKS,
        restaurantId: restaurant.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Iced Tea',
        description: 'Refreshing iced tea with lemon',
        price: 3.99,
        category: MenuCategory.DRINKS,
        restaurantId: restaurant.id,
      },
    }),
    // Alcoholic Drinks
    prisma.menuItem.create({
      data: {
        name: 'House Wine (Red)',
        description: 'Selection of fine red wines by the glass',
        price: 6.99,
        category: MenuCategory.ALCOHOLIC_DRINKS,
        restaurantId: restaurant.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Craft Beer',
        description: 'Selection of premium craft beers',
        price: 5.99,
        category: MenuCategory.ALCOHOLIC_DRINKS,
        restaurantId: restaurant.id,
      },
    }),
    // Snacks
    prisma.menuItem.create({
      data: {
        name: 'Garlic Bread',
        description: 'Crispy bread with garlic butter and parsley',
        price: 3.99,
        category: MenuCategory.SNACKS,
        restaurantId: restaurant.id,
      },
    }),
    prisma.menuItem.create({
      data: {
        name: 'Mozzarella Sticks',
        description: 'Golden fried mozzarella with marinara sauce',
        price: 4.99,
        category: MenuCategory.SNACKS,
        restaurantId: restaurant.id,
      },
    }),
  ])

  console.log(`Created ${menuItems.length} menu items`)

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
