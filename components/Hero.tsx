import Link from 'next/link'
import { Post } from '@/types'
import CategoryBadge from '@/components/CategoryBadge'
import AuthorInfo from '@/components/AuthorInfo'

interface HeroProps {
  post: Post
}

export default function Hero({ post }: HeroProps) {
  return (
    <div className="relative h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
      {/* Background Image */}
      {post.metadata?.featured_image && (
        <img
          src={`${post.metadata.featured_image.imgix_url}?w=1920&h=1080&fit=crop&auto=format,compress`}
          alt={post.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-full sm:max-w-3xl">
            {/* Category & Reading Time */}
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 mb-3 sm:mb-4">
              {post.metadata?.category && (
                <CategoryBadge category={post.metadata.category} />
              )}
              {post.metadata?.reading_time && (
                <span className="bg-white/20 backdrop-blur-sm text-white px-2 xs:px-3 py-1 rounded-full text-xs sm:text-sm">
                  {post.metadata.reading_time} min read
                </span>
              )}
            </div>
            
            {/* Title */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              {post.title}
            </h1>
            
            {/* Excerpt */}
            {post.metadata?.excerpt && (
              <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 leading-relaxed line-clamp-3 sm:line-clamp-none">
                {post.metadata.excerpt}
              </p>
            )}
            
            {/* Author & Location */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
              {post.metadata?.author && (
                <div className="order-2 sm:order-1">
                  <AuthorInfo author={post.metadata.author} />
                </div>
              )}
              {post.metadata?.location && (
                <div className="flex items-center text-white/80 text-sm sm:text-base order-1 sm:order-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="truncate">{post.metadata.location}</span>
                </div>
              )}
            </div>
            
            {/* CTA Button */}
            <Link
              href={`/posts/${post.slug}`}
              className="inline-block bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
            >
              Read Full Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}