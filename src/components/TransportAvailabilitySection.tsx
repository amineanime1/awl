"use client"

import React from 'react'
import FranceMap from './FranceMap'

const TransportAvailabilitySection = () => {
  const regions = [
    { name: "Île-de-France", cities: ["Paris", "Versailles", "Saint-Denis"] },
    { name: "Auvergne-Rhône-Alpes", cities: ["Lyon", "Grenoble", "Saint-Étienne"] },
    { name: "Occitanie", cities: ["Toulouse", "Montpellier", "Nîmes"] },
    { name: "Nouvelle-Aquitaine", cities: ["Bordeaux", "Limoges", "Poitiers"] },
    { name: "Hauts-de-France", cities: ["Lille", "Amiens", "Valenciennes"] },
    { name: "Grand Est", cities: ["Strasbourg", "Reims", "Nancy"] },
    { name: "Pays de la Loire", cities: ["Nantes", "Angers", "Le Mans"] },
    { name: "Bretagne", cities: ["Rennes", "Brest", "Vannes"] },
    { name: "Centre-Val de Loire", cities: ["Tours", "Orléans", "Bourges"] },
    { name: "Bourgogne-Franche-Comté", cities: ["Dijon", "Besançon", "Chalon-sur-Saône"] },
    { name: "Normandie", cities: ["Rouen", "Le Havre", "Caen"] },
    { name: "Provence-Alpes-Côte d'Azur", cities: ["Marseille", "Nice", "Toulon"] }
  ]

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6 md:space-y-8">
            {/* Header */}
            <div className="space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 py-2">
                <img src="/svg/awl-wave-bleu-foncée.svg" alt="AWL Logo" className="w-6 h-6 md:w-8 md:h-8" />
                <span className="text-xs md:text-sm font-light italic font-gantari">Couverture nationale</span>
              </div>
              <h2 className="font-gasoek text-2xl sm:text-3xl md:text-4xl text-black">
                Transport disponible dans toute la France
              </h2>
              <p className="font-gantari text-base md:text-lg text-gray-700 leading-relaxed">
                Notre réseau de transport s'étend sur l'ensemble du territoire français. 
                De Lille à Nice, de Brest à Strasbourg, nous assurons vos livraisons partout en France.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-blue-100 p-1.5 md:p-2 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-gantari font-semibold text-base md:text-lg text-black mb-1 md:mb-2">Couverture nationale</h3>
                  <p className="font-gantari text-sm md:text-base text-gray-600">
                    Plus de 12 régions couvertes avec des points de collecte et de livraison dans toutes les grandes villes françaises.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-green-100 p-1.5 md:p-2 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-gantari font-semibold text-base md:text-lg text-black mb-1 md:mb-2">Livraison rapide</h3>
                  <p className="font-gantari text-sm md:text-base text-gray-600">
                    Délais de livraison optimisés : 24h en région, 48h pour les destinations plus éloignées.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="bg-purple-100 p-1.5 md:p-2 rounded-full flex-shrink-0">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-gantari font-semibold text-base md:text-lg text-black mb-1 md:mb-2">Suivi en temps réel</h3>
                  <p className="font-gantari text-sm md:text-base text-gray-600">
                    Suivez vos colis en temps réel avec notre plateforme digitale, disponible 24h/24 et 7j/7.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="primary-blue-bg text-white px-6 md:px-8 py-3 md:py-4 shadow-lg rounded-full font-semibold hover:bg-[#0C7EC0] transition-colors flex items-center text-sm md:text-base">
                Demander un devis 
                <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Side - France Map */}
          <div className="relative order-first md:order-last">
            <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 lg:p-8 shadow-lg border border-gray-100">
              <div className="text-center mb-4 md:mb-6">
                <h3 className="font-gantari font-semibold text-lg md:text-xl text-black mb-1 md:mb-2">Carte de couverture</h3>
                <p className="font-gantari text-xs md:text-sm text-gray-600">Nos zones de service en France</p>
              </div>
              
              {/* Interactive France Map */}
              <div className="h-64 sm:h-80 md:h-96">
                <FranceMap />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 mt-4 md:mt-6">
                <div className="text-center">
                  <div className="font-gantari font-bold text-lg md:text-2xl text-blue-600">101</div>
                  <div className="font-gantari text-xs text-gray-600">Régions</div>
                </div>
                <div className="text-center">
                  <div className="font-gantari font-bold text-lg md:text-2xl text-green-600">30k+</div>
                  <div className="font-gantari text-xs text-gray-600">Villes</div>
                </div>
                <div className="text-center">
                  <div className="font-gantari font-bold text-lg md:text-2xl text-purple-600">24h/48h</div>
                  <div className="font-gantari text-xs text-gray-600">Livraison</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TransportAvailabilitySection 