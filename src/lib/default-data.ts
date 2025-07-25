// Données par défaut pour éviter les erreurs d'hydratation
// Basées sur le schéma SQL database_schema.sql

export const defaultMissionData = {
  quote_text: '"Livrer vite, bien, et toujours à l\'heure — c\'est notre promesse."',
  image_url: '/images/awl-mission.png',
  image_alt: 'AWL Mission'
}

export const defaultServicesData = [
  {
    id: 1,
    title: 'Transport de colis et marchandises diverses',
    description: 'Pour vos meubles, cartons, palettes ou matériaux — on s\'adapte à tous les formats.',
    icon_name: 'FaTruck',
    color_class: 'text-blue-600',
    display_order: 1,
    is_active: true
  },
  {
    id: 2,
    title: 'Livraison urgente ou planifiée',
    description: 'Courses express ou livraisons programmées : vous choisissez le bon timing.',
    icon_name: 'MdSpeed',
    color_class: 'text-orange-500',
    display_order: 2,
    is_active: true
  },
  {
    id: 3,
    title: 'Tournées régulières',
    description: 'Idéal pour les pros : des livraisons récurrentes avec trajets optimisés.',
    icon_name: 'FaRoute',
    color_class: 'text-green-600',
    display_order: 3,
    is_active: true
  },
  {
    id: 4,
    title: 'Transport de véhicules',
    description: 'Livraison de voitures sur plateau homologué pour concessionnaires et particuliers.',
    icon_name: 'FaCar',
    color_class: 'text-purple-600',
    display_order: 4,
    is_active: true
  },
  {
    id: 5,
    title: 'Produits sensibles et médicaux',
    description: 'Transport sécurisé de médicaments et produits sensibles avec respect des normes.',
    icon_name: 'FaBox',
    color_class: 'text-red-600',
    display_order: 5,
    is_active: true
  }
]

export const defaultFleetData = [
  {
    id: 1,
    name: 'Kangoo',
    description: 'Compact, agile et économique, le Kangoo est parfait pour les livraisons rapides en zone urbaine. Il convient aux petits colis et aux trajets courts.',
    image_url: '/images/kangoo.jpg',
    image_alt: 'Kangoo',
    display_order: 1,
    is_active: true
  },
  {
    id: 2,
    name: 'Fourgon 12 m³',
    description: 'Idéal pour transporter du mobilier, des cartons ou des palettes. Le 12 m³ allie capacité et maniabilité pour les livraisons classiques.',
    image_url: '/images/fourgon12.jpg',
    image_alt: 'Fourgon 12 m³',
    display_order: 2,
    is_active: true
  },
  {
    id: 3,
    name: 'Fourgon 20 m³',
    description: 'Pensé pour les charges plus volumineuses, il est parfait pour les matériaux de construction ou les tournées professionnelles plus chargées.',
    image_url: '/images/fourgon20.jpg',
    image_alt: 'Fourgon 20 m³',
    display_order: 3,
    is_active: true
  }
]

export const defaultEnvironmentalData = [
  {
    id: 1,
    title: 'Optimisation des trajets',
    description: 'Moins de kilomètres = moins d\'émissions. Nos livraisons sont pensées pour éviter les détours inutiles et réduire la consommation.',
    details: 'Nos algorithmes de planification intelligente analysent en temps réel les conditions de trafic, la météo et les contraintes logistiques pour optimiser chaque trajet. Résultat : jusqu\'à 25% de réduction des émissions CO2 et une livraison plus rapide.',
    emoji: '🗺️',
    image_url: undefined, // Pas d'image par défaut, utilise l'emoji
    image_alt: 'Carte de route optimisée avec trajets intelligents',
    display_order: 1,
    is_active: true
  },
  {
    id: 2,
    title: 'Flotte responsable',
    description: 'Véhicules récents, entretenus, et < 3,5 T pour une empreinte plus légère. La puissance sans le poids carbone.',
    details: '100% de nos véhicules sont équipés de technologies de pointe : moteurs hybrides, systèmes de récupération d\'énergie, et monitoring en temps réel des performances. Nous renouvelons notre flotte tous les 3 ans pour garantir les meilleures normes écologiques.',
    emoji: '🚛',
    image_url: undefined, // Pas d'image par défaut, utilise l'emoji
    image_alt: 'Camion moderne avec technologies vertes',
    display_order: 2,
    is_active: true
  },
  {
    id: 3,
    title: 'Éco-conduite au quotidien',
    description: 'Nos chauffeurs sont formés à l\'éco-conduite : freinage doux, accélération maîtrisée et respect des vitesses. De petits gestes, un grand impact.',
    details: 'Formation continue de nos équipes aux techniques d\'éco-conduite : anticipation du trafic, gestion optimale des vitesses, et maintenance préventive. Chaque chauffeur suit un programme personnalisé avec suivi des performances et récompenses pour les meilleurs résultats.',
    emoji: '👨‍💼',
    image_url: undefined, // Pas d'image par défaut, utilise l'emoji
    image_alt: 'Chauffeur formé à l\'éco-conduite',
    display_order: 3,
    is_active: true
  },
  {
    id: 4,
    title: 'Zéro papier, 100% digital',
    description: 'Fiches de mission, suivi client et documents sont dématérialisés. Moins de papier, plus d\'efficacité — pour vous et pour l\'environnement.',
    details: 'Plateforme digitale complète : bons de livraison électroniques, facturation numérique, suivi en temps réel, et archivage cloud sécurisé. Économie de plus de 50 000 feuilles par an et processus 100% traçable et transparent.',
    emoji: '📱',
    image_url: undefined, // Pas d'image par défaut, utilise l'emoji
    image_alt: 'Interface digitale moderne pour la gestion logistique',
    display_order: 4,
    is_active: true
  }
]

export const defaultFaqData = [
  {
    id: 1,
    question: 'Quels types de marchandises transportez-vous ?',
    answer: 'Nous assurons le transport de colis, palettes, matériels professionnels, documents sensibles ou tout autre type de marchandise nécessitant un acheminement rapide, sécurisé et soigné.',
    display_order: 1,
    is_active: true
  },
  {
    id: 2,
    question: 'Proposez-vous des livraisons urgentes ?',
    answer: 'Oui, nous proposons un service de livraison express pour répondre aux besoins urgents de nos clients, avec une prise en charge rapide partout en France.',
    display_order: 2,
    is_active: true
  },
  {
    id: 3,
    question: 'Comment obtenir un devis ?',
    answer: 'Vous pouvez obtenir un devis personnalisé en quelques clics via notre formulaire en ligne. Une réponse rapide vous sera envoyée dans les plus brefs délais.',
    display_order: 3,
    is_active: true
  },
  {
    id: 4,
    question: 'Où intervenez-vous ?',
    answer: 'AWL intervient sur l\'ensemble du territoire français, y compris en zones urbaines, rurales et industrielles.',
    display_order: 4,
    is_active: true
  },
  {
    id: 5,
    question: 'Vos véhicules sont-ils adaptés aux livraisons sensibles ?',
    answer: 'Oui, notre flotte est composée de véhicules entretenus et adaptés aux livraisons sensibles : sécurisation, suivi et conditions de transport respectées.',
    display_order: 5,
    is_active: true
  }
]

export const defaultPageData = {
  missionData: defaultMissionData,
  servicesData: defaultServicesData,
  fleetData: defaultFleetData,
  environmentalData: defaultEnvironmentalData,
  faqData: defaultFaqData
} 