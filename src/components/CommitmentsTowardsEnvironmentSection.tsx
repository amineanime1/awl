"use client"

import React, { useState } from 'react'
import type { EnvironmentalCommitmentData } from '@/lib/supabase/server'

interface CommitmentsTowardsEnvironmentSectionProps {
  commitments: EnvironmentalCommitmentData[]
}

const CommitmentsTowardsEnvironmentSection = ({ commitments }: CommitmentsTowardsEnvironmentSectionProps) => {
  const [expandedItem, setExpandedItem] = useState<string>('')

  // Si aucun engagement n'est disponible, afficher un message
  if (!commitments || commitments.length === 0) {
    return (
      <section className="py-16 bg-white mb-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-36">
            <div className="inline-flex items-center gap-2 py-2">
              <img src="/svg/awl-wave-vert.svg" alt="AWL Logo" className="w-10 h-10" />
              <span className="text-md font-light italic font-gantari">Livrer Vite, sans négliger demain</span>
            </div>
            <h2 className="font-gasoek text-4xl text-center mb-5">
              Notre engagement pour la planète
            </h2>
            <p className="font-gantari text-lg max-w-2xl mx-auto font-medium">
              Engagements en cours de configuration...
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Définir le premier engagement comme expanded par défaut
  const defaultExpanded = commitments.length > 0 ? commitments[0].id.toString() : ''
  const [expandedItemId, setExpandedItemId] = useState<string>(defaultExpanded)

  const handleItemClick = (id: string) => {
    setExpandedItemId(id)
  }

  return (
    <section className="py-16 bg-white mb-24">
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

        {/* Central Content Area */}
        <div className="relative mb-12">
          <div className="relative grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Side - Expandable Buttons */}
            <div className="space-y-4 p-25">
              {commitments.map((commitment) => (
                <div key={commitment.id} className="w-full">
                  <div className={`transition-all duration-500 ease-in-out ${expandedItemId === commitment.id.toString() ? 'transform scale-105' : ''
                    }`}>
                    {expandedItemId === commitment.id.toString() ? (
                      // Expanded state - Blue box with title and description
                      <div className="primary-blue-bg text-white p-8 rounded-3xl lg:mx-12 xl:mr-40 xl:m-0 transform transition-all duration-500 ease-in-out">
                        <div className="flex items-center">
                          <span className="font-gantari font-extrabold italic text-3xl pb-2">{commitment.title}</span>
                        </div>
                        <span className="font-gantari font-base text-base leading-none">
                          {commitment.description}
                        </span>
                      </div>
                    ) : (
                      // Collapsed state - Button
                      <button
                        onClick={() => handleItemClick(commitment.id.toString())}
                        className="w-full text-left p-4 rounded-xl bg-white text-[#989898] hover:text-black transition-all duration-300 hover:scale-105"
                      >
                        <div className="flex items-center">
                          <span className="font-gantari font-extrabold italic text-2xl">{commitment.title}</span>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side - Dynamic Image/Emoji */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  {expandedItemId && (() => {
                    const currentCommitment = commitments.find(c => c.id.toString() === expandedItemId)
                    if (!currentCommitment) return null
                    
                    return (
                      <>
                        {currentCommitment.image_url ? (
                          // Afficher l'image si disponible
                          <div className="mb-4">
                            <img 
                              src={currentCommitment.image_url} 
                              alt={currentCommitment.image_alt}
                              className="mx-auto max-w-48 max-h-48 object-cover rounded-lg shadow-lg"
                              onError={(e) => {
                                // Fallback vers l'emoji si l'image ne charge pas
                                const img = e.currentTarget as HTMLImageElement;
                                img.style.display = 'none';
                                const emojiDiv = img.parentElement?.querySelector('.emoji-fallback');
                                if (emojiDiv) {
                                  (emojiDiv as HTMLElement).style.display = 'block';
                                }
                              }}
                            />
                            <div className="hidden text-8xl mb-4 emoji-fallback">
                              {currentCommitment.emoji}
                            </div>
                          </div>
                        ) : (
                          // Afficher l'emoji si pas d'image
                          <div className="text-8xl mb-4">
                            {currentCommitment.emoji}
                          </div>
                        )}
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">
                          {currentCommitment.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {currentCommitment.image_alt || "Cliquez sur un engagement pour en savoir plus"}
                        </p>
                      </>
                    )
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Call to Action */}
        <div className="text-center md:m-40">
          <h3 className="font-gantari text-2xl font-bold text-black mb-4">
            Livrer proprement, c'est livrer durablement
          </h3>
          <p className=" text-center text-gray-700 mb-8 mx-auto font-gantari font-medium">
            Prêt à faire livrer vos marchandises avec efficacité et conscience?<br /> Obtenez un devis personnalisé en quelques clics.<br /> C'est rapide, gratuit, et pensé pour demain.
          </p>
          <button className="primary-blue-bg text-white px-8 py-4 rounded-full font-semibold hover:bg-[#0C7EC0] transition-colors flex items-center mx-auto -mt-3 shadow-lg">
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