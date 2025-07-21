import Link from 'next/link'
import { FaWhatsapp } from 'react-icons/fa'

interface HeroSectionProps {
  onTransitionTrigger?: () => void
}

export default function HeroSection({ onTransitionTrigger }: HeroSectionProps) {
  return (
    <section className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src="/images/awl-hero.png"
          alt="Auto Wave Logistic background"
          className="object-cover w-full h-full"
          style={{ minHeight: '100vh', height: 'auto', maxHeight: 'none' }}
        />
      </div>
      
      {/* Overlay sombre */}
      
      {/* Contenu principal */}
      <div className="relative z-10 w-[90%] px-4">
        <div className="flex items-center h-screen">
          <div className="max-w-4xl">
            {/* Badge "Livraison express partout en France" */}
            <div className="inline-flex items-center gap-2 py-2">
              <img src="/svg/awl-wave-transparent.svg" alt="AWL Logo" className="w-10 h-10" />
              <span className="text-md font-light italic font-gantari">Livraison express partout en France</span>
            </div>
            
            {/* Titre principal avec la police Gasoek One */}
            <h1 className="font-gasoek text-6xl md:text-8xl mb-6 text-left leading-tight">
              Pro.<br />
              Rapide.<br />
              Partout.
            </h1>
            
            {/* Sous-titre */}
            <p className="font-gantari text-lg md:text-xl mb-8 text-left max-w-xl">
              Médicaments, matériaux, mobilier... On les transporte <strong className='italic'>vite</strong> et bien, où que vous soyez.
            </p>
            
            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="primary-blue-bg text-white px-8 py-3 rounded-full font-gantari font-semibold hover:bg-[#0C7EC0] transition-colors inline-flex items-center gap-4"
              >
                Demander un devis
                <img src="/svg/awl-arrow-tr.svg" alt="arrow" className="w-3 h-3" />
              </Link>
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-3 rounded-full font-gantari font-semibold hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
              >  
                Whatsapp
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12.001 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.95 9.95 0 0 1-5.03-1.355L2.005 22l1.352-4.968A9.95 9.95 0 0 1 2.001 12c0-5.523 4.477-10 10-10M8.593 7.3l-.2.008a1 1 0 0 0-.372.1a1.3 1.3 0 0 0-.294.228c-.12.113-.188.211-.261.306A2.73 2.73 0 0 0 6.9 9.62c.002.49.13.967.33 1.413c.409.902 1.082 1.857 1.97 2.742c.214.213.424.427.65.626a9.45 9.45 0 0 0 3.84 2.046l.568.087c.185.01.37-.004.556-.013a2 2 0 0 0 .833-.231a5 5 0 0 0 .383-.22q.001.002.125-.09c.135-.1.218-.171.33-.288q.126-.13.21-.302c.078-.163.156-.474.188-.733c.024-.198.017-.306.014-.373c-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.402-.621a.5.5 0 0 0-.176-.041a.48.48 0 0 0-.378.127c-.005-.002-.072.055-.795.931a.35.35 0 0 1-.368.13a1.4 1.4 0 0 1-.191-.066c-.124-.052-.167-.072-.252-.108a6 6 0 0 1-1.575-1.003c-.126-.11-.243-.23-.363-.346a6.3 6.3 0 0 1-1.02-1.268l-.059-.095a1 1 0 0 1-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41c.11-.14.203-.276.263-.373c.118-.19.155-.385.093-.536q-.42-1.026-.868-2.041c-.059-.134-.234-.23-.393-.249q-.081-.01-.162-.016a3 3 0 0 0-.403.004z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicateur de scroll en bas */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 text-center">
        <p className="font-gantari text-sm mb-2">Découvrez la suite en bas</p>
        <button 
          onClick={onTransitionTrigger}
          className="group flex flex-col items-center gap-2 hover:scale-110 transition-transform duration-300"
        >
          <svg className="w-6 h-6 mx-auto animate-bounce group-hover:animate-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          <span className="text-xs opacity-75">Cliquez pour découvrir</span>
        </button>
      </div>
    </section>
  )
} 