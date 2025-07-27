'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { FaSave, FaImage, FaQuoteLeft, FaUndo } from 'react-icons/fa'
import ImageUpload from '@/components/ImageUpload'

interface MissionData {
  id: number
  quote_text: string
  image_url: string
  image_alt: string
}

export default function MissionPage() {
  const [missionData, setMissionData] = useState<MissionData>({
    id: 1,
    quote_text: '"Livrer vite, bien, et toujours à l\'heure — c\'est notre promesse."',
    image_url: '/images/awl-mission.png',
    image_alt: 'AWL Mission'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchMissionData()
  }, [])

  const fetchMissionData = async () => {
    try {
      const { data, error } = await supabase
        .from('mission_section')
        .select('*')
        .single()

      if (error) throw error
      
      if (data) {
        setMissionData(data)
      }
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('mission_section')
        .update({
          quote_text: missionData.quote_text,
          image_url: missionData.image_url,
          image_alt: missionData.image_alt
        })
        .eq('id', missionData.id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Modifications sauvegardées avec succès !' })
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    fetchMissionData()
    setMessage(null)
  }

  const handleImageUpload = (imageUrl: string) => {
    setMissionData({ ...missionData, image_url: imageUrl })
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Section Mission</h1>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Section Mission</h1>
          <p className="text-gray-600 mt-1">Modifiez le contenu de la section Mission de votre site</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FaUndo className="mr-2 h-4 w-4" />
            Réinitialiser
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <FaSave className="mr-2 h-4 w-4" />
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      {/* Message de statut */}
      {message && (
        <div className={`p-4 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* Formulaire */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Contenu de la section Mission</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Citation */}
          <div>
            <label htmlFor="quote" className="block text-sm font-medium text-gray-700 mb-2">
              <FaQuoteLeft className="inline mr-2" />
              Citation principale
            </label>
            <textarea
              id="quote"
              rows={3}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Entrez la citation de votre mission..."
              value={missionData.quote_text}
              onChange={(e) => setMissionData({ ...missionData, quote_text: e.target.value })}
            />
            <p className="mt-1 text-sm text-gray-500">
              Cette citation apparaîtra dans la section Mission de votre site
            </p>
          </div>

          {/* Upload d'image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FaImage className="inline mr-2" />
              Image de la section Mission
            </label>
            <ImageUpload
              onImageUpload={handleImageUpload}
              currentImageUrl={missionData.image_url}
              folder="awl-website/mission"
              className="max-w-md"
            />
            <p className="mt-1 text-sm text-gray-500">
              L'image sera automatiquement optimisée et hébergée sur Cloudinary
            </p>
          </div>

          {/* Texte alternatif */}
          <div>
            <label htmlFor="imageAlt" className="block text-sm font-medium text-gray-700 mb-2">
              Texte alternatif de l'image
            </label>
            <input
              type="text"
              id="imageAlt"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description de l'image"
              value={missionData.image_alt}
              onChange={(e) => setMissionData({ ...missionData, image_alt: e.target.value })}
            />
            <p className="mt-1 text-sm text-gray-500">
              Description pour l'accessibilité
            </p>
          </div>

          {/* Aperçu */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Aperçu</h3>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="max-w-2xl">
                <blockquote className="text-lg text-gray-800 italic border-l-4 border-blue-500 pl-4 mb-4">
                  {missionData.quote_text}
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    {missionData.image_url ? (
                      <img 
                        src={missionData.image_url} 
                        alt={missionData.image_alt}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          img.style.display = 'none';
                          const next = img.nextElementSibling as HTMLElement | null;
                          if (next) {
                            next.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div className="hidden text-gray-400">
                      <FaImage className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Image: {missionData.image_url ? 'Image uploadée' : 'Aucune image'}</p>
                    <p className="text-sm text-gray-600">Alt: {missionData.image_alt}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 