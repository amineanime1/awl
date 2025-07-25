'use client'

import { useState, useRef } from 'react'
import { FaUpload, FaSpinner, FaTimes } from 'react-icons/fa'

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void
  currentImageUrl?: string
  folder?: string
  className?: string
  disabled?: boolean
}

export default function ImageUpload({
  onImageUpload,
  currentImageUrl,
  folder = 'awl-website',
  className = '',
  disabled = false
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validation du fichier
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image')
      return
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      setError('Le fichier est trop volumineux (max 10MB)')
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok && data.success) {
        onImageUpload(data.data.url)
      } else {
        throw new Error(data.error || 'Erreur lors de l\'upload')
      }
    } catch (error) {
      console.error('Erreur upload:', error)
      setError(error instanceof Error ? error.message : 'Erreur lors de l\'upload')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    onImageUpload('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Zone d'upload */}
      <div className="relative">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={disabled || isUploading}
          className="hidden"
        />
        
        <div
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
            ${disabled || isUploading 
              ? 'border-gray-300 bg-gray-50 cursor-not-allowed' 
              : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50'
            }
          `}
        >
          {isUploading ? (
            <div className="flex items-center justify-center space-x-2">
              <FaSpinner className="animate-spin text-blue-600" />
              <span className="text-blue-600">Upload en cours...</span>
            </div>
          ) : currentImageUrl ? (
            <div className="space-y-2">
              <img 
                src={currentImageUrl} 
                alt="Aperçu" 
                className="mx-auto max-h-32 rounded-lg object-cover"
              />
              <p className="text-sm text-gray-600">Cliquez pour changer l'image</p>
            </div>
          ) : (
            <div className="space-y-2">
              <FaUpload className="mx-auto text-3xl text-gray-400" />
              <p className="text-gray-600">
                Cliquez pour sélectionner une image
              </p>
              <p className="text-xs text-gray-500">
                JPG, PNG, WebP - Max 10MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <FaTimes />
          <span>{error}</span>
        </div>
      )}

      {/* Bouton supprimer */}
      {currentImageUrl && !disabled && (
        <button
          type="button"
          onClick={handleRemoveImage}
          className="flex items-center space-x-2 text-red-600 hover:text-red-700 text-sm"
        >
          <FaTimes />
          <span>Supprimer l'image</span>
        </button>
      )}
    </div>
  )
} 