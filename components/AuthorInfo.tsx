import { Author } from '@/types'

interface AuthorInfoProps {
  author: Author
  size?: 'sm' | 'md'
}

export default function AuthorInfo({ author, size = 'md' }: AuthorInfoProps) {
  const avatarSize = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'
  const textSize = size === 'sm' ? 'text-sm' : 'text-base'
  
  return (
    <div className="flex items-center space-x-3">
      {author.metadata?.profile_photo && (
        <img
          src={`${author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
          alt={author.metadata?.full_name || author.title}
          className={`${avatarSize} rounded-full object-cover border-2 border-white`}
          width={40}
          height={40}
        />
      )}
      <div>
        <p className={`font-medium text-white ${textSize}`}>
          {author.metadata?.full_name || author.title}
        </p>
        {size === 'md' && author.metadata?.specialty && (
          <p className="text-white/80 text-sm">
            {author.metadata.specialty}
          </p>
        )}
      </div>
    </div>
  )
}