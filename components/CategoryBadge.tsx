import { Category } from '@/types'

interface CategoryBadgeProps {
  category: Category
  size?: 'sm' | 'md'
}

export default function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'
  
  return (
    <span
      className={`inline-flex items-center gap-1 text-white font-medium rounded-full ${sizeClasses}`}
      style={{ backgroundColor: category.metadata?.color || '#6B7280' }}
    >
      {category.metadata?.icon && (
        <span className="text-xs">{category.metadata.icon}</span>
      )}
      {category.metadata?.name || category.title}
    </span>
  )
}