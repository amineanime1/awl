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
  FaInfoCircle
} from 'react-icons/fa'

interface ServiceDetails {
  id: number
  service_id: number
  subtitle: string
  detailed_description: string
  features: any
  process_steps: any
  is_active: boolean
  display_order: number
}

interface Service {
  id: number
  title: string
}

interface Feature {
  icon: string
  title: string
  description: string
}

export default function ServiceDetailsPage() {
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [editingDetails, setEditingDetails] = useState<ServiceDetails | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  // États pour les formulaires dynamiques
  const [features, setFeatures] = useState<Feature[]>([])
  const [processSteps, setProcessSteps] = useState<string[]>([])

  const iconOptions = [
    'FaTruck', 'FaBox', 'FaCar', 'FaClock', 'FaRoute', 'FaFlag', 'FaShieldAlt', 
    'FaMapMarkedAlt', 'FaUsers', 'FaTools', 'FaThermometerHalf', 'FaClipboardCheck', 
    'MdLocalShipping', 'MdSpeed', 'MdSecurity', 'MdLocationOn', 'MdSchedule', 'MdPayment'
  ]

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    if (!supabase) {
      console.warn('Supabase client not available')
      setLoading(false)
      return
    }

    try {
      // Récupérer les services pour le select
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('id, title')
        .eq('is_active', true)
        .order('display_order', { ascending: true })

      if (servicesError) throw servicesError
      setServices(servicesData || [])

      // Récupérer les détails des services
      const { data: detailsData, error: detailsError } = await supabase
        .from('service_details')
        .select('*')
        .order('display_order', { ascending: true })

      if (detailsError) throw detailsError
      setServiceDetails(detailsData || [])
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (details: ServiceDetails) => {
    if (!supabase) {
      setMessage({ type: 'error', text: 'Supabase client not available' })
      return
    }

    setSaving(true)
    setMessage(null)

    try {
      // Convertir les formulaires en JSON
      const detailsWithJson = {
        ...details,
        features: features,
        process_steps: processSteps
      }

      if (details.id) {
        // Mise à jour
        const { error } = await supabase
          .from('service_details')
          .update(detailsWithJson)
          .eq('id', details.id)

        if (error) throw error
      } else {
        // Création
        const { error } = await supabase
          .from('service_details')
          .insert([detailsWithJson])

        if (error) throw error
      }

      setMessage({ type: 'success', text: 'Détails sauvegardés avec succès !' })
      setShowForm(false)
      setEditingDetails(null)
      resetForm()
      fetchData()
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

    if (!confirm('Êtes-vous sûr de vouloir supprimer ces détails ?')) return

    try {
      const { error } = await supabase
        .from('service_details')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Détails supprimés avec succès !' })
      fetchData()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      setMessage({ type: 'error', text: 'Erreur lors de la suppression' })
    }
  }

  const handleToggleActive = async (details: ServiceDetails) => {
    if (!supabase) {
      console.error('Supabase client not available')
      return
    }

    try {
      const { error } = await supabase
        .from('service_details')
        .update({ is_active: !details.is_active })
        .eq('id', details.id)

      if (error) throw error
      fetchData()
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  const getServiceTitle = (serviceId: number) => {
    const service = services.find(s => s.id === serviceId)
    return service?.title || `Service ${serviceId}`
  }

  const resetForm = () => {
    setFeatures([])
    setProcessSteps([])
  }

  const addFeature = () => {
    setFeatures([...features, { icon: 'FaTruck', title: '', description: '' }])
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const updateFeature = (index: number, field: keyof Feature, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = { ...newFeatures[index], [field]: value }
    setFeatures(newFeatures)
  }

  const addProcessStep = () => {
    setProcessSteps([...processSteps, ''])
  }

  const removeProcessStep = (index: number) => {
    setProcessSteps(processSteps.filter((_, i) => i !== index))
  }

  const updateProcessStep = (index: number, value: string) => {
    const newSteps = [...processSteps]
    newSteps[index] = value
    setProcessSteps(newSteps)
  }

  const openEditForm = (details: ServiceDetails) => {
    setEditingDetails(details)
    setFeatures(details.features || [])
    setProcessSteps(details.process_steps || [])
    setShowForm(true)
  }

  const openNewForm = () => {
    setEditingDetails(newServiceDetails)
    resetForm()
    setShowForm(true)
  }

  const newServiceDetails: ServiceDetails = {
    id: 0,
    service_id: services[0]?.id || 1,
    subtitle: '',
    detailed_description: '',
    features: [],
    process_steps: [],
    is_active: true,
    display_order: serviceDetails.length + 1
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Gestion des Détails des Services</h1>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
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
          <h1 className="text-2xl font-semibold text-gray-900">Gestion des Détails des Services</h1>
          <p className="text-gray-600 mt-1">Configurez le contenu détaillé de chaque service pour la page services</p>
          
          {/* Note importante */}
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <FaInfoCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800 font-medium">Page Services</p>
                <p className="text-xs text-blue-700 mt-1">
                  Ces détails sont utilisés pour afficher le contenu détaillé de chaque service sur la page /services. 
                  Chaque service peut avoir une section avec sous-titre, description détaillée, fonctionnalités et processus.
                </p>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={openNewForm}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <FaPlus className="mr-2 h-4 w-4" />
          Ajouter des détails
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

      {/* Liste des détails */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Détails des Services ({serviceDetails.length})</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {serviceDetails.map((details) => (
            <div key={details.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">SD</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {getServiceTitle(details.service_id)}
                      </h3>
                      <p className="text-gray-600">{details.subtitle}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Ordre: {details.display_order}</span>
                        <span>Fonctionnalités: {details.features?.length || 0}</span>
                        <span>Étapes: {details.process_steps?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleToggleActive(details)}
                    className={`p-2 rounded-lg ${
                      details.is_active 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                    title={details.is_active ? 'Désactiver' : 'Activer'}
                  >
                    {details.is_active ? <FaEye className="h-4 w-4" /> : <FaEyeSlash className="h-4 w-4" />}
                  </button>
                  
                  <button
                    onClick={() => openEditForm(details)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    title="Modifier"
                  >
                    <FaEdit className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDelete(details.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    title="Supprimer"
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de formulaire */}
      {showForm && editingDetails && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-[800px] shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingDetails.id ? 'Modifier les détails' : 'Ajouter des détails'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingDetails(null)
                    resetForm()
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault()
                handleSave(editingDetails)
              }} className="space-y-6">
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service
                    </label>
                    <select
                      required
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editingDetails.service_id}
                      onChange={(e) => setEditingDetails({ ...editingDetails, service_id: parseInt(e.target.value) })}
                    >
                      {services.map(service => (
                        <option key={service.id} value={service.id}>{service.title}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ordre d'affichage
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editingDetails.display_order}
                      onChange={(e) => setEditingDetails({ ...editingDetails, display_order: parseInt(e.target.value) })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sous-titre
                  </label>
                  <input
                    type="text"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editingDetails.subtitle}
                    onChange={(e) => setEditingDetails({ ...editingDetails, subtitle: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description détaillée
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={editingDetails.detailed_description}
                    onChange={(e) => setEditingDetails({ ...editingDetails, detailed_description: e.target.value })}
                  />
                </div>

                {/* Fonctionnalités */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Fonctionnalités
                    </label>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                    >
                      <FaPlus className="mr-1 h-3 w-3" />
                      Ajouter
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {features.map((feature, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-gray-700">Fonctionnalité {index + 1}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Icône</label>
                            <select
                              className="block w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              value={feature.icon}
                              onChange={(e) => updateFeature(index, 'icon', e.target.value)}
                            >
                              {iconOptions.map(icon => (
                                <option key={icon} value={icon}>{icon}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Titre</label>
                            <input
                              type="text"
                              className="block w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              value={feature.title}
                              onChange={(e) => updateFeature(index, 'title', e.target.value)}
                              placeholder="Ex: Flotte Moderne"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                            <textarea
                              rows={2}
                              className="block w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                              value={feature.description}
                              onChange={(e) => updateFeature(index, 'description', e.target.value)}
                              placeholder="Ex: Véhicules équipés des dernières technologies"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {features.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>Aucune fonctionnalité ajoutée</p>
                        <p className="text-sm">Cliquez sur "Ajouter" pour commencer</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Étapes du processus */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Étapes du processus
                    </label>
                    <button
                      type="button"
                      onClick={addProcessStep}
                      className="inline-flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                    >
                      <FaPlus className="mr-1 h-3 w-3" />
                      Ajouter
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {processSteps.map((step, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                          value={step}
                          onChange={(e) => updateProcessStep(index, e.target.value)}
                          placeholder={`Étape ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeProcessStep(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    
                    {processSteps.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p>Aucune étape ajoutée</p>
                        <p className="text-sm">Cliquez sur "Ajouter" pour commencer</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={editingDetails.is_active}
                    onChange={(e) => setEditingDetails({ ...editingDetails, is_active: e.target.checked })}
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Détails actifs
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingDetails(null)
                      resetForm()
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