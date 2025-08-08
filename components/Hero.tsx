import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorInfo from '@/components/AuthorInfo'

interface HeroProps {
  post: Post
}

export default function Hero({ post }: HeroProps) {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      {post.metadata?.featured_image && (
        <img
          src={`${post.metadata.featured_image.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Category & Reading Time */}
            <div className="flex items-center gap-4 mb-4">
              {post.metadata?.category && (
                <CategoryBadge category={post.metadata.category} />
              )}
              {post.metadata?.reading_time && (
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {post.metadata.reading_time} min read
                </span>
              )}
            </div>
            
            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            {post.metadata?.excerpt && (
              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {post.metadata.excerpt}
              </p>
            )}
            
            {/* Author & Location */}
            <div className="flex items-center justify-between mb-8">
              {post.metadata?.author && (
                <AuthorInfo author={post.metadata.author} />
              )}
              {post.metadata?.location && (
                <div className="flex items-center text-white/80">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {post.metadata.location}
                </div>
              )}
            </div>
            
            {/* CTA Button */}
            <Link
              href={`/posts/${post.slug}`}
              className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Read Full Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}