import { FaTruck, FaBox, FaBuilding, FaShieldAlt, FaMapMarkedAlt, FaClock } from 'react-icons/fa'

const services = [
  {
    icon: FaTruck,
    title: "Transport de Marchandises",
    description: "Transport professionnel de vos marchandises avec une flotte moderne et des chauffeurs expérimentés.",
    features: [
      "Flotte de véhicules modernes",
      "Chauffeurs professionnels",
      "Suivi en temps réel",
      "Assurance complète"
    ]
  },
  {
    icon: FaBox,
    title: "Livraison IKEA & Leroy Merlin",
    description: "Service spécialisé pour la livraison de meubles et matériaux de construction.",
    features: [
      "Livraison à domicile",
      "Montage de meubles",
      "Déballage et installation",
      "Élimination des emballages"
    ]
  },
  {
    icon: FaBuilding,
    title: "Transport Médical",
    description: "Transport sécurisé de médicaments et équipements médicaux avec respect des normes.",
    features: [
      "Contrôle de température",
      "Traçabilité complète",
      "Respect des normes",
      "Livraison urgente"
    ]
  }
]

const advantages = [
  {
    icon: FaShieldAlt,
    title: "Sécurité Garantie",
    description: "Vos marchandises sont assurées et suivies à chaque étape du transport."
  },
  {
    icon: FaMapMarkedAlt,
    title: "Couverture Nationale",
    description: "Nous desservons toute la France avec une logistique optimisée."
  },
  {
    icon: FaClock,
    title: "Ponctualité",
    description: "Respect des délais de livraison avec suivi en temps réel."
  }
]

export default function Services() {
  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre gamme complète de services de transport et logistique adaptés à vos besoins.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <service.icon className="text-4xl text-blue-600 mb-6" />
              <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <ul className="space-y-3">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <span className="text-blue-600">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Advantages Section */}
        <div className="bg-gray-50 py-16 rounded-2xl">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi Nous Choisir ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="text-center">
                <advantage.icon className="text-4xl text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{advantage.title}</h3>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold mb-6">Prêt à démarrer votre projet ?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Contactez-nous dès maintenant pour un devis personnalisé
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Demander un devis
          </a>
        </div>
      </div>
    </main>
  )
} 