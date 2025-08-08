// app/categories/[slug]/page.tsx
import { getCategories, getPostsByCategory } from '@/lib/cosmic'
import { Category, Post } from '@/types'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((cat) => cat.slug === slug)

  if (!category) {
    return {
      title: 'Category Not Found | FoodJourney',
    }
  }

  return {
    title: `${category.metadata.name || category.title} | FoodJourney`,
    description: category.metadata.description || `Explore ${category.metadata.name || category.title} posts on FoodJourney`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const categories = await getCategories()
  const category = categories.find((cat) => cat.slug === slug)

  if (!category) {
    notFound()
  }

  const posts: Post[] = await getPostsByCategory(category.id)

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-gray-700">Home</Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/categories" className="hover:text-gray-700">Categories</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{category.metadata.name || category.title}</li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="text-center mb-12">
          <div 
            className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: `${category.metadata.color}20` }}
          >
            <span className="text-4xl">{category.metadata.icon}</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {category.metadata.name || category.title}
          </h1>
          
          {category.metadata.description && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {category.metadata.description}
            </p>
          )}
          
          <div 
            className="mt-6 h-1 w-16 mx-auto rounded-full"
            style={{ backgroundColor: category.metadata.color }}
          />
        </div>

        {/* Posts Grid */}
        {posts.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-600 mb-6">
              Posts in the {category.metadata.name || category.title} category will appear here.
            </p>
            <Link 
              href="/categories"
              className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              Browse Other Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}