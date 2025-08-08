import { getAuthors } from '@/lib/cosmic'
import { Author } from '@/types'
import SEOHead from '@/components/SEOHead'
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo'
import Link from 'next/link'

export const metadata = generateSEOMetadata({
  title: 'Our Food & Travel Writers - Meet Our Authors',
  description: 'Meet our passionate food and travel writers who bring you authentic culinary experiences from around the globe. Expert insights from professional food photographers and travel specialists.',
  path: '/authors',
  tags: ['food writers', 'travel writers', 'food bloggers', 'culinary experts', 'travel experts', 'food photography'],
})

export default async function AuthorsPage() {
  const authors: Author[] = await getAuthors()

  const authorsStructuredData = generateStructuredData({
    type: 'CollectionPage',
    props: {
      name: 'Food & Travel Writers',
      description: 'Meet our team of food and travel writers',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'}/authors`,
      mainEntity: {
        '@type': 'ItemList',
        numberOfItems: authors.length,
        itemListElement: authors.map((author: Author, index: number) => ({
          '@type': 'Person',
          position: index + 1,
          name: author.metadata?.full_name || author.title,
          description: author.metadata?.bio,
          jobTitle: 'Food & Travel Writer',
          image: author.metadata?.profile_photo?.imgix_url,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'}/authors/${author.slug}`,
        })),
      },
    },
  })

  return (
    <>
      <SEOHead structuredData={authorsStructuredData} />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Authors
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the passionate food and travel writers who bring you authentic culinary experiences from around the globe
            </p>
          </div>

          {/* Authors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/authors/${author.slug}`}
                className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-8 text-center">
                  {/* Profile Photo */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                    {author.metadata?.profile_photo?.imgix_url ? (
                      <img
                        src={`${author.metadata.profile_photo.imgix_url}?w=192&h=192&fit=crop&auto=format,compress`}
                        alt={author.metadata.full_name || author.title}
                        className="w-full h-full object-cover"
                        width={96}
                        height={96}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Author Name */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {author.metadata?.full_name || author.title}
                  </h3>

                  {/* Specialty */}
                  {author.metadata?.specialty && (
                    <p className="text-orange-600 text-sm font-medium mb-3">
                      {author.metadata.specialty}
                    </p>
                  )}

                  {/* Bio Preview */}
                  {author.metadata?.bio && (
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {author.metadata.bio}
                    </p>
                  )}

                  {/* Social Links Preview */}
                  <div className="flex justify-center space-x-4 mt-4">
                    {author.metadata?.instagram && (
                      <div className="w-4 h-4 text-gray-400">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.648-.73-2.648-2.688 0-1.297.73-2.648 2.648-2.648s2.648 1.351 2.648 2.648c0 1.958-1.351 2.688-2.648 2.688zm7.718 0c-1.297 0-2.648-.73-2.648-2.688 0-1.297.73-2.648 2.648-2.648s2.648 1.351 2.648 2.648c0 1.958-1.351 2.688-2.648 2.688z"/>
                        </svg>
                      </div>
                    )}
                    {author.metadata?.twitter && (
                      <div className="w-4 h-4 text-gray-400">
                        <svg fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {authors.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No authors found</h3>
              <p className="text-gray-600">Author profiles will appear here once they're added to the CMS.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}