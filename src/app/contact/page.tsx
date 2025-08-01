"use client"

import { useState } from 'react'
import { FaWhatsapp, FaEnvelope, FaPhone, FaCalendarAlt, FaTruck, FaUser, FaEnvelope as FaEmail, FaPhone as FaPhoneIcon } from 'react-icons/fa'

export default function Contact() {
  const [formData, setFormData] = useState({
    typeMarchandise: '',
    quantite: '',
    chargementCodePostal: '',
    chargementDate: '',
    livraisonCodePostal: '',
    livraisonDate: '',
    nom: '',
    email: '',
    telephone: '',
    transportRegulier: '',
    informationsComplementaires: '',
  })

  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({
    type: null,
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: 'success',
          message: data.message || 'Votre demande de transport a été envoyée avec succès. Un email de confirmation vous a été envoyé. Nous vous répondrons dans les plus brefs délais.',
        })
        setFormData({
          typeMarchandise: '',
          quantite: '',
          chargementCodePostal: '',
          chargementDate: '',
          livraisonCodePostal: '',
          livraisonDate: '',
          nom: '',
          email: '',
          telephone: '',
          transportRegulier: '',
          informationsComplementaires: '',
        })
      } else {
        // Gestion des erreurs détaillées
        let errorMessage = data.message || 'Une erreur est survenue'
        
        // Si c'est une erreur de validation avec plusieurs erreurs
        if (data.type === 'validation_error' && data.erreurs && Array.isArray(data.erreurs)) {
          errorMessage = data.message + '\n' + data.erreurs.join('\n')
        }
        
        setStatus({
          type: 'error',
          message: errorMessage,
        })
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error)
      setStatus({
        type: 'error',
        message: 'Une erreur de connexion est survenue. Veuillez vérifier votre connexion internet et réessayer.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <main className="min-h-screen pt-40 pb-40 bg-gradient-to-b from-[#17A9FF] to-[#0C79DF]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-white mb-4">Demande de Transport</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Remplissez ce formulaire pour obtenir un devis personnalisé pour votre transport de marchandises
          </p>
        </div>

        <div className="flex flex-col-reverse  gap-8 max-w-3xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white/20 rounded-2xl shadow-xl p-8 h-fit border border-white/70">
              <h2 className="text-2xl font-semibold mb-6 text-white">Nos Coordonnées</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaPhone className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Téléphone</p>
                    <p className="text-white/70">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaWhatsapp className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-white">WhatsApp</p>
                    <p className="text-white/70">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <FaEnvelope className="text-purple-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-white/70">contact@autowave.fr</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-white">Horaires d'ouverture</h3>
                <div className="space-y-2 text-white/70">
                  <p>Lundi - Vendredi: 8h00 - 18h00</p>
                  <p>Samedi: 9h00 - 12h00</p>
                  <p>Dimanche: Fermé</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/20 rounded-2xl shadow-xl p-8 border border-white/70">
              {status.type && (
                <div
                  className={`p-4 mb-6 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}
                >
                  <div className="whitespace-pre-line">{status.message}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type de marchandise et Quantité */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="typeMarchandise" className="block text-sm font-medium text-white mb-2">
                      Type de marchandise
                    </label>
                    <select
                      id="typeMarchandise"
                      name="typeMarchandise"
                      value={formData.typeMarchandise}
                      onChange={handleChange}
                      required
                      className="placeholder:text-white/70 w-full bg-white/20 px-4 py-3 border border-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Sélectionnez un type</option>
                      <option value="palettes">Palettes</option>
                      <option value="colis">Colis</option>
                      <option value="machines">Machines</option>
                      <option value="materiaux">Matériaux</option>
                      <option value="autres">Autres</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="quantite" className="block text-sm font-medium text-white mb-2">
                      Quantité
                    </label>
                    <input
                      type="text"
                      id="quantite"
                      name="quantite"
                      value={formData.quantite}
                      onChange={handleChange}
                      placeholder="Ex: nombre de palettes"
                      required
                      className="placeholder:text-white/70 w-full bg-white/20 px-4 py-3 border border-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Chargement */}
                <div className=" rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                    <FaTruck className="mr-2 text-blue-600" />
                    Chargement
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="chargementCodePostal" className="block text-sm font-medium text-white mb-2">
                        Code postal / Ville
                      </label>
                      <input
                        type="text"
                        id="chargementCodePostal"
                        name="chargementCodePostal"
                        value={formData.chargementCodePostal}
                        onChange={handleChange}
                        required
                        className="placeholder:text-white/70 w-full bg-white/20 px-4 py-3 border border-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="chargementDate" className="block text-sm font-medium text-white mb-2">
                        Date de chargement
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="chargementDate"
                          name="chargementDate"
                          value={formData.chargementDate}
                          onChange={handleChange}
                          required
                          className="placeholder:text-white/70 w-full bg-white/20 px-4 py-3 border border-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Livraison */}
                <div className="rounded-xl">
                  <h3 className="text-lg font-semibold mb-4 text-white flex items-center">
                    <FaTruck className="mr-2 text-yellow-400" />
                    Livraison
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="livraisonCodePostal" className="block text-sm font-medium text-white mb-2">
                        Code postal / Ville
                      </label>
                      <input
                        type="text"
                        id="livraisonCodePostal"
                        name="livraisonCodePostal"
                        value={formData.livraisonCodePostal}
                        onChange={handleChange}
                        required
                        className="placeholder:text-white/70 w-full bg-white/20 px-4 py-3 border border-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="livraisonDate" className="block text-sm font-medium text-white mb-2">
                        Date de livraison
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="livraisonDate"
                          name="livraisonDate"
                          value={formData.livraisonDate}
                          onChange={handleChange}
                          required
                          className="placeholder:text-white/70 w-full bg-white/20 px-4 py-3 border border-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informations personnelles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-medium text-white mb-2">
                      Nom
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        placeholder="Nom / Prénom"
                        required
                        className="placeholder:text-white/70 w-full bg-white/20 px-4 py-3 pl-10 border border-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                      E-mail
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="placeholder:text-white/70 w-full bg-white/20 px-4 py-3 pl-10 border border-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <FaEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                    </div>
                  </div>

                  <div>
                          <label htmlFor="telephone" className="block text-sm font-medium text-white mb-2">
                      Numéro de téléphone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        className="placeholder:text-white/70 w-full bg-white/20 px-4 py-3 pl-10 border border-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <FaPhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                    </div>
                  </div>
                </div>

                {/* Transport régulier */}
                <div>
                  <label className="block text-sm font-medium text-white mb-3">
                    Transport régulier ?
                  </label>
                  <div className="flex space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="transportRegulier"
                        value="oui"
                        checked={formData.transportRegulier === 'oui'}
                        onChange={handleChange}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-white">OUI</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="transportRegulier"
                        value="non"
                        checked={formData.transportRegulier === 'non'}
                        onChange={handleChange}
                        className="mr-2 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-white">NON</span>
                    </label>
                  </div>
                </div>

                {/* Informations complémentaires */}
                <div>
                    <label htmlFor="informationsComplementaires" className="block text-sm font-medium text-white mb-2">
                    Informations complémentaires
                  </label>
                  <textarea
                    id="informationsComplementaires"
                    name="informationsComplementaires"
                    value={formData.informationsComplementaires}
                    onChange={handleChange}
                    placeholder="Dimensions / poids / colisage / exigences diverses"
                    rows={4}
                    className="placeholder:text-white/70 w-full bg-white/20 px-4 py-3 border border-white/70 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-white primary-blue py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200  ${
                    isSubmitting
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:primary-blue-bg hover:text-white shadow-lg'
                  }`}
                >
                  {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 