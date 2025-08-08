import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorInfo from '@/components/AuthorInfo'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Featured Image */}
      {post.metadata?.featured_image && (
        <Link href={`/posts/${post.slug}`}>
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=600&h=300&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
            width={400}
            height={200}
          />
        </Link>
      )}
      
      <div className="p-6">
        {/* Category & Reading Time */}
        <div className="flex items-center justify-between mb-3">
          {post.metadata?.category && (
            <CategoryBadge category={post.metadata.category} size="sm" />
          )}
          {post.metadata?.reading_time && (
            <span className="text-gray-500 text-sm">
              {post.metadata.reading_time} min
            </span>
          )}
        </div>
        
        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        
        {/* Excerpt */}
        {post.metadata?.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}
        
        {/* Author & Location */}
        <div className="flex items-center justify-between text-sm">
          {post.metadata?.author && (
            <AuthorInfo author={post.metadata.author} size="sm" />
          )}
          {post.metadata?.location && (
            <div className="flex items-center text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {post.metadata.location}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}