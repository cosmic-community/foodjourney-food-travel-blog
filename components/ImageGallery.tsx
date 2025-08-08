interface Image {
  url: string
  imgix_url: string
}

interface ImageGalleryProps {
  images: Image[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative group">
          <img
            src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={256}
          />
        </div>
      ))}
    </div>
  )
}