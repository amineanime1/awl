import { FaTruck, FaBox, FaCar, FaClock, FaRoute, FaFlag, FaShieldAlt, FaMapMarkedAlt, FaUsers, FaTools, FaThermometerHalf, FaClipboardCheck } from 'react-icons/fa'
import { MdLocalShipping, MdSpeed, MdSecurity, MdLocationOn, MdSchedule, MdPayment } from 'react-icons/md'
import ServicesSection from '@/components/ServicesSection'
import { ClientWrapper } from '@/components/ClientWrapper'
import { defaultPageData } from '@/lib/default-data'
import CTASection from '@/components/CTASection'

// Types pour les données
interface ServiceData {
  id: number
  title: string
  description: string
  icon_name: string
  color_class: string
  display_order: number
  is_active: boolean
}

// Types pour les données détaillées des services
interface ServiceDetailsData {
  id: number
  service_id: number
  subtitle: string
  detailed_description: string
  features: any
  process_steps: any
  is_active: boolean
  display_order: number
}

// Props pour la page
interface ServicesPageProps {
  servicesData: ServiceData[]
  serviceDetailsData: ServiceDetailsData[]
}

// Revalidation ISR toutes les 5 minutes (300 secondes)
export const revalidate = 300

// Server Component async pour récupérer les données
async function getPageData(): Promise<{ servicesData: ServiceData[], serviceDetailsData: ServiceDetailsData[] }> {
  try {
    // Utiliser l'API route côté serveur
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/page-data`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      throw new Error('Erreur API')
    }
    
    const data = await response.json()
    return {
      servicesData: data.servicesData || defaultPageData.servicesData,
      serviceDetailsData: data.serviceDetailsData || []
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error)
    
    // Retourner les données par défaut en cas d'erreur
    return {
      servicesData: defaultPageData.servicesData,
      serviceDetailsData: []
    }
  }
}

// Mapping des icônes par nom
const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  FaTruck,
  FaBox,
  FaCar,
  FaClock,
  FaRoute,
  FaFlag,
  FaShieldAlt,
  FaMapMarkedAlt,
  FaUsers,
  FaTools,
  FaThermometerHalf,
  FaClipboardCheck,
  MdLocalShipping,
  MdSpeed,
  MdSecurity,
  MdLocationOn,
  MdSchedule,
  MdPayment
}

// Données détaillées par défaut (fallback si pas de données en base)
const defaultServiceDetails = {
  transport: {
    title: "Transport de Marchandises",
    subtitle: "Solutions logistiques complètes pour tous vos besoins de transport",
    description: "Notre service de transport de marchandises couvre l'ensemble de vos besoins logistiques, du transport express au fret lourd. Nous garantissons la sécurité, la ponctualité et la traçabilité de vos envois.",
    features: [
      {
        icon: FaTruck,
        title: "Flotte Moderne",
        description: "Véhicules utilitaires légers (-3,5T) équipés des dernières technologies"
      },
      {
        icon: FaShieldAlt,
        title: "Sécurité Garantie",
        description: "Assurance complète et suivi en temps réel de vos marchandises"
      },
      {
        icon: FaClock,
        title: "Ponctualité",
        description: "Respect des délais de livraison avec notifications en temps réel"
      },
      {
        icon: FaMapMarkedAlt,
        title: "Couverture Nationale",
        description: "Livraison partout en France avec une logistique optimisée"
      }
    ],
    process: [
      "Évaluation de vos besoins et planification",
      "Préparation et emballage sécurisé",
      "Transport avec suivi en temps réel",
      "Livraison et signature électronique"
    ]
  },
  livraison: {
    title: "Livraison IKEA & Leroy Merlin",
    subtitle: "Service spécialisé pour vos achats de meubles et matériaux",
    description: "Nous vous accompagnons dans vos projets d'aménagement avec un service de livraison spécialisé pour les meubles IKEA et les matériaux Leroy Merlin. Montage, installation et élimination des emballages inclus.",
    features: [
      {
        icon: FaBox,
        title: "Livraison à Domicile",
        description: "Livraison directement chez vous, même en étage"
      },
      {
        icon: FaTools,
        title: "Montage de Meubles",
        description: "Assemblage professionnel de vos meubles IKEA"
      },
      {
        icon: FaUsers,
        title: "Installation Complète",
        description: "Déballage, installation et élimination des emballages"
      },
      {
        icon: MdSchedule,
        title: "Créneaux Flexibles",
        description: "Plage horaire de livraison adaptée à vos disponibilités"
      }
    ],
    process: [
      "Préparation de la commande en magasin",
      "Transport sécurisé vers votre domicile",
      "Montage et installation des meubles",
      "Nettoyage et élimination des emballages"
    ]
  },
  medical: {
    title: "Transport Médical",
    subtitle: "Transport sécurisé de médicaments et équipements médicaux",
    description: "Notre service de transport médical respecte les normes strictes du secteur de la santé. Nous assurons le transport de médicaments, équipements médicaux et échantillons avec contrôle de température et traçabilité complète.",
    features: [
      {
        icon: FaThermometerHalf,
        title: "Contrôle de Température",
        description: "Maintenance de la chaîne du froid pour les produits sensibles"
      },
      {
        icon: FaClipboardCheck,
        title: "Traçabilité Complète",
        description: "Suivi détaillé de chaque étape du transport"
      },
      {
        icon: MdSecurity,
        title: "Normes Médicales",
        description: "Respect des normes ISO et bonnes pratiques pharmaceutiques"
      },
      {
        icon: FaClock,
        title: "Livraison Urgente",
        description: "Service d'urgence disponible 24h/24 pour les cas critiques"
      }
    ],
    process: [
      "Validation des documents et autorisations",
      "Préparation du conditionnement adapté",
      "Transport avec contrôle de température",
      "Livraison et signature électronique"
    ]
  }
}

export default async function Services() {
  // Récupération des données côté serveur
  const { servicesData, serviceDetailsData } = await getPageData()
  
  // Fonction pour obtenir les détails d'un service par son ID
  const getServiceDetails = (serviceId: number) => {
    return serviceDetailsData.find(detail => detail.service_id === serviceId && detail.is_active)
  }

  // Fonction pour rendre les fonctionnalités depuis les données JSON
  const renderFeatures = (features: any[]) => {
    if (!features || !Array.isArray(features)) return []
    return features.map((feature, index) => {
      const IconComponent = iconMap[feature?.icon] || FaTruck
      return {
        icon: IconComponent,
        title: feature?.title || '',
        description: feature?.description || ''
      }
    })
  }

  // Fonction pour afficher une section de service
  const renderServiceSection = (serviceId: number, defaultData: any, waveColor: string, bgColor: string, textColor: string) => {
    const serviceDetails = getServiceDetails(serviceId)
    const service = servicesData.find(s => s.id === serviceId)
    
    if (!service && !serviceDetails) return null

    return (
      <section className="mb-32">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 py-2">
            <img src={`/svg/awl-wave-${waveColor}.svg`} alt="AWL wave" className="w-10 h-10" />
            <span className="text-md font-light italic font-gantari">{defaultData.category}</span>
          </div>
          <h2 className="font-gasoek text-4xl mb-6">{service?.title || defaultData.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {serviceDetails?.subtitle || defaultData.subtitle}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h3 className="text-2xl font-semibold mb-6">{defaultData.approachTitle}</h3>
            <p className="text-gray-600 leading-relaxed mb-8">
              {serviceDetails?.detailed_description || defaultData.description}
            </p>
            
            <h4 className="text-xl font-semibold mb-4">Notre Processus</h4>
            <ol className="space-y-3">
              {(serviceDetails?.process_steps || defaultData.process).map((step: string, index: number) => (
                <li key={index} className="flex items-start space-x-3">
                  <span className={`flex-shrink-0 w-6 h-6 ${bgColor} text-white rounded-full flex items-center justify-center text-sm font-semibold`}>
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{step || ''}</span>
                </li>
              ))}
            </ol>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {(serviceDetails?.features ? renderFeatures(serviceDetails.features) : defaultData.features).map((feature, index) => (
              <div key={index} className={`text-center p-6 ${bgColor.replace('bg-', 'bg-').replace('-600', '-50')} rounded-lg`}>
                <feature.icon className={`text-3xl ${textColor} mx-auto mb-4`} />
                <h4 className="font-semibold mb-2">{feature?.title || ''}</h4>
                <p className="text-sm text-gray-600">{feature?.description || ''}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Fonction pour obtenir les couleurs basées sur l'ID du service
  const getServiceColors = (serviceId: number) => {
    const colorMap: { [key: number]: { wave: string, bg: string, text: string } } = {
      1: { wave: 'blue', bg: 'bg-blue-600', text: 'text-blue-600' },
      2: { wave: 'orange', bg: 'bg-orange-600', text: 'text-orange-600' },
      3: { wave: 'green', bg: 'bg-green-600', text: 'text-green-600' },
      4: { wave: 'purple', bg: 'bg-purple-600', text: 'text-purple-600' },
      5: { wave: 'purple', bg: 'bg-purple-600', text: 'text-purple-600' }
    }
    
    return colorMap[serviceId] || { wave: 'blue', bg: 'bg-blue-600', text: 'text-blue-600' }
  }

  // Fonction pour obtenir les données par défaut basées sur l'ID du service
  const getDefaultData = (serviceId: number) => {
    const defaultMap: { [key: number]: any } = {
      1: {
        title: "Transport de Marchandises",
        subtitle: "Solutions logistiques complètes pour tous vos besoins de transport",
        description: "Notre service de transport de marchandises couvre l'ensemble de vos besoins logistiques, du transport express au fret lourd. Nous garantissons la sécurité, la ponctualité et la traçabilité de vos envois.",
        category: "Transport professionnel",
        approachTitle: "Notre Approche",
        features: defaultServiceDetails.transport.features,
        process: defaultServiceDetails.transport.process
      },
      2: {
        title: "Livraison IKEA & Leroy Merlin",
        subtitle: "Service spécialisé pour vos achats de meubles et matériaux",
        description: "Nous vous accompagnons dans vos projets d'aménagement avec un service de livraison spécialisé pour les meubles IKEA et les matériaux Leroy Merlin. Montage, installation et élimination des emballages inclus.",
        category: "Service spécialisé",
        approachTitle: "Service Complet",
        features: defaultServiceDetails.livraison.features,
        process: defaultServiceDetails.livraison.process
      },
      3: {
        title: "Tournées régulières",
        subtitle: "Livraisons récurrentes avec trajets optimisés",
        description: "Idéal pour les professionnels, nos tournées régulières offrent des livraisons récurrentes avec des trajets optimisés pour maximiser l'efficacité et réduire les coûts.",
        category: "Service récurrent",
        approachTitle: "Optimisation continue",
        features: defaultServiceDetails.transport.features,
        process: defaultServiceDetails.transport.process
      },
      4: {
        title: "Transport de véhicules",
        subtitle: "Livraison de voitures sur plateau homologué",
        description: "Transport spécialisé de véhicules sur plateau homologué pour concessionnaires et particuliers. Service sécurisé et professionnel.",
        category: "Transport spécialisé",
        approachTitle: "Transport sécurisé",
        features: defaultServiceDetails.transport.features,
        process: defaultServiceDetails.transport.process
      },
      5: {
        title: "Transport Médical",
        subtitle: "Transport sécurisé de médicaments et équipements médicaux",
        description: "Notre service de transport médical respecte les normes strictes du secteur de la santé. Nous assurons le transport de médicaments, équipements médicaux et échantillons avec contrôle de température et traçabilité complète.",
        category: "Transport sécurisé",
        approachTitle: "Excellence Médicale",
        features: defaultServiceDetails.medical.features,
        process: defaultServiceDetails.medical.process
      }
    }
    
    return defaultMap[serviceId] || {
      title: "Service",
      subtitle: "Description du service",
      description: "Description détaillée du service.",
      category: "Service",
      approachTitle: "Notre Approche",
      features: defaultServiceDetails.transport.features,
      process: defaultServiceDetails.transport.process
    }
  }

  // Obtenir tous les services qui ont des détails
  const servicesWithDetails = serviceDetailsData
    .filter(detail => detail.is_active)
    .map(detail => detail.service_id)
    .filter((serviceId, index, array) => array.indexOf(serviceId) === index) // Supprimer les doublons

  return (
    <main className="flex min-h-screen flex-col">
      {/* Section Services (même que landing page) */}

        <header className="text-center mt-52 mb-32">
          <div className="inline-flex items-center gap-2 py-2">
            <img src="/svg/awl-wave-bleu-foncée.svg" alt="AWL wave" className="w-10 h-10" />
            <span className="text-md font-light italic font-gantari text-black/80">Découvrez notre expertise logistique</span>
          </div>
          <h1 className="font-gasoek text-5xl text-black mb-6">
            Services de Livraison & Transport sur Mesure
          </h1>
          <p className="text-lg text-black/80 max-w-3xl mx-auto font-light">
            AWL propose des solutions de transport adaptées à tous vos besoins : particuliers, professionnels ou secteur médical. Profitez d’un service fiable, rapide et personnalisé partout en France.
          </p>
        </header>

      <ClientWrapper>
        <ServicesSection services={servicesData} />
      </ClientWrapper>
      
      {/* Sections détaillées pour chaque service */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {/* Afficher tous les services qui ont des détails */}
          {servicesWithDetails.map((serviceId) => {
            const colors = getServiceColors(serviceId)
            const defaultData = getDefaultData(serviceId)
            
            return renderServiceSection(
              serviceId, 
              defaultData, 
              colors.wave, 
              colors.bg, 
              colors.text
            )
          })}

          {/* CTA Section */}
          <div className="mb-12">
            <CTASection />
          </div>
        </div>
      </div>
    </main>
  )
}   