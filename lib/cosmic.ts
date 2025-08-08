import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

export interface Author {
  id: string
  slug: string
  title: string
  metadata: {
    full_name: string
    bio: string
    profile_photo?: {
      url: string
      imgix_url: string
    }
    email?: string
    instagram?: string
    twitter?: string
    specialty?: string
  }
}

export interface Category {
  id: string
  slug: string
  title: string
  metadata: {
    name: string
    description?: string
    color?: string
    icon?: string
  }
}

export interface Post {
  id: string
  slug: string
  title: string
  metadata: {
    title: string
    excerpt?: string
    content: string
    featured_image: {
      url: string
      imgix_url: string
    }
    gallery?: Array<{
      url: string
      imgix_url: string
    }>
    location?: string
    author: Author
    category: Category
    tags?: string
    reading_time?: number
  }
}

export async function getPosts(limit?: number) {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit || 100)
    
    return objects as Post[]
  } catch (error) {
    if (error?.status === 404) {
      return []
    }
    throw error
  }
}

export async function getPost(slug: string) {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return object as Post
  } catch (error) {
    if (error?.status === 404) {
      return null
    }
    throw error
  }
}

export async function getCategories(limit?: number) {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
      .limit(limit || 100)
    
    return objects as Category[]
  } catch (error) {
    if (error?.status === 404) {
      return []
    }
    throw error
  }
}

export async function getCategory(slug: string) {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return object as Category
  } catch (error) {
    if (error?.status === 404) {
      return null
    }
    throw error
  }
}

export async function getPostsByCategory(categoryId: string, limit?: number) {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'posts', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit || 100)
    
    return objects as Post[]
  } catch (error) {
    if (error?.status === 404) {
      return []
    }
    throw error
  }
}

export async function getAuthors(limit?: number) {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .limit(limit || 100)
    
    return objects as Author[]
  } catch (error) {
    if (error?.status === 404) {
      return []
    }
    throw error
  }
}

export async function getAuthor(slug: string) {
  try {
    const { object } = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return object as Author
  } catch (error) {
    if (error?.status === 404) {
      return null
    }
    throw error
  }
}

export async function getPostsByAuthor(authorId: string, limit?: number) {
  try {
    const { objects } = await cosmic.objects
      .find({ type: 'posts', 'metadata.author': authorId })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
      .limit(limit || 100)
    
    return objects as Post[]
  } catch (error) {
    if (error?.status === 404) {
      return []
    }
    throw error
  }
}