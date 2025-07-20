import Link from 'next/link'
import { FaWhatsapp, FaEnvelope, FaPhone, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Auto Wave Logistic</h3>
            <p className="text-gray-400 mb-4">
              Votre partenaire de confiance pour le transport de marchandises depuis plus de 15 ans.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nos Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#transport" className="text-gray-400 hover:text-white transition-colors">
                  Transport de Marchandises
                </Link>
              </li>
              <li>
                <Link href="/services#ikea" className="text-gray-400 hover:text-white transition-colors">
                  Livraison IKEA
                </Link>
              </li>
              <li>
                <Link href="/services#medical" className="text-gray-400 hover:text-white transition-colors">
                  Transport Médical
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FaPhone className="text-blue-500" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-500" />
                <span>contact@autowave.fr</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaWhatsapp className="text-green-500" />
                <span>WhatsApp: +33 1 23 45 67 89</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Auto Wave Logistic. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
} 