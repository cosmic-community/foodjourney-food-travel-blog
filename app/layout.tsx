import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'
import SEOHead from '@/components/SEOHead'
import { generateSEOMetadata, generateStructuredData } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata = generateSEOMetadata({
  title: 'FoodJourney - Global Food Travel Blog',
  description: 'Discover amazing food experiences from around the world. Street food, local markets, fine dining, and sweet treats from passionate food travelers.',
  tags: ['food blog', 'travel blog', 'street food', 'fine dining', 'recipes', 'food photography', 'culinary travel', 'world cuisine'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  // Website structured data
  const websiteStructuredData = generateStructuredData({
    type: 'WebSite',
    props: {
      name: 'FoodJourney',
      description: 'Global food and travel blog featuring authentic culinary experiences from around the world',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  })

  const organizationStructuredData = generateStructuredData({
    type: 'Organization',
    props: {
      name: 'FoodJourney',
      description: 'Global food and travel blog',
      url: process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com',
      logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://foodjourney.com'}/logo.png`,
      sameAs: [
        // Add social media URLs here when available
      ],
    },
  })

  return (
    <html lang="en">
      <head>
        <SEOHead 
          structuredData={websiteStructuredData} 
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={organizationStructuredData}
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}