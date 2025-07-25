// components/Fleet.tsx
'use client'

import Image from 'next/image'
import clsx from 'clsx'
import type { FleetVehicleData } from '@/lib/supabase/server'

interface FleetSectionProps {
  vehicles: FleetVehicleData[]
}

export default function Fleet({ vehicles }: FleetSectionProps) {
  // Si aucun véhicule n'est disponible, afficher un message
  if (!vehicles || vehicles.length === 0) {
    return (
      <section className="bg-gradient-to-b from-[#C7E9FF] to-white py-32 px-4 text-center">
        <div className="text-center mb-36">
          <div className="inline-flex items-center gap-2 py-2">
            <img src="/svg/awl-wave-purple.svg" alt="AWL Logo" className="w-10 h-10" />
            <span className="text-md font-light italic font-gantari">Des véhicules adaptés à chaque mission</span>
          </div>
          <h2 className="font-gasoek text-4xl text-center mb-5">
            Notre Flotte
          </h2>
          <p className="font-gantari text-lg max-w-2xl mx-auto font-medium">
            Flotte en cours de configuration...
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-b from-[#C7E9FF] to-white py-32 px-4 text-center">
         <div className="text-center mb-36">
          <div className="inline-flex items-center gap-2 py-2">
            <img src="/svg/awl-wave-purple.svg" alt="AWL Logo" className="w-10 h-10" />
            <span className="text-md font-light italic font-gantari">Des véhicules adaptés à chaque mission</span>
          </div>
          <h2 className="font-gasoek text-4xl text-center mb-5">
          Notre Flotte
          </h2>
          <p className="font-gantari text-lg max-w-2xl mx-auto font-medium">
          Nous utilisons des véhicules utilitaires légers (-3,5 T) adaptés à tous les types de <br /> livraison, du petit colis au transport de véhicules.          </p>
        </div>

      {/* SVG LAYOUT WITH OVERLAY TEXT */}
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto relative mb-32">
        {vehicles.map((vehicle, index) => {
          // Définir les couleurs et positions selon l'index
          const colors = ['#0C91DF', '#11103B', 'black']
          const positions = ['start', 'end', 'start']
          const color = colors[index % colors.length]
          const position = positions[index % positions.length] as 'start' | 'end'
          
          return (
            <div key={vehicle.id} className="relative">
              <svg width="406" height="542" viewBox="0 0 406 542" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <defs>
                  <clipPath id={`vehicle-${vehicle.id}-clip`}>
                    <path d="M405 512C405 528.569 391.569 542 375 542H30C13.4315 542 0 528.569 0 512V362.149C0 349.224 8.27833 337.752 20.5447 333.678L365.545 219.103C384.965 212.654 405 227.111 405 247.574V512Z" />
                  </clipPath>
                </defs>
                
                {/* Background shape */}
                <path d="M0 30C0 13.4315 13.4315 0 30 0H375.439C392.008 0 405.439 13.4315 405.439 30V163.219C405.439 176.155 397.147 187.635 384.866 191.7L39.4265 306.033C20.0123 312.459 0 298.002 0 277.552V30Z" fill={color}/>
                
                {/* Dynamic image with clip-path */}
                <foreignObject x="-47" y="206" width="532" height="349" clipPath={`url(#vehicle-${vehicle.id}-clip)`}>
                  <img
                    src={vehicle.image_url}
                    alt={vehicle.image_alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      // Fallback en cas d'erreur de chargement
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling!.style.display = 'flex'
                    }}
                  />
                </foreignObject>
                
                {/* Fallback si l'image ne charge pas */}
                <foreignObject x="-47" y="206" width="532" height="349" clipPath={`url(#vehicle-${vehicle.id}-clip)`} style={{ display: 'none' }}>
                  <div style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6b7280'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🚛</div>
                      <div style={{ fontSize: '0.875rem' }}>{vehicle.name}</div>
                    </div>
                  </div>
                </foreignObject>
                
                {/* Decorative elements */}
                <path opacity="0.07" d="M131.005 165.969L117.954 226.793L133.313 227.208L125.096 265.505L49.6299 249.313L54.8689 213.912L72.7656 217.752L77.3305 196.476L67.5686 194.382L71.3408 161.546L94.9609 158.236L131.005 165.969Z" fill="white"/>
              </svg>
              
              <div className={`absolute inset-0 flex flex-col justify-${position} p-6 text-white`}>
                <div className=" rounded-lg py-2 px-2 text-left">
                  <p className="font-bold text-xl mb-2">
                    <span className="font-black italic">{index + 1}/ {vehicle.name.charAt(0)}</span>{vehicle.name.slice(1)}
                  </p>
                  <p className="text-sm leading-relaxed">
                    {vehicle.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer Text */}
      <div className="">
        <h3 className="text-2xl font-bold mb-4">Des véhicules contrôlés, des livraisons maîtrisées</h3>
        <p className="text-black/80 mb-8  mx-auto">
          Notre flotte est entretenue régulièrement et conduite par des professionnels formés <br /> pour garantir ponctualité et sécurité.
        </p>
      </div>
    </section>
  )
}
