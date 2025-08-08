// Base Cosmic object interface - all properties optional for flexibility
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata?: Record<string, any>;
  type?: string;
  created_at?: string;
  modified_at?: string;
  status?: string;
  published_at?: string;
  bucket?: string;
  thumbnail?: string;
  modified_by?: string;
  created_by?: string;
}

// Post interface with specific metadata structure
export interface Post extends CosmicObject {
  type?: 'posts';
  metadata?: {
    title?: string;
    excerpt?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    location?: string;
    author?: Author;
    category?: Category;
    tags?: string;
    reading_time?: number;
  };
}

// Author interface with specific metadata structure
export interface Author extends CosmicObject {
  type?: 'authors';
  metadata?: {
    full_name?: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    instagram?: string;
    twitter?: string;
    specialty?: string;
  };
}

// Category interface with specific metadata structure  
export interface Category extends CosmicObject {
  type?: 'categories';
  metadata?: {
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
  };
}

// API Response type
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guards for runtime validation
export function isPost(obj: CosmicObject): obj is Post {
  return obj.type === 'posts';
}

export function isAuthor(obj: CosmicObject): obj is Author {
  return obj.type === 'authors';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}