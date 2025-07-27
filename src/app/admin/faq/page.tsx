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
  FaQuestionCircle,
  FaSort
} from 'react-icons/fa'

interface FaqItem {
  id: number
  question: string
  answer: string
  display_order: number
  is_active: boolean
}

export default function FaqPage() {
  const [faqItems, setFaqItems] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchFaqItems()
  }, [])

  const fetchFaqItems = async () => {
    if (!supabase) {
      console.warn('Supabase client not available')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase
        .from('faq_items')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setFaqItems(data || [])
    } catch (error) {
      console.error('Erreur lors du chargement de la FAQ:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (item: FaqItem) => {
    if (!supabase) {
      setMessage({ type: 'error', text: 'Supabase client not available' })
      return
    }

    setSaving(true)
    setMessage(null)

    try {
      if (item.id) {
        // Mise à jour
        const { error } = await supabase
          .from('faq_items')
          .update(item)
          .eq('id', item.id)

        if (error) throw error
      } else {
        // Création
        const { error } = await supabase
          .from('faq_items')
          .insert([item])

        if (error) throw error
      }

      setMessage({ type: 'success', text: 'Question FAQ sauvegardée avec succès !' })
      setShowForm(false)
      setEditingItem(null)
      fetchFaqItems()
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

    if (!confirm('Êtes-vous sûr de vouloir supprimer cette question ?')) return

    try {
      const { error } = await supabase
        .from('faq_items')
        .delete()
        .eq('id', id)

      if (error) throw error

      setMessage({ type: 'success', text: 'Question supprimée avec succès !' })
      fetchFaqItems()
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      setMessage({ type: 'error', text: 'Erreur lors de la suppression' })
    }
  }

  const handleToggleActive = async (item: FaqItem) => {
    if (!supabase) {
      console.error('Supabase client not available')
      return
    }

    try {
      const { error } = await supabase
        .from('faq_items')
        .update({ is_active: !item.is_active })
        .eq('id', item.id)

      if (error) throw error
      fetchFaqItems()
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error)
    }
  }

  const handleReorder = async (itemId: number, newOrder: number) => {
    if (!supabase) {
      console.error('Supabase client not available')
      return
    }

    try {
      const { error } = await supabase
        .from('faq_items')
        .update({ display_order: newOrder })
        .eq('id', itemId)

      if (error) throw error
      fetchFaqItems()
    } catch (error) {
      console.error('Erreur lors du réordonnancement:', error)
    }
  }

  const newFaqItem: FaqItem = {
    id: 0,
    question: '',
    answer: '',
    display_order: faqItems.length + 1,
    is_active: true
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">Gestion de la FAQ</h1>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="animate-pulse space-y-4">
            {[...Array(5)].map((_, i) => (
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
          <h1 className="text-2xl font-semibold text-gray-900">Gestion de la FAQ</h1>
          <p className="text-gray-600 mt-1">Ajoutez, modifiez ou supprimez les questions fréquemment posées</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(newFaqItem)
            setShowForm(true)
          }}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          <FaPlus className="mr-2 h-4 w-4" />
          Ajouter une question
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

      {/* Liste des questions FAQ */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Questions FAQ ({faqItems.length})</h2>
        </div>
        
        <div className="divide-y divide-gray-200">
          {faqItems.map((item, index) => (
            <div key={item.id} className="p-6">
              <div className="flex items-start space-x-4">
                {/* Numéro d'ordre */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 font-medium text-sm">
                    {item.display_order}
                  </div>
                </div>

                {/* Contenu de la question */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        <FaQuestionCircle className="mr-2 text-orange-500" />
                        {item.question}
                      </h3>
                      <p className="text-gray-600 mt-2 line-clamp-2">{item.answer}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Ordre: {item.display_order}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.is_active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleToggleActive(item)}
                        className={`p-2 rounded-lg ${
                          item.is_active 
                            ? 'text-green-600 hover:bg-green-50' 
                            : 'text-gray-400 hover:bg-gray-50'
                        }`}
                        title={item.is_active ? 'Désactiver' : 'Activer'}
                      >
                        {item.is_active ? <FaEye className="h-4 w-4" /> : <FaEyeSlash className="h-4 w-4" />}
                      </button>
                      
                      <button
                        onClick={() => {
                          setEditingItem(item)
                          setShowForm(true)
                        }}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Modifier"
                      >
                        <FaEdit className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        title="Supprimer"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de formulaire */}
      {showForm && editingItem && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {editingItem.id ? 'Modifier la question' : 'Ajouter une question'}
                </h3>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingItem(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault()
                handleSave(editingItem)
              }} className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaQuestionCircle className="inline mr-2" />
                    Question
                  </label>
                  <textarea
                    required
                    rows={2}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Entrez votre question..."
                    value={editingItem.question}
                    onChange={(e) => setEditingItem({ ...editingItem, question: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Réponse
                  </label>
                  <textarea
                    required
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Entrez la réponse à cette question..."
                    value={editingItem.answer}
                    onChange={(e) => setEditingItem({ ...editingItem, answer: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <FaSort className="inline mr-2" />
                    Ordre d'affichage
                  </label>
                  <input
                    type="number"
                    min="1"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    value={editingItem.display_order}
                    onChange={(e) => setEditingItem({ ...editingItem, display_order: parseInt(e.target.value) })}
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isActive"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    checked={editingItem.is_active}
                    onChange={(e) => setEditingItem({ ...editingItem, is_active: e.target.checked })}
                  />
                  <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                    Question active
                  </label>
                </div>

                {/* Aperçu */}
                <div className="border-t border-gray-200 pt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aperçu</label>
                  <div className="bg-orange-50 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <FaQuestionCircle className="text-orange-500 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {editingItem.question || 'Votre question ici...'}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {editingItem.answer || 'Votre réponse ici...'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingItem(null)
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
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