"use client"

import React, { useState } from 'react'

interface ItemData {
  title: string
  description: string
  details: string
  image: string
  imageAlt: string
}

interface ItemsData {
  [key: string]: ItemData
}

const CommitmentsTowardsEnvironmentSection = () => {
  const [expandedItem, setExpandedItem] = useState<string>('optimisation')

  const items: ItemsData = {
    optimisation: {
      title: "Optimisation des trajets",
      description: "Moins de kilomètres = moins d'émissions.Nos livraisons sont pensées pour éviter les détours inutiles et réduire la consommation.",
      details: "Nos algorithmes de planification intelligente analysent en temps réel les conditions de trafic, la météo et les contraintes logistiques pour optimiser chaque trajet. Résultat : jusqu'à 25% de réduction des émissions CO2 et une livraison plus rapide.",
      image: "🗺️",
      imageAlt: "Carte de route optimisée avec trajets intelligents"
    },
    flotte: {
      title: "Flotte responsable",
      description: "Véhicules récents, entretenus, et < 3,5 T pour une empreinte plus légère.La puissance sans le poids carbone.",
      details: "100% de nos véhicules sont équipés de technologies de pointe : moteurs hybrides, systèmes de récupération d'énergie, et monitoring en temps réel des performances. Nous renouvelons notre flotte tous les 3 ans pour garantir les meilleures normes écologiques.",
      image: "🚛",
      imageAlt: "Camion moderne avec technologies vertes"
    },
    ecoConduite: {
      title: "Éco-conduite au quotidien",
      description: "Nos chauffeurs sont formés à l’éco-conduite : freinage doux, accélération maîtrisée et respect des vitesses.De petits gestes, un grand impact.",
      details: "Formation continue de nos équipes aux techniques d'éco-conduite : anticipation du trafic, gestion optimale des vitesses, et maintenance préventive. Chaque chauffeur suit un programme personnalisé avec suivi des performances et récompenses pour les meilleurs résultats.",
      image: "🌱",
      imageAlt: "Chauffeur formé à l'éco-conduite"
    },
    zeroPapier: {
      title: "Zéro papier, 100% digital",
      description: "Fiches de mission, suivi client et documents sont dématérialisés.Moins de papier, plus d’efficacité — pour vous et pour l’environnement.",
      details: "Plateforme digitale complète : bons de livraison électroniques, facturation numérique, suivi en temps réel, et archivage cloud sécurisé. Économie de plus de 50 000 feuilles par an et processus 100% traçable et transparent.",
      image: "📱",
      imageAlt: "Interface digitale moderne pour la gestion logistique"
    }
  }

  const handleItemClick = (key: string) => {
    setExpandedItem(key)
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="text-center mb-36">
          <div className="inline-flex items-center gap-2 py-2">
            <img src="/svg/awl-wave-vert.svg" alt="AWL Logo" className="w-10 h-10" />
            <span className="text-md font-light italic font-gantari">Livrer Vite, sans négliger demain</span>
          </div>
          <h2 className="font-gasoek text-4xl text-center mb-5">
            Notre engagement pour la planète
          </h2>
          <p className="font-gantari text-lg max-w-2xl mx-auto font-medium">
            Chez AWL, rapidité ne rime pas avec négligence.<br /> Nous agissons chaque jour pour réduire notre impact sur l'environnement.
          </p>
        </div>

        {/* Central Content Area */}<div className="relative mb-12">
          <div className="relative grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Expandable Buttons */}
            <div className="space-y-4 p-25">
              {Object.entries(items).map(([key, item]) => (
                <div key={key} className="w-full">
                  <div className={`transition-all duration-500 ease-in-out ${expandedItem === key ? 'transform scale-105' : ''
                    }`}>
                    {expandedItem === key ? (
                      // Expanded state - Blue box with title and description
                      <div className="primary-blue-bg text-white p-8 rounded-3xl mr-40 transform transition-all duration-500 ease-in-out">
                        <div className="flex items-center">
                          <span className="font-gantari font-extrabold italic text-3xl pb-2">{item.title}</span>
                        </div>
                        <span className="font-gantari font-base text-base leading-none">
                          {item.description}
                        </span>
                      </div>
                    ) : (
                      // Collapsed state - Button
                      <button
                        onClick={() => handleItemClick(key)}
                        className="w-full text-left p-4 rounded-xl bg-white text-[#989898] hover:text-black transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex items-center">
                          <span className="font-gantari font-extrabold italic text-2xl">{item.title}</span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Dynamic Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">
                    {expandedItem ? items[expandedItem].image : "🌍"}
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">
                    {expandedItem ? items[expandedItem].title : "Nos engagements"}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {expandedItem ? items[expandedItem].imageAlt : "Cliquez sur un engagement pour en savoir plus"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Call to Action */}
        <div className="text-center m-40">
          <h3 className="font-gantari text-3xl font-bold text-black mb-4">
            Livrer proprement, c'est livrer durablement
          </h3>
          <p className="text-sm text-center text-gray-700 mb-8 mx-auto font-gantari font-medium">
            Prêt à faire livrer vos marchandises avec efficacité et conscience?<br /> Obtenez un devis personnalisé en quelques clics.<br /> C'est rapide, gratuit, et pensé pour demain.
          </p>
          <button className="primary-blue-bg text-white px-8 py-3 rounded-full font-medium hover:bg-[#0C7EC0] transition-colors flex items-center mx-auto -mt-3">
            Obtenez un devis personnalisé
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

export default CommitmentsTowardsEnvironmentSection 