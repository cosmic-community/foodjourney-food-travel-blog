// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import { notFound } from 'next/navigation'
import PostContent from '@/components/PostContent'
import AuthorCard from '@/components/AuthorCard'
import CategoryBadge from '@/components/CategoryBadge'
import ImageGallery from '@/components/ImageGallery'
import SEOHead from '@/components/SEOHead'
import { generatePostMetadata, generateStructuredData } from '@/lib/seo'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getPosts()
  return posts.slice(0, 10).map((post: Post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug) as Post

  if (!post) {
    return {
      title: 'Post Not Found | FoodJourney',
    }
  }

  return generatePostMetadata(post)
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug) as Post

  if (!post) {
    notFound()
  }

  // Generate structured data for the post
  const articleStructuredData = generateStructuredData({
    type: 'Article',
    props: {
      '@type': 'BlogPosting',
      headline: post.metadata?.title || post.title,
      description: post.metadata?.excerpt,
      image: post.metadata?.featured_image?.imgix_url 
        ? `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
        : undefined,
      datePublished: post.created_at,
      dateModified: post.modified_at || post.created_at,
      author: {
        '@type': 'Person',
        name: post.metadata?.author?.metadata?.full_name || post.metadata?.author?.title || 'FoodJourney Team',
        description: post.metadata?.author?.metadata?.bio,
        image: post.metadata?.author?.metadata?.profile_photo?.imgix_url,
      },
      publisher: {
        '@type': 'Organization',
        name: 'FoodJourney',
        logo: {
          '@type': 'ImageObject',
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'}/logo.png`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'}/posts/${post.slug}`,
      },
      keywords: post.metadata?.tags,
      about: {
        '@type': 'Thing',
        name: post.metadata?.category?.metadata?.name || 'Food',
      },
      locationCreated: post.metadata?.location ? {
        '@type': 'Place',
        name: post.metadata.location,
      } : undefined,
    },
  })

  // Breadcrumb structured data
  const breadcrumbStructuredData = generateStructuredData({
    type: 'BreadcrumbList',
    props: {
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Posts',
          item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'}/posts`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'}/posts/${post.slug}`,
        },
      ],
    },
  })

  return (
    <>
      <SEOHead structuredData={articleStructuredData} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbStructuredData}
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8"
        >
          ← Back to all posts
        </Link>

        <article>
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              {post.metadata?.category && (
                <CategoryBadge category={post.metadata.category} />
              )}
              {post.metadata?.reading_time && (
                <span className="text-gray-500 text-sm">
                  {post.metadata.reading_time} min read
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            {post.metadata?.excerpt && (
              <p className="text-xl text-gray-600 mb-6">
                {post.metadata.excerpt}
              </p>
            )}

            {post.metadata?.location && (
              <div className="flex items-center text-gray-500 mb-6">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {post.metadata.location}
              </div>
            )}
          </header>

          {/* Featured Image */}
          {post.metadata?.featured_image && (
            <div className="mb-8">
              <img
                src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
                alt={post.title}
                className="w-full h-96 object-cover rounded-lg"
                width={800}
                height={400}
              />
            </div>
          )}

          {/* Author */}
          {post.metadata?.author && (
            <div className="mb-8">
              <AuthorCard author={post.metadata.author} />
            </div>
          )}

          {/* Content */}
          <PostContent content={post.metadata?.content || ''} />

          {/* Gallery */}
          {post.metadata?.gallery && post.metadata.gallery.length > 0 && (
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Photo Gallery</h3>
              <ImageGallery images={post.metadata.gallery} />
            </div>
          )}

          {/* Tags */}
          {post.metadata?.tags && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {post.metadata.tags.split(',').map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
    </>
  )
}