import { FaUsers, FaTruck, FaAward, FaHandshake } from 'react-icons/fa'

const stats = [
  {
    icon: FaTruck,
    value: "50+",
    label: "Véhicules",
    description: "Une flotte moderne et diversifiée"
  },
  {
    icon: FaUsers,
    value: "1000+",
    label: "Clients Satisfaits",
    description: "Des entreprises qui nous font confiance"
  },
  {
    icon: FaAward,
    value: "15+",
    label: "Années d'Expérience",
    description: "Expertise reconnue dans le transport"
  },
  {
    icon: FaHandshake,
    value: "100%",
    label: "Satisfaction",
    description: "Engagement qualité"
  }
]

const team = [
  {
    name: "Jean Dupont",
    role: "Directeur Général",
    description: "Plus de 20 ans d'expérience dans le transport et la logistique."
  },
  {
    name: "Marie Martin",
    role: "Responsable Logistique",
    description: "Expertise en optimisation des flux logistiques."
  },
  {
    name: "Pierre Durand",
    role: "Responsable Flotte",
    description: "Gestion et maintenance de notre parc de véhicules."
  }
]

export default function About() {
  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">À Propos de Nous</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Auto Wave Logistic, votre partenaire de confiance pour le transport de marchandises depuis plus de 15 ans.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="text-4xl text-blue-600 mx-auto mb-4" />
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg font-semibold mb-2">{stat.label}</div>
              <p className="text-gray-600">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-gray-50 rounded-2xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Notre Histoire</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-600">
            <p>
              Fondée en 2008, Auto Wave Logistic est née de la vision de créer une entreprise de transport
              qui combine efficacité, fiabilité et service client exceptionnel.
            </p>
            <p>
              Au fil des années, nous avons développé une expertise reconnue dans le transport de marchandises
              variées, en particulier dans les secteurs de la construction, du mobilier et du médical.
            </p>
            <p>
              Notre engagement envers la qualité et la satisfaction client nous a permis de devenir un acteur
              majeur du transport en France, avec une flotte moderne et une équipe de professionnels dévoués.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-2">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-4">{member.role}</div>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-blue-600 text-white rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Qualité</h3>
              <p>Nous nous engageons à fournir un service de la plus haute qualité.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Fiabilité</h3>
              <p>La confiance de nos clients est notre priorité absolue.</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p>Nous investissons constamment dans les dernières technologies.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 