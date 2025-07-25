'use client'

import { useEffect, useRef, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { FaTruck, FaBox, FaCar, FaClock, FaRoute, FaFlag } from 'react-icons/fa'
import { MdLocalShipping, MdSpeed } from 'react-icons/md'

interface ServiceCard {
  id: number
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const services: ServiceCard[] = [
  {
    id: 1,
    title: "Transport de colis et marchandises diverses",
    description: "Pour vos meubles, cartons, palettes ou matériaux — on s'adapte à tous les formats.",
    icon: FaTruck,
    color: "text-blue-600"
  },
  {
    id: 2,
    title: "Livraison urgente ou planifiée",
    description: "Courses express ou livraisons programmées : vous choisissez le bon timing.",
    icon: MdSpeed,
    color: "text-orange-500"
  },
  {
    id: 3,
    title: "Tournées régulières",
    description: "Idéal pour les pros : des livraisons récurrentes avec trajets optimisés.",
    icon: FaRoute,
    color: "text-green-600"
  },
  {
    id: 4,
    title: "Transport de véhicules",
    description: "Livraison de voitures sur plateau homologué pour concessionnaires et particuliers.",
    icon: FaCar,
    color: "text-purple-600"
  },
  {
    id: 5,
    title: "Produits sensibles et médicaux",
    description: "Transport sécurisé de médicaments et produits sensibles avec respect des normes.",
    icon: FaBox,
    color: "text-red-600"
  }
]

export default function ServicesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    mode: "free-snap",
    slides: {
      perView: () => {
        if (typeof window !== "undefined") {
          if (window.innerWidth < 640) return 1.5
          if (window.innerWidth < 1024) return 1.7
          if (window.innerWidth < 1280) return 2.4
        }
        return 3.4
      },
      spacing: typeof window !== "undefined"
        ? window.innerWidth < 640
          ? 16
          : window.innerWidth < 1024
            ? 24
            : window.innerWidth < 1280
              ? 32
              : 40
        : 40,
      origin: 'center',
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  useEffect(() => {
    if (isHovering) return // Pause au hover
    
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next()
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [instanceRef, isHovering])

  return (
    <section className="py-20 bg-gradient-to-b from-[#17A9FF] to-[#0C79DF] relative overflow-hidden rounded-t-3xl">
      {/* Fond avec effet de vague */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-blue-700/20 to-blue-800/20"></div>
      
      <div className="mx-auto px-4 relative z-10">
        {/* En-tête */}
        <div className="text-center mb-32">
          {/* Badge d'introduction */}
          {/* <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full mb-6">
            <FaFlag className="text-sm" />
            <span className="text-sm font-medium">Des solutions adaptées à chaque besoin</span>
          </div> */}
              <div className="inline-flex items-center gap-2 py-2">
              <img src="/svg/awl-wave-orange.svg" alt="AWL wave" className="w-10 h-10" />
              <span className="text-md font-light italic font-gantari text-white/80">Des solutions adaptées à chaque besoin</span>
            </div>
          {/* Titre principal */}
          <h2 className="font-gasoek text-4xl text-white mb-6">
            Nos Services
          </h2>
          
          {/* Sous-titre */}
          <p className="text-lg text-white/80 max-w-3xl mx-auto font-light">
            Que vous soyez particulier, professionnel ou acteur du secteur médical, nous assurons des livraisons rapides, fiables et sur mesure partout en France.
          </p>
        </div>

        {/* Carousel de services */}
        <div className="mb-16 -mx-20 overflow-hidden">
          <div 
            ref={sliderRef} 
            className="keen-slider"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {services.map((service, index) => {
              // Avec perView: 3, la carte active est celle du milieu (index 1)
              const isActive = index === currentSlide
              const IconComponent = service.icon
              
              return (
                <div key={service.id} className="keen-slider__slide">
                  <div className={`
                    relative py-8 px-10 transition-all duration-600 ease-out h-80 flex flex-col justify-between
                    ${isActive 
                      ? 'bg-white rounded-3xl' 
                      : 'bg-white/20 border border-white/60 backdrop-blur-sm scale-90 opacity-70 rounded-2xl hover:scale-100 hover:rounded-3xl'
                    }
                    hover:shadow-xl hover:border-blue-200
                  `}>
                    {/* Icône en haut à gauche */}
                    <div className={`
                      mb-4 transition-all duration-300
                      ${isActive ? service.color : 'text-white/70'}
                    `}>
                      <IconComponent className="text-3xl" />
                    </div>
                    
                    {/* Contenu qui s'étend vers le bas */}
                    <div className=" flex flex-col ">
                      <h3 className={`
                        font-gantari text-3xl font-black mb-3 transition-colors duration-300 text-left
                        ${isActive ? 'text-gray-900' : 'text-white'}
                      `}>
                        <span className="italic">{service.title.charAt(0)}</span>{service.title.slice(1)}
                      </h3>
                      
                      <p className={`
                        font-gantari text-lg leading-relaxed transition-colors duration-300 flex-1 text-left
                        ${isActive ? 'text-gray-600' : 'text-white/80'}
                      `}>
                        {service.description}
                      </p>
                      {isActive && (
                      <button className="inline-flex items-center gap-2 primary-blue font-medium transition-colors mt-4 self-start">
                        En savoir plus →
                      </button>
                    )}
                    </div>
                    
                    {/* Bouton "En savoir plus" - visible seulement pour la carte active */}
                  
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Indicateurs de navigation */}
        <div className="flex justify-center gap-2 mb-32">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (instanceRef.current) {
                  instanceRef.current.moveToIdx(index)
                }
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`Aller au service ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA final */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Prêt à passer à l'action ?
          </h3>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Obtenez un devis personnalisé en quelques clics. C'est rapide, gratuit, et sans engagement.
          </p>
          <button className="inline-flex items-center gap-2 bg-white primary-blue px-8 py-4 rounded-full font-semibold hover:bg-gray-50 transition-colors shadow-lg">
            Obtenez un devis personnalisé →
          </button>
        </div>
      </div>
    </section>
  )
} 