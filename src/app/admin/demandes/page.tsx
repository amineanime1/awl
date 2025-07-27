'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { 
  FaEye, 
  FaEdit, 
  FaTrash, 
  FaFilter, 
  FaSearch,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUser,
  FaEnvelope,
  FaPhone
} from 'react-icons/fa'

interface DemandeTransport {
  id: number
  type_marchandise: string
  quantite: string
  chargement_code_postal: string
  chargement_date: string
  livraison_code_postal: string
  livraison_date: string
  nom: string
  email: string
  telephone: string
  transport_regulier: boolean
  informations_complementaires: string
  statut: string
  date_creation: string
  date_modification: string
}

export default function DemandesPage() {
  const [demandes, setDemandes] = useState<DemandeTransport[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedDemande, setSelectedDemande] = useState<DemandeTransport | null>(null)

  useEffect(() => {
    fetchDemandes()
  }, [])

  const fetchDemandes = async () => {
    if (!supabase) {
      console.warn('Supabase client not available')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('demandes_transport')
        .select('*')
        .order('date_creation', { ascending: false })

      if (error) throw error
      setDemandes(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement des demandes:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, newStatus: string) => {
    if (!supabase) {
      console.error('Supabase client not available')
      return
    }

    try {
      const { error } = await supabase
        .from('demandes_transport')
        .update({ statut: newStatus })
        .eq('id', id)

      if (error) throw error
      fetchDemandes() // Recharger les données
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
    }
  }

  const deleteDemande = async (id: number) => {
    if (!supabase) {
      console.error('Supabase client not available')
      return
    }

    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) return

    try {
      const { error } = await supabase
        .from('demandes_transport')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchDemandes() // Recharger les données
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
    }
  }

  const filteredDemandes = demandes.filter(demande => {
    const matchesSearch = 
      demande.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demande.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      demande.type_marchandise.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || demande.statut === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    const colors = {
      nouvelle: 'bg-blue-100 text-blue-800',
      en_cours: 'bg-yellow-100 text-yellow-800',
      devis_envoye: 'bg-green-100 text-green-800',
      acceptee: 'bg-emerald-100 text-emerald-800',
      refusee: 'bg-red-100 text-red-800',
      terminee: 'bg-gray-100 text-gray-800'
    }
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      nouvelle: 'Nouvelle',
      en_cours: 'En cours',
      devis_envoye: 'Devis envoyé',
      acceptee: 'Acceptée',
      refusee: 'Refusée',
      terminee: 'Terminée'
    }
    return labels[status as keyof typeof labels] || status
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Demandes de transport</h1>
        </div>
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="animate-pulse space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
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
          <h1 className="text-2xl font-semibold text-gray-900">Demandes de transport</h1>
          <p className="text-gray-600 mt-1">
            {filteredDemandes.length} demande{filteredDemandes.length !== 1 ? 's' : ''} trouvée{filteredDemandes.length !== 1 ? 's' : ''}
          </p>
        </div>
        <button
          onClick={fetchDemandes}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Actualiser
        </button>
      </div>

      {/* Filtres */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Rechercher
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nom, email, type de marchandise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select
              id="status"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="nouvelle">Nouvelle</option>
              <option value="en_cours">En cours</option>
              <option value="devis_envoye">Devis envoyé</option>
              <option value="acceptee">Acceptée</option>
              <option value="refusee">Refusée</option>
              <option value="terminee">Terminée</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des demandes */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Marchandise
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trajet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDemandes.map((demande) => (
                <tr key={demande.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{demande.nom}</div>
                      <div className="text-sm text-gray-500">{demande.email}</div>
                      <div className="text-sm text-gray-500">{demande.telephone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{demande.type_marchandise}</div>
                      <div className="text-sm text-gray-500">{demande.quantite}</div>
                      {demande.transport_regulier && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Régulier
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="h-4 w-4 text-red-500 mr-1" />
                        {demande.chargement_code_postal}
                      </div>
                      <div className="flex items-center mt-1">
                        <FaMapMarkerAlt className="h-4 w-4 text-green-500 mr-1" />
                        {demande.livraison_code_postal}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-1" />
                        {new Date(demande.chargement_date).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center mt-1">
                        <FaCalendarAlt className="h-4 w-4 text-gray-400 mr-1" />
                        {new Date(demande.livraison_date).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={demande.statut}
                      onChange={(e) => updateStatus(demande.id, e.target.value)}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(demande.statut)} border-0 focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="nouvelle">Nouvelle</option>
                      <option value="en_cours">En cours</option>
                      <option value="devis_envoye">Devis envoyé</option>
                      <option value="acceptee">Acceptée</option>
                      <option value="refusee">Refusée</option>
                      <option value="terminee">Terminée</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedDemande(demande)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir les détails"
                      >
                        <FaEye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteDemande(demande.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de détails */}
      {selectedDemande && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Détails de la demande</h3>
                <button
                  onClick={() => setSelectedDemande(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Informations client</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><FaUser className="inline mr-2" />{selectedDemande.nom}</p>
                    <p><FaEnvelope className="inline mr-2" />{selectedDemande.email}</p>
                    <p><FaPhone className="inline mr-2" />{selectedDemande.telephone}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Marchandise</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Type:</strong> {selectedDemande.type_marchandise}</p>
                    <p><strong>Quantité:</strong> {selectedDemande.quantite}</p>
                    <p><strong>Transport régulier:</strong> {selectedDemande.transport_regulier ? 'Oui' : 'Non'}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Trajet</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Chargement:</strong> {selectedDemande.chargement_code_postal} ({new Date(selectedDemande.chargement_date).toLocaleDateString('fr-FR')})</p>
                    <p><strong>Livraison:</strong> {selectedDemande.livraison_code_postal} ({new Date(selectedDemande.livraison_date).toLocaleDateString('fr-FR')})</p>
                  </div>
                </div>
                
                {selectedDemande.informations_complementaires && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Informations complémentaires</h4>
                    <p className="text-sm text-gray-600">{selectedDemande.informations_complementaires}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 