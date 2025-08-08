# 🍽️ FoodJourney - Food Travel Blog

![App Preview](https://imgix.cosmicjs.com/debd4a90-746d-11f0-a051-23c10f41277a-photo-1496116218417-1a781b1c416c-1754667568447.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A vibrant and modern food travel blog built with Next.js 15, showcasing culinary adventures from around the world. Features beautiful photography, author profiles, and category-based navigation.

## ✨ Features

- **🌍 Global Food Stories** - Discover street food, local markets, fine dining, and sweet treats from around the world
- **👥 Expert Authors** - Featured food travel experts with bios, specialties, and social media links
- **🏷️ Category Navigation** - Browse by food categories with vibrant colors and emojis
- **📸 Photo Galleries** - Multiple high-quality images per post with optimized loading
- **⏱️ Reading Time** - Estimated reading time for each article
- **📍 Location Tags** - Easy identification of food destinations
- **📱 Responsive Design** - Perfect experience on desktop, tablet, and mobile
- **🎨 Modern UI** - Clean, magazine-style layout with vibrant colors

## Clone this Bucket

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=689619814c48db910ba2080c&clone_repository=68961b064c48db910ba20829)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> Create a content model for a food travel blog with posts, authors, and categories

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. A food travel blog with modern style and vibrant colors

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Cosmic** - Headless CMS for content management
- **React** - Component-based UI library

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: use the latest LTS version)
- A Cosmic account and bucket

### Installation

1. Clone this repository:
```bash
git clone <your-repo-url>
cd food-travel-blog
```

2. Install dependencies:
```bash
bun install
```

3. Set up your environment variables:
```bash
# Copy the example file
cp .env.example .env.local

# Add your Cosmic credentials
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Cosmic SDK Examples

### Fetching Posts
```typescript
import { cosmic } from '@/lib/cosmic'

// Get all posts with authors and categories
const response = await cosmic.objects
  .find({ type: 'posts' })
  .props(['title', 'slug', 'metadata'])
  .depth(1)

const posts = response.objects
```

### Fetching by Category
```typescript
// Get posts by category
const response = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.category': categoryId 
  })
  .depth(1)
```

### Get Single Post
```typescript
// Get post by slug with related data
const response = await cosmic.objects
  .findOne({ 
    type: 'posts',
    slug: postSlug 
  })
  .depth(1)

const post = response.object
```

## 🌐 Cosmic CMS Integration

This application integrates with three main content types in your Cosmic bucket:

### Posts
- **Title** - Post headline
- **Excerpt** - Brief summary
- **Content** - Main article (HTML)
- **Featured Image** - Hero image
- **Gallery** - Additional food photos
- **Location** - City, Country
- **Author** - Connected author object
- **Category** - Connected category object
- **Tags** - Comma-separated tags
- **Reading Time** - Minutes to read

### Authors
- **Full Name** - Author's complete name
- **Bio** - Short biography
- **Profile Photo** - Author headshot
- **Email** - Contact email
- **Instagram/Twitter** - Social media handles
- **Specialty** - Food/travel focus area

### Categories
- **Name** - Category title
- **Description** - Category description
- **Color** - Brand color for the category
- **Icon Emoji** - Visual emoji representation

## 🚀 Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Deploy to Netlify

1. Build the application: `bun run build`
2. Upload the `out` directory to Netlify
3. Set your environment variables in Netlify dashboard

### Environment Variables

Add these variables in your hosting platform:

```bash
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

<!-- README_END -->