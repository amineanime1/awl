import { FaTruck, FaClock, FaShieldAlt } from 'react-icons/fa'

export default function CommitmentsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-gasoek text-4xl font-bold text-center mb-12">Nos Engagements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <FaTruck className="text-4xl text-blue-600 mb-4 mx-auto" />
            <h3 className="font-gantari text-xl font-semibold mb-4">Flotte Moderne</h3>
            <p className="font-gantari text-gray-600">
              Véhicules utilitaires &lt; 3,5T équipés et régulièrement contrôlés
            </p>
          </div>
          <div className="text-center p-6">
            <FaClock className="text-4xl text-blue-600 mb-4 mx-auto" />
            <h3 className="font-gantari text-xl font-semibold mb-4">Suivi en Temps Réel</h3>
            <p className="font-gantari text-gray-600">
              Traçabilité complète et suivi des livraisons en direct
            </p>
          </div>
          <div className="text-center p-6">
            <FaShieldAlt className="text-4xl text-blue-600 mb-4 mx-auto" />
            <h3 className="font-gantari text-xl font-semibold mb-4">Service Professionnel</h3>
            <p className="font-gantari text-gray-600">
              Chauffeurs expérimentés et assurance marchandise incluse
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 