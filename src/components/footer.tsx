import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="footer-blue text-white ">
     
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Pour positionner le logo juste au-dessus de la section container, on utilise un parent relatif */}
        <div className="relative">
          <div className="absolute -top-16 sm:-top-28 left-1/2 -translate-x-1/2 mb-6">
            <Image
              src="/images/logo-footer-awl.png"
              alt="Auto Wave Logistic"
              width={150}
              height={60}
              className="mx-auto w-32 sm:w-40 md:w-48"
            />
          </div>
        </div>
        {/* Logo et bouton en haut */}
        <div className="text-center mb-12 sm:mb-20">
          
          <button className="bg-white dark-blue px-6 sm:px-8 py-2 sm:py-3 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center mx-auto space-x-2 text-sm sm:text-base">
            <span>Obtenir mon devis</span>
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </button>
        </div>

        {/* Contenu principal en 4 colonnes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white/50">Contact</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
              <li>support@autowavelogistic.com</li>
              <li className='italic'>Basé en Île-de-France</li>
            </ul>
          </div>

          {/* Liens utiles */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white/50">Liens utiles</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Demande de devis
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Nos Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white/50">Réseaux sociaux</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Linkedin
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  TikTok
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Youtube
                </a>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-white/50">Légal</h3>
            <ul className="space-y-1 sm:space-y-2 text-gray-300 text-sm sm:text-base">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition-colors">
                  Cookies
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright en bas */}
        <div className="text-center text-gray-400 text-xs sm:text-sm">
          <p>
            &copy; 2025 <a href="https://mowment.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Mowment</a>.
          </p>
        </div>
      </div>
    </footer>
  )
} 