'use client'

import { MenuItem } from './MenuItem'

export enum MenuCategory {
  STARTERS = 'STARTERS',
  MAIN = 'MAIN',
  DESSERT = 'DESSERT',
  DRINKS = 'DRINKS',
  ALCOHOLIC_DRINKS = 'ALCOHOLIC_DRINKS',
  SNACKS = 'SNACKS',
}

export const CATEGORY_LABELS: Record<MenuCategory, string> = {
  [MenuCategory.STARTERS]: 'Starters',
  [MenuCategory.MAIN]: 'Main Course',
  [MenuCategory.DESSERT]: 'Desserts',
  [MenuCategory.DRINKS]: 'Drinks',
  [MenuCategory.ALCOHOLIC_DRINKS]: 'Alcoholic Drinks',
  [MenuCategory.SNACKS]: 'Snacks',
}

interface MenuTabsProps {
  items: any[]
  activeCategory: MenuCategory
  onCategoryChange: (category: MenuCategory) => void
}

export function MenuTabs({ items, activeCategory, onCategoryChange }: MenuTabsProps) {
  const categories = Object.values(MenuCategory)

  const filteredItems = items.filter((item) => item.category === activeCategory)

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 border-b sticky top-0 bg-white z-10">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 whitespace-nowrap font-semibold rounded-lg transition-colors ${
              activeCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {CATEGORY_LABELS[category]}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="mt-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No items available in this category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
