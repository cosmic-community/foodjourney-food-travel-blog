import { getPosts, getCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import Hero from '@/components/Hero'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'
import SEOHead from '@/components/SEOHead'
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo'

export const metadata = generateSEOMetadata({
  title: 'FoodJourney - Global Food Travel Blog',
  description: 'Discover amazing food experiences from around the world. Explore street food, local markets, fine dining, and sweet treats through our authentic travel stories and food photography.',
  tags: ['food blog', 'travel blog', 'street food', 'fine dining', 'world cuisine', 'food photography', 'culinary travel', 'food guide'],
})

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ])

  const featuredPost = posts[0] as Post
  const otherPosts = posts.slice(1) as Post[]

  // Generate structured data for the homepage
  const homepageStructuredData = generateStructuredData({
    type: 'WebSite',
    props: {
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'}/#website`,
      name: 'FoodJourney',
      description: 'Global food and travel blog featuring authentic culinary experiences',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com',
      inLanguage: 'en-US',
    },
  })

  const blogStructuredData = generateStructuredData({
    type: 'Blog',
    props: {
      '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'}/#blog`,
      name: 'FoodJourney Blog',
      description: 'Food and travel stories from around the world',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com',
      blogPost: posts.slice(0, 5).map((post: Post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'}/posts/${post.slug}`,
        datePublished: post.created_at,
        author: {
          '@type': 'Person',
          name: post.metadata?.author?.metadata?.full_name || post.metadata?.author?.title || 'FoodJourney Team',
        },
      })),
    },
  })

  return (
    <>
      <SEOHead structuredData={homepageStructuredData} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={blogStructuredData}
      />
      
      <div>
        {/* Hero Section with Featured Post */}
        {featuredPost && <Hero post={featuredPost} />}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Categories Filter */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore by Category</h2>
            <CategoryFilter categories={categories as Category[]} />
          </div>

          {/* Recent Posts */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Food Adventures</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}