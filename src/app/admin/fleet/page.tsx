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
  FaTruck,
  FaImage
} from 'react-icons/fa'
import ImageUpload from '@/components/ImageUpload'

interface FleetVehicle {
  id: number
  name: string
  description: string
  image_url: string
  image_alt: string
  display_order: number
  is_active: boolean
}

export default function FleetPage() {
  const [vehicles, setVehicles] = useState<FleetVehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [editingVehicle, setEditingVehicle] = useState<FleetVehicle | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchVehicles()
  }, [])

  const fetchVehicles = async () => {
    if (!supabase) {
      console.warn('Supabase client not available')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('fleet_vehicles')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setVehicles(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des véhicules:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (vehicle: FleetVehicle) => {
    if (!supabase) {
      setMessage({ type: 'error', text: 'Supabase client not available' })
      return
    }

    setSaving(true)
    setMessage(null)

    try {
      if (vehicle.id) {
        // Mise à jour
        const { error } = await supabase
          .from('fleet_vehicles')
          .update(vehicle)
          .eq('id', vehicle.id)

        if (error) throw error
      } else {
        // Création
        const { error } = await supabase
          .from('fleet_vehicles')
          .insert([vehicle])

        if (error) throw error
      }

      setMessage({ type: 'success', text: 'Véhicule sauvegardé avec succès !' })
      setShowForm(false)
      setEditingVehicle(null)
      fetchVehicles()
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

    if (!confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) return

    try {
      const { error } = await supabase
        .from('fleet_vehicles')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Véhicule supprimé avec succès !' })
      fetchVehicles()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      setMessage({ type: 'error', text: 'Erreur lors de la suppression' })
    }
  }

  const handleToggleActive = async (vehicle: FleetVehicle) => {
    if (!supabase) {
      setMessage({ type: 'error', text: 'Supabase client not available' })
      return
    }

    try {
      const { error } = await supabase
        .from('fleet_vehicles')
        .update({ is_active: !vehicle.is_active })
        .eq('id', vehicle.id)

      if (error) throw error

      setMessage({ 
        type: 'success', 
        text: `Véhicule ${vehicle.is_active ? 'désactivé' : 'activé'} avec succès !` 
      })
      fetchVehicles()
    } catch (error) {
      console.error('Erreur lors du changement de statut:', error)
      setMessage({ type: 'error', text: 'Erreur lors du changement de statut' })
    }
  }

  const handleImageUpload = (imageUrl: string) => {
    if (editingVehicle) {
      setEditingVehicle({ ...editingVehicle, image_url: imageUrl })
    }
  }

  const handleAddNew = () => {
    setEditingVehicle({
      id: 0,
      name: '',
      description: '',
      image_url: '',
      image_alt: '',
      display_order: vehicles.length + 1,
      is_active: true
    })
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Gestion de la Flotte</h1>
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
          <h1 className="text-2xl font-semibold text-gray-900">Gestion de la Flotte</h1>
          <p className="text-gray-600 mt-1">Gérez les véhicules de votre flotte</p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaPlus className="mr-2 h-4 w-4" />
          Ajouter un véhicule
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

      {/* Liste des véhicules */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Véhicules ({vehicles.length})</h2>
        </div>
        
        <div className="p-6">
          {vehicles.length === 0 ? (
            <div className="text-center py-12">
              <FaTruck className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun véhicule</h3>
              <p className="mt-1 text-sm text-gray-500">Commencez par ajouter votre premier véhicule.</p>
              <div className="mt-6">
                <button
                  onClick={handleAddNew}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaPlus className="mr-2 h-4 w-4" />
                  Ajouter un véhicule
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {vehicles.map((vehicle) => (
                <div key={vehicle.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  {/* Image du véhicule */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                      {vehicle.image_url ? (
                        <img 
                          src={vehicle.image_url} 
                          alt={vehicle.image_alt}
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
                      <div className="hidden w-full h-full flex items-center justify-center text-gray-400">
                        <FaTruck className="h-8 w-8" />
                      </div>
                    </div>
                  </div>

                  {/* Informations du véhicule */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{vehicle.name}</h3>
                        <p className="text-gray-600 mt-1">{vehicle.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Ordre: {vehicle.display_order}</span>
                          <span>Image: {vehicle.image_url ? 'Image uploadée' : 'Aucune image'}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleActive(vehicle)}
                          className={`p-2 rounded-lg ${
                            vehicle.is_active 
                              ? 'text-green-600 hover:bg-green-50' 
                              : 'text-gray-400 hover:bg-gray-50'
                          }`}
                          title={vehicle.is_active ? 'Désactiver' : 'Activer'}
                        >
                          {vehicle.is_active ? <FaEye className="h-4 w-4" /> : <FaEyeSlash className="h-4 w-4" />}
                        </button>
                        
                        <button
                          onClick={() => {
                            setEditingVehicle(vehicle)
                            setShowForm(true)
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Modifier"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        
                        <button
                          onClick={() => handleDelete(vehicle.id)}
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
      {showForm && editingVehicle && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingVehicle.id ? 'Modifier le véhicule' : 'Ajouter un véhicule'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingVehicle(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault()
                handleSave(editingVehicle)
              }} className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom du véhicule
                  </label>
                  <input
                    type="text"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ex: Kangoo, Fourgon 12 m³"
                    value={editingVehicle.name}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    required
                    rows={3}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description du véhicule et de ses capacités..."
                    value={editingVehicle.description}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaImage className="inline mr-2" />
                    Image du véhicule
                  </label>
                  <ImageUpload
                    onImageUpload={handleImageUpload}
                    currentImageUrl={editingVehicle.image_url}
                    folder="awl-website/fleet"
                    className="max-w-full"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    L'image sera automatiquement optimisée et hébergée sur Cloudinary
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Texte alternatif de l'image
                  </label>
                  <input
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Description de l'image pour l'accessibilité"
                    value={editingVehicle.image_alt}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, image_alt: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ordre d'affichage
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editingVehicle.display_order}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, display_order: parseInt(e.target.value) || 1 })}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={editingVehicle.is_active}
                    onChange={(e) => setEditingVehicle({ ...editingVehicle, is_active: e.target.checked })}
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Véhicule actif
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingVehicle(null)
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
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