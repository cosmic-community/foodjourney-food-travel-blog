import Link from 'next/link'
import { getCategories } from '@/lib/cosmic'

export default async function Footer() {
  const currentYear = new Date().getFullYear()
  
  // Fetch categories for dynamic links
  let categories: any[] = []
  try {
    const categoriesData = await getCategories()
    categories = categoriesData.slice(0, 4) // Limit to 4 categories for footer
  } catch (error) {
    console.error('Error fetching categories for footer:', error)
    // Fallback to empty array if fetch fails
  }

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🍽️</span>
              <span className="text-xl font-bold">FoodJourney</span>
            </div>
            <p className="text-gray-400">
              Discover amazing food experiences from around the world. 
              Street food, local markets, fine dining, and sweet treats.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="block text-gray-400 hover:text-white transition-colors"
                >
                  {category.metadata?.name || category.title} {category.metadata?.icon}
                </Link>
              ))}
              {categories.length === 0 && (
                <>
                  <Link href="/categories" className="block text-gray-400 hover:text-white transition-colors">
                    Browse All Categories
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Newsletter
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Instagram
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} FoodJourney. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}