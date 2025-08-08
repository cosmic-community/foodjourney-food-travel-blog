'use client'

import { useState, useEffect } from 'react'

interface Image {
  url: string
  imgix_url: string
}

interface ImageGalleryProps {
  images: Image[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return

      switch (e.key) {
        case 'Escape':
          setSelectedImage(null)
          break
        case 'ArrowLeft':
          e.preventDefault()
          setSelectedImage(prev => 
            prev === null ? null : prev > 0 ? prev - 1 : images.length - 1
          )
          break
        case 'ArrowRight':
          e.preventDefault()
          setSelectedImage(prev => 
            prev === null ? null : prev < images.length - 1 ? prev + 1 : 0
          )
          break
      }
    }

    if (selectedImage !== null) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedImage, images.length])

  const goToPrevious = () => {
    setSelectedImage(prev => 
      prev === null ? null : prev > 0 ? prev - 1 : images.length - 1
    )
  }

  const goToNext = () => {
    setSelectedImage(prev => 
      prev === null ? null : prev < images.length - 1 ? prev + 1 : 0
    )
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative group cursor-pointer"
            onClick={() => setSelectedImage(index)}
          >
            <img
              src={`${image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
              width={400}
              height={256}
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-page Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-10"
            aria-label="Close gallery"
          >
            ×
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 text-white text-lg z-10">
            {selectedImage + 1} / {images.length}
          </div>

          {/* Previous arrow */}
          {images.length > 1 && (
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-10"
              aria-label="Previous image"
            >
              ‹
            </button>
          )}

          {/* Next arrow */}
          {images.length > 1 && (
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors z-10"
              aria-label="Next image"
            >
              ›
            </button>
          )}

          {/* Main image */}
          <div className="max-w-full max-h-full p-8 flex items-center justify-center">
            <img
              src={`${images[selectedImage].imgix_url}?w=1600&h=1200&fit=max&auto=format,compress`}
              alt={`Gallery image ${selectedImage + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={closeModal}
            />
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm opacity-70">
            Press ESC to close • Use arrow keys or click arrows to navigate
          </div>
        </div>
      )}
    </>
  )
}