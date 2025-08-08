import { MetadataRoute } from 'next'
import { getPosts, getCategories, getAuthors } from '@/lib/cosmic'
import { Post, Category, Author } from '@/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/authors`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  try {
    // Dynamic pages
    const [posts, categories, authors] = await Promise.all([
      getPosts(),
      getCategories(),
      getAuthors()
    ])

    // Posts
    const postPages: MetadataRoute.Sitemap = posts.map((post: Post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      lastModified: new Date(post.created_at || new Date()),
      changeFrequency: 'weekly',
      priority: 0.9,
    }))

    // Categories
    const categoryPages: MetadataRoute.Sitemap = categories.map((category: Category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

    // Authors
    const authorPages: MetadataRoute.Sitemap = authors.map((author: Author) => ({
      url: `${baseUrl}/authors/${author.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

    return [...staticPages, ...postPages, ...categoryPages, ...authorPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}