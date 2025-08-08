import { Author } from '@/types'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-start space-x-4">
        {author.metadata?.profile_photo && (
          <img
            src={`${author.metadata.profile_photo.imgix_url}?w=120&h=120&fit=crop&auto=format,compress`}
            alt={author.metadata?.full_name || author.title}
            className="w-16 h-16 rounded-full object-cover"
            width={64}
            height={64}
          />
        )}
        
        <div className="flex-1">
          <h4 className="text-lg font-semibold text-gray-900">
            {author.metadata?.full_name || author.title}
          </h4>
          
          {author.metadata?.specialty && (
            <p className="text-primary font-medium mb-2">
              {author.metadata.specialty}
            </p>
          )}
          
          {author.metadata?.bio && (
            <p className="text-gray-600 text-sm mb-3">
              {author.metadata.bio}
            </p>
          )}
          
          {/* Social Links */}
          <div className="flex space-x-4">
            {author.metadata?.instagram && (
              <a
                href={`https://instagram.com/${author.metadata.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 text-sm"
              >
                Instagram
              </a>
            )}
            {author.metadata?.twitter && (
              <a
                href={`https://twitter.com/${author.metadata.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 text-sm"
              >
                Twitter
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}