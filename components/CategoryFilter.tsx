import { Category } from '@/types'

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <div
          key={category.id}
          className="group cursor-pointer"
        >
          <div 
            className="p-6 rounded-lg text-center transition-transform group-hover:scale-105"
            style={{ backgroundColor: category.metadata?.color || '#6B7280' }}
          >
            <div className="text-4xl mb-3">
              {category.metadata?.icon || '🍽️'}
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              {category.metadata?.name || category.title}
            </h3>
            {category.metadata?.description && (
              <p className="text-white/80 text-sm">
                {category.metadata.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}