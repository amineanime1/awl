import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Conteneur principal - EXACTEMENT comme la photo */}
        <div className="relative bg-[#11103B] rounded-[24px] p-8 md:p-12 overflow-hidden">
          {/* Motif de fond avec logo AWL - très subtil */}
          <div className="absolute inset-0">
        <img src="/svg/logo-bg-cta.svg" alt="AWL Logo Group" className="w-full h-full object-cover" />
          </div>

          {/* Contenu principal */}
          <div className="relative z-10">
            {/* Badge "Service pro & rapide" - positionné en haut à gauche */}
            <div className="flex items-center justify-center gap-2 -mb-2">
              <img src="/svg/awl-wave-transparent.svg" alt="AWL Wave" className="w-10 h-10" />
              <span className="text-white text-xs font-gantari font-light italic">Service pro & rapide</span>
            </div>

            {/* Titre principal - centré */}
            <div className="text-center justify-center mb-6">
              <h2 className="text-4xl font-gasoek font-regular text-white leading-tight">
                Prêt à faire livrer,<br />simplement ?
              </h2>
            </div>

            {/* Sous-titre - aligné à gauche comme dans la photo */}
            <div className="text-center mb-8">
              <p className="text-[#cbd5e1] text-sm font-gantari max-w-2xl mx-auto">
                Dites-nous ce que vous avez à livrer, et on s'occupe du reste.<br />Réponse rapide, sans engagement, sur mesure.
              </p>
            </div>

            {/* Bouton call-to-action - centré */}
            <div className="text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-2.5 rounded-full font-semibold hover:bg-gray-50 transition-colors text-sm"
              >
                Obtenir mon devis
                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 17l9.2-9.2M17 17V7H7"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 