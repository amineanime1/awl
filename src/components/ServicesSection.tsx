import { FaTruck, FaBox, FaCar } from 'react-icons/fa'

export default function ServicesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="font-gasoek text-4xl font-bold text-center mb-12">Nos Services de Livraison</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <FaTruck className="text-4xl text-blue-600 mb-4" />
            <h3 className="font-gantari text-xl font-semibold mb-4">Transport de Marchandises</h3>
            <p className="font-gantari text-gray-600">
              Transport professionnel de colis et marchandises diverses. Services adaptés pour livraisons urgentes ou planifiées.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <FaCar className="text-4xl text-blue-600 mb-4" />
            <h3 className="font-gantari text-xl font-semibold mb-4">Transport de Véhicules</h3>
            <p className="font-gantari text-gray-600">
              Livraison de voitures sur plateau homologué pour concessionnaires, garages et particuliers. Transport sécurisé et assuré.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <FaBox className="text-4xl text-blue-600 mb-4" />
            <h3 className="font-gantari text-xl font-semibold mb-4">Produits Sensibles</h3>
            <p className="font-gantari text-gray-600">
              Transport sécurisé de médicaments et produits sensibles. Respect des normes et de la confidentialité.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 