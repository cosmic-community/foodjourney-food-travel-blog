export default function Footer() {
  const currentYear = new Date().getFullYear()

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
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Street Food 🍜
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Local Markets 🛒
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Desserts & Sweets 🍰
              </a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors">
                Fine Dining 🍽️
              </a>
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