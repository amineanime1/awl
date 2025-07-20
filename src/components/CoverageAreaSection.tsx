import Link from 'next/link'
import { FaMapMarkedAlt } from 'react-icons/fa'

export default function CoverageAreaSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-gasoek text-4xl font-bold mb-8">Zone d'Intervention</h2>
        <div className="flex items-center justify-center mb-8">
          <FaMapMarkedAlt className="text-5xl text-blue-600 mr-4" />
          <p className="font-gantari text-xl">
            Basés en Île-de-France, nous intervenons sur toute la France métropolitaine et l'Europe
          </p>
        </div>
        <Link
          href="/contact"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-gantari font-semibold hover:bg-blue-700 transition-colors inline-block"
        >
          Demander un devis
        </Link>
      </div>
    </section>
  )
} 