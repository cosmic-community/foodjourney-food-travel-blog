import { getCategories } from '@/lib/cosmic'
import { Category } from '@/types'
import Link from 'next/link'

export const metadata = {
  title: 'Food Categories | FoodJourney',
  description: 'Explore our food and travel categories - from street food to fine dining, desserts to local markets.',
}

export default async function CategoriesPage() {
  const categories: Category[] = await getCategories()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Food Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our diverse collection of food and travel experiences organized by category
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-8 text-center">
                {/* Icon */}
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl"
                  style={{ backgroundColor: `${category.metadata.color}20` }}
                >
                  <span className="text-3xl">{category.metadata.icon}</span>
                </div>

                {/* Category Name */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {category.metadata.name || category.title}
                </h3>

                {/* Description */}
                {category.metadata.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {category.metadata.description}
                  </p>
                )}

                {/* Color accent */}
                <div 
                  className="mt-4 h-1 w-12 mx-auto rounded-full"
                  style={{ backgroundColor: category.metadata.color }}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {categories.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
            <p className="text-gray-600">Categories will appear here once they're added to the CMS.</p>
          </div>
        )}
      </div>
    </div>
  )
}