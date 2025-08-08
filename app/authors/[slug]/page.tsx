// app/authors/[slug]/page.tsx
import { getAuthors, getAuthor, getPosts } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

interface AuthorPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const authors = await getAuthors()
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export async function generateMetadata({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    return {
      title: 'Author Not Found | FoodJourney',
    }
  }

  return {
    title: `${author.metadata.full_name || author.title} | FoodJourney`,
    description: author.metadata.bio || `Read posts by ${author.metadata.full_name || author.title} on FoodJourney`,
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  // Get all posts and filter by this author on client side since we have the author object populated
  const allPosts: Post[] = await getPosts()
  const authorPosts = allPosts.filter(post => 
    post.metadata.author?.id === author.id || post.metadata.author?.slug === author.slug
  )

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
              <Link href="/authors" className="hover:text-gray-700">Authors</Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{author.metadata.full_name || author.title}</li>
          </ol>
        </nav>

        {/* Author Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="text-center md:text-left md:flex md:items-start md:space-x-8">
            {/* Profile Photo */}
            <div className="flex-shrink-0 mb-6 md:mb-0">
              <div className="w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden bg-gray-200">
                {author.metadata.profile_photo?.imgix_url ? (
                  <img
                    src={`${author.metadata.profile_photo.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
                    alt={author.metadata.full_name || author.title}
                    className="w-full h-full object-cover"
                    width={128}
                    height={128}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Author Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {author.metadata.full_name || author.title}
              </h1>
              
              {author.metadata.specialty && (
                <p className="text-orange-600 font-medium mb-4">
                  {author.metadata.specialty}
                </p>
              )}

              {author.metadata.bio && (
                <p className="text-gray-600 leading-relaxed mb-6">
                  {author.metadata.bio}
                </p>
              )}

              {/* Contact & Social */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                {author.metadata.email && (
                  <a 
                    href={`mailto:${author.metadata.email}`}
                    className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact
                  </a>
                )}

                {author.metadata.instagram && (
                  <a 
                    href={`https://instagram.com/${author.metadata.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zm0 21.985c-5.518 0-9.998-4.48-9.998-9.998s4.48-9.998 9.998-9.998 9.998 4.48 9.998 9.998-4.48 9.998-9.998 9.998z" />
                    </svg>
                    @{author.metadata.instagram}
                  </a>
                )}

                {author.metadata.twitter && (
                  <a 
                    href={`https://twitter.com/${author.metadata.twitter}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-600 hover:text-orange-600 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    @{author.metadata.twitter}
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Author's Posts */}
        {authorPosts.length > 0 ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                {authorPosts.length} {authorPosts.length === 1 ? 'post' : 'posts'} by {author.metadata.full_name || author.title}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {authorPosts.map((post) => (
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
              Posts by {author.metadata.full_name || author.title} will appear here.
            </p>
            <Link 
              href="/authors"
              className="inline-flex items-center px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              Browse Other Authors
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}