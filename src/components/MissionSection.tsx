'use client'

interface MissionSectionProps {
  quoteText: string
  imageUrl: string
  imageAlt: string
}

export default function MissionSection({ quoteText, imageUrl, imageAlt }: MissionSectionProps) {
  return (
    <section className="pt-16 pb-20 px-4 bg-white" data-section="mission">
      <div className="max-w-6xl mx-auto">
        {/* Badge et Titre */}
        <div className="text-center mb-12">
          {/* Badge bleu ondulé */}
          <div className="inline-flex items-center gap-2 py-2">
              <img src="/svg/awl-wave-blue.svg" alt="AWL Logo" className="w-10 h-10" />
              <span className="text-md font-light italic font-gantari">Livraison express partout en France</span>
            </div>
          
          {/* Titre principal */}
          <h2 className="text-4xl text-black font-gasoek">
            Notre Mission
          </h2>
        </div>

        {/* Contenu principal - Rectangle divisé en deux */}
        <div className="bg-blue-50 rounded-2xl overflow-hidden shadow-lg">
          <div className="grid md:grid-cols-3 gap-0">
            
            {/* Colonne gauche - Texte avec motifs de fond */}
            <div className="relative p-8 md:p-12 col-span-2">
              {/* Placeholder pour les motifs de fond */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Motifs circulaires stylisés (packages/boîtes) */}
                <img
                  src="/svg/awl-logo-group.svg"
                  alt="AWL Logo Group"
                  className="w-[140%] h-[140%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ pointerEvents: 'none' }}
                />
              </div>
              {/* Contenu texte */}
              <div className="relative z-10">
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Chez <span className="font-bold italic">Auto Wave Logistic</span>, nous livrons vos marchandises avec fiabilité, rapidité et soin, partout en <span className="font-bold">France</span>.
                </p>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Du colis au véhicule, nos solutions de transport léger s'adaptent à <span className="font-bold">vos</span> besoins.
                </p>
                
                <blockquote className="text-lg text-gray-800 mb-8 italic border-l-4 border-primary-blue pl-4">
                  {quoteText}
                </blockquote>
                
                {/* Signature/Logo */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <img src="/svg/awl-logo-icon-dark.svg" />
                  </div>
                  <div>
                    <p className="text-sm font-bold dark-blue italic">signé AWL</p>
                    <p className="text-sm font-bold dark-blue italic">«Auto Wave Logistic»</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Colonne droite - Image */}
            <div className="relative">
              {/* Image dynamique depuis la base de données */}
              <div className="w-full min-h-[300px] max-h-[300px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-r-2xl flex items-center justify-center overflow-hidden">
                <img 
                  src={imageUrl} 
                  alt={imageAlt} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback en cas d'erreur de chargement
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling!.style.display = 'flex'
                  }}
                />
                <div className="hidden text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-sm">Image du camion de livraison</p>
                  <p className="text-xs mt-1">(Placeholder)</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
} 