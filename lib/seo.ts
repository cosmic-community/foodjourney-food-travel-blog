import { Metadata } from 'next'
import { Post, Category, Author } from '@/types'

const SITE_NAME = 'FoodJourney'
const SITE_DESCRIPTION = 'Discover amazing food experiences from around the world. Street food, local markets, fine dining, and sweet treats.'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'

export function generateSEOMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags,
}: {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
}): Metadata {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const url = `${SITE_URL}${path}`
  const defaultImage = `${SITE_URL}/og-default.jpg`
  const imageUrl = image || defaultImage

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: tags?.join(', '),
    authors: author ? [{ name: author }] : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: 'en_US',
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      tags,
    }
  }

  return metadata
}

export function generatePostMetadata(post: Post): Metadata {
  const tags = post.metadata?.tags?.split(',').map(tag => tag.trim()) || []
  const author = post.metadata?.author?.metadata?.full_name || post.metadata?.author?.title
  const image = post.metadata?.featured_image?.imgix_url 
    ? `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : undefined

  return generateSEOMetadata({
    title: post.metadata?.title || post.title,
    description: post.metadata?.excerpt || `Read about ${post.title} on FoodJourney`,
    path: `/posts/${post.slug}`,
    image,
    type: 'article',
    publishedTime: post.created_at,
    modifiedTime: post.modified_at,
    author,
    tags: [
      ...tags,
      'food',
      'travel',
      'cuisine',
      post.metadata?.location || '',
      post.metadata?.category?.metadata?.name || ''
    ].filter(Boolean),
  })
}

export function generateCategoryMetadata(category: Category): Metadata {
  return generateSEOMetadata({
    title: `${category.metadata?.name || category.title} - Food Category`,
    description: category.metadata?.description || `Explore ${category.metadata?.name || category.title} posts on FoodJourney - discover amazing food experiences from around the world.`,
    path: `/categories/${category.slug}`,
    tags: [
      'food category',
      'cuisine',
      'travel',
      category.metadata?.name || category.title,
    ],
  })
}

export function generateAuthorMetadata(author: Author): Metadata {
  const image = author.metadata?.profile_photo?.imgix_url
    ? `${author.metadata.profile_photo.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : undefined

  return generateSEOMetadata({
    title: `${author.metadata?.full_name || author.title} - Food & Travel Writer`,
    description: author.metadata?.bio || `Read posts by ${author.metadata?.full_name || author.title} on FoodJourney - authentic food and travel experiences.`,
    path: `/authors/${author.slug}`,
    image,
    author: author.metadata?.full_name || author.title,
    tags: [
      'food writer',
      'travel writer',
      'author',
      author.metadata?.specialty || '',
    ].filter(Boolean),
  })
}

export function generateStructuredData(data: {
  type: 'WebSite' | 'Article' | 'Person' | 'Organization' | 'BreadcrumbList'
  props: any
}) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': data.type,
    ...data.props,
  }

  return {
    __html: JSON.stringify(baseData),
  }
}