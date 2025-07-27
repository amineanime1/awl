'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaSave, 
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaLeaf,
  FaSmile,
  FaImage
} from 'react-icons/fa'
import ImageUpload from '@/components/ImageUpload'

interface EnvironmentalCommitment {
  id: number
  title: string
  description: string
  details: string
  emoji: string
  image_url?: string // Nouveau champ pour l'image
  image_alt: string
  display_order: number
  is_active: boolean
}

export default function EnvironmentPage() {
  const [commitments, setCommitments] = useState<EnvironmentalCommitment[]>([])
  const [loading, setLoading] = useState(true)
  const [editingCommitment, setEditingCommitment] = useState<EnvironmentalCommitment | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const emojiOptions = ['🌍', '🚛', '🌱', '📱', '🗺️', '⚡', '♻️', '🌿']

  useEffect(() => {
    fetchCommitments()
  }, [])

  const fetchCommitments = async () => {
    if (!supabase) {
      console.warn('Supabase client not available')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('environmental_commitments')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setCommitments(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des engagements:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (commitment: EnvironmentalCommitment) => {
    if (!supabase) {
      setMessage({ type: 'error', text: 'Supabase client not available' })
      return
    }

    setSaving(true)
    setMessage(null)

    try {
      if (commitment.id) {
        // Mise à jour
        const { error } = await supabase
          .from('environmental_commitments')
          .update(commitment)
          .eq('id', commitment.id)

        if (error) throw error
      } else {
        // Création
        const { error } = await supabase
          .from('environmental_commitments')
          .insert([commitment])

        if (error) throw error
      }

      setMessage({ type: 'success', text: 'Engagement sauvegardé avec succès !' })
      setShowForm(false)
      setEditingCommitment(null)
      fetchCommitments()
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      setMessage({ type: 'error', text: 'Erreur lors de la sauvegarde' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!supabase) {
      setMessage({ type: 'error', text: 'Supabase client not available' })
      return
    }

    if (!confirm('Êtes-vous sûr de vouloir supprimer cet engagement ?')) return

    try {
      const { error } = await supabase
        .from('environmental_commitments')
        .delete()
        .eq('id', id)

      if (error) throw error
      setMessage({ type: 'success', text: 'Engagement supprimé avec succès !' })
      fetchCommitments()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      setMessage({ type: 'error', text: 'Erreur lors de la suppression' })
    }
  }

  const handleToggleActive = async (commitment: EnvironmentalCommitment) => {
    if (!supabase) {
      setMessage({ type: 'error', text: 'Supabase client not available' })
      return
    }

    try {
      const { error } = await supabase
        .from('environmental_commitments')
        .update({ is_active: !commitment.is_active })
        .eq('id', commitment.id)

      if (error) throw error

      setMessage({ 
        type: 'success', 
        text: `Engagement ${commitment.is_active ? 'désactivé' : 'activé'} avec succès !` 
      })
      fetchCommitments()
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error)
      setMessage({ type: 'error', text: 'Erreur lors du changement de statut' })
    }
  }

  const handleImageUpload = (imageUrl: string) => {
    if (editingCommitment) {
      setEditingCommitment({ ...editingCommitment, image_url: imageUrl })
    }
  }

  const handleRemoveImage = () => {
    if (editingCommitment) {
      setEditingCommitment({ ...editingCommitment, image_url: undefined })
    }
  }

  const handleAddNew = () => {
    setEditingCommitment({
      id: 0,
      title: '',
      description: '',
      details: '',
      emoji: '🌍',
      image_url: undefined,
      image_alt: '',
      display_order: commitments.length + 1,
      is_active: true
    })
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Engagements Environnementaux</h1>
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
          <h1 className="text-2xl font-semibold text-gray-900">Engagements Environnementaux</h1>
          <p className="text-gray-600 mt-1">Gérez vos engagements pour l'environnement</p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <FaPlus className="mr-2 h-4 w-4" />
          Ajouter un engagement
        </button>
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

      {/* Liste des engagements */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Engagements ({commitments.length})</h2>
        </div>
        
        <div className="p-6">
          {commitments.length === 0 ? (
            <div className="text-center py-12">
              <FaLeaf className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun engagement</h3>
              <p className="mt-1 text-sm text-gray-500">Commencez par ajouter votre premier engagement environnemental.</p>
              <div className="mt-6">
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <FaPlus className="mr-2 h-4 w-4" />
                  Ajouter un engagement
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {commitments.map((commitment) => (
                <div key={commitment.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  {/* Emoji/Image de l'engagement */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {commitment.image_url ? (
                        <img 
                          src={commitment.image_url} 
                          alt={commitment.image_alt}
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
                      <div className={`${commitment.image_url ? 'hidden' : 'flex'} w-full h-full items-center justify-center text-2xl`}>
                        {commitment.emoji}
                      </div>
                    </div>
                  </div>

                  {/* Informations de l'engagement */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{commitment.title}</h3>
                        <p className="text-gray-600 mt-1">{commitment.description}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          <p className="line-clamp-2">{commitment.details}</p>
                        </div>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Ordre: {commitment.display_order}</span>
                          <span>Image: {commitment.image_url ? 'Image uploadée' : 'Emoji: ' + commitment.emoji}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleActive(commitment)}
                          className={`p-2 rounded-lg ${
                            commitment.is_active 
                              ? 'text-green-600 hover:bg-green-50' 
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                          title={commitment.is_active ? 'Désactiver' : 'Activer'}
                        >
                          {commitment.is_active ? <FaEye className="h-4 w-4" /> : <FaEyeSlash className="h-4 w-4" />}
                        </button>
                        
                        <button
                          onClick={() => {
                            setEditingCommitment(commitment)
                            setShowForm(true)
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Modifier"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(commitment.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Supprimer"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de formulaire */}
      {showForm && editingCommitment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingCommitment.id ? 'Modifier l\'engagement' : 'Ajouter un engagement'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingCommitment(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault()
                handleSave(editingCommitment)
              }} className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Titre de l'engagement
                  </label>
                  <input
                    type="text"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Ex: Optimisation des trajets"
                    value={editingCommitment.title}
                    onChange={(e) => setEditingCommitment({ ...editingCommitment, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description courte
                  </label>
                  <textarea
                    required
                    rows={2}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Description courte qui apparaît dans la liste..."
                    value={editingCommitment.description}
                    onChange={(e) => setEditingCommitment({ ...editingCommitment, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Détails complets
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Description détaillée qui apparaît quand l'engagement est développé..."
                    value={editingCommitment.details}
                    onChange={(e) => setEditingCommitment({ ...editingCommitment, details: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaImage className="inline mr-2" />
                    Image de l'engagement
                  </label>
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    currentImageUrl={editingCommitment.image_url}
                    folder="awl-website/environment"
                    className="max-w-full"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    L'image remplacera l'emoji. Laissez vide pour utiliser l'emoji.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <FaSmile className="inline mr-2" />
                      Emoji (fallback)
                    </label>
                    <select
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={editingCommitment.emoji}
                      onChange={(e) => setEditingCommitment({ ...editingCommitment, emoji: e.target.value })}
                    >
                      {emojiOptions.map(emoji => (
                        <option key={emoji} value={emoji}>{emoji}</option>
                      ))}
                    </select>
                    <p className="mt-1 text-xs text-gray-500">
                      Utilisé si aucune image n'est uploadée
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ordre d'affichage
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      value={editingCommitment.display_order}
                      onChange={(e) => setEditingCommitment({ ...editingCommitment, display_order: parseInt(e.target.value) || 1 })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Texte alternatif de l'image
                  </label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Description de l'image pour l'accessibilité"
                    value={editingCommitment.image_alt}
                    onChange={(e) => setEditingCommitment({ ...editingCommitment, image_alt: e.target.value })}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    checked={editingCommitment.is_active}
                    onChange={(e) => setEditingCommitment({ ...editingCommitment, is_active: e.target.checked })}
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Engagement actif
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingCommitment(null)
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 