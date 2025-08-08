import { getPosts, getCategories } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import Hero from '@/components/Hero'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories()
  ])

  const featuredPost = posts[0] as Post
  const otherPosts = posts.slice(1) as Post[]

  return (
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
  )
}