import { v2 as cloudinary } from 'cloudinary'

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export default cloudinary

// Types pour les réponses Cloudinary
export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  url: string
  width: number
  height: number
  format: string
  resource_type: string
}

// Fonction utilitaire pour uploader une image
export async function uploadImage(
  file: Buffer,
  folder: string = 'awl-website',
  options: any = {}
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'auto' }
        ],
        ...options
      },
      (error, result) => {
        if (error) {
          reject(error)
        } else if (result) {
          resolve(result as CloudinaryUploadResult)
        } else {
          reject(new Error('Upload failed'))
        }
      }
    )

    uploadStream.end(file)
  })
}

// Fonction pour supprimer une image
export async function deleteImage(publicId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve()
      }
    })
  })
}

// Fonction pour obtenir l'URL optimisée d'une image
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: string
    format?: string
  } = {}
): string {
  const transformations = []
  
  if (options.width) transformations.push(`w_${options.width}`)
  if (options.height) transformations.push(`h_${options.height}`)
  if (options.quality) transformations.push(`q_${options.quality}`)
  if (options.format) transformations.push(`f_${options.format}`)
  
  const transformationString = transformations.length > 0 ? transformations.join(',') : 'auto'
  
  return cloudinary.url(publicId, {
    secure: true,
    transformation: transformationString
  })
} 