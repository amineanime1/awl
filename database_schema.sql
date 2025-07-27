-- =====================================================
-- BASE DE DONNÉES AWL - PANEL D'ADMINISTRATION
-- =====================================================

-- Table pour la section Mission
CREATE TABLE mission_section (
    id SERIAL PRIMARY KEY,
    quote_text TEXT NOT NULL DEFAULT '"Livrer vite, bien, et toujours à l''heure — c''est notre promesse."',
    image_url TEXT NOT NULL DEFAULT '/images/awl-mission.png',
    image_alt TEXT NOT NULL DEFAULT 'AWL Mission',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les services (section Services)
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon_name VARCHAR(100) NOT NULL, -- Nom de l'icône (ex: "FaTruck", "MdSpeed")
    color_class VARCHAR(50) NOT NULL DEFAULT 'text-blue-600', -- Classe CSS pour la couleur
    display_order INTEGER NOT NULL DEFAULT 0, -- Ordre d'affichage
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les véhicules de la flotte
CREATE TABLE fleet_vehicles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- ex: "Kangoo", "Fourgon 12 m³"
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    image_alt TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0, -- Ordre d'affichage (1, 2, 3)
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les engagements environnementaux
CREATE TABLE environmental_commitments (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    details TEXT NOT NULL, -- Texte détaillé qui apparaît quand l'élément est développé
    emoji VARCHAR(10) NOT NULL, -- Emoji pour l'affichage (fallback)
    image_url TEXT, -- URL de l'image Cloudinary (optionnel)
    image_alt TEXT NOT NULL, -- Description de l'image pour l'accessibilité
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour la FAQ
CREATE TABLE faq_items (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- DONNÉES INITIALES
-- =====================================================

-- Insertion de la section Mission (une seule entrée)
INSERT INTO mission_section (quote_text, image_url, image_alt) VALUES (
    '"Livrer vite, bien, et toujours à l''heure — c''est notre promesse."',
    '/images/awl-mission.png',
    'AWL Mission'
);

-- Insertion des services initiaux
INSERT INTO services (title, description, icon_name, color_class, display_order) VALUES
    ('Transport de colis et marchandises diverses', 'Pour vos meubles, cartons, palettes ou matériaux — on s''adapte à tous les formats.', 'FaTruck', 'text-blue-600', 1),
    ('Livraison urgente ou planifiée', 'Courses express ou livraisons programmées : vous choisissez le bon timing.', 'MdSpeed', 'text-orange-500', 2),
    ('Tournées régulières', 'Idéal pour les pros : des livraisons récurrentes avec trajets optimisés.', 'FaRoute', 'text-green-600', 3),
    ('Transport de véhicules', 'Livraison de voitures sur plateau homologué pour concessionnaires et particuliers.', 'FaCar', 'text-purple-600', 4),
    ('Produits sensibles et médicaux', 'Transport sécurisé de médicaments et produits sensibles avec respect des normes.', 'FaBox', 'text-red-600', 5);

-- Insertion des véhicules de la flotte
INSERT INTO fleet_vehicles (name, description, image_url, image_alt, display_order) VALUES
    ('Kangoo', 'Compact, agile et économique, le Kangoo est parfait pour les livraisons rapides en zone urbaine. Il convient aux petits colis et aux trajets courts.', '/images/kangoo.jpg', 'Kangoo', 1),
    ('Fourgon 12 m³', 'Idéal pour transporter du mobilier, des cartons ou des palettes. Le 12 m³ allie capacité et maniabilité pour les livraisons classiques.', '/images/fourgon12.jpg', 'Fourgon 12 m³', 2),
    ('Fourgon 20 m³', 'Pensé pour les charges plus volumineuses, il est parfait pour les matériaux de construction ou les tournées professionnelles plus chargées.', '/images/fourgon20.jpg', 'Fourgon 20 m³', 3);

-- Insertion des engagements environnementaux
INSERT INTO environmental_commitments (title, description, details, emoji, image_alt, display_order) VALUES
    ('Optimisation des trajets', 'Moins de kilomètres = moins d''émissions. Nos livraisons sont pensées pour éviter les détours inutiles et réduire la consommation.', 'Nos algorithmes de planification intelligente analysent en temps réel les conditions de trafic, la météo et les contraintes logistiques pour optimiser chaque trajet. Résultat : jusqu''à 25% de réduction des émissions CO2 et une livraison plus rapide.', '��️', 'Carte de route optimisée avec trajets intelligents', 1),
    ('Flotte responsable', 'Véhicules récents, entretenus, et < 3,5 T pour une empreinte plus légère. La puissance sans le poids carbone.', '100% de nos véhicules sont équipés de technologies de pointe : moteurs hybrides, systèmes de récupération d''énergie, et monitoring en temps réel des performances. Nous renouvelons notre flotte tous les 3 ans pour garantir les meilleures normes écologiques.', '🚛', 'Camion moderne avec technologies vertes', 2),
    ('Éco-conduite au quotidien', 'Nos chauffeurs sont formés à l''éco-conduite : freinage doux, accélération maîtrisée et respect des vitesses. De petits gestes, un grand impact.', 'Formation continue de nos équipes aux techniques d''éco-conduite : anticipation du trafic, gestion optimale des vitesses, et maintenance préventive. Chaque chauffeur suit un programme personnalisé avec suivi des performances et récompenses pour les meilleurs résultats.', '��', 'Chauffeur formé à l''éco-conduite', 3),
    ('Zéro papier, 100% digital', 'Fiches de mission, suivi client et documents sont dématérialisés. Moins de papier, plus d''efficacité — pour vous et pour l''environnement.', 'Plateforme digitale complète : bons de livraison électroniques, facturation numérique, suivi en temps réel, et archivage cloud sécurisé. Économie de plus de 50 000 feuilles par an et processus 100% traçable et transparent.', '📱', 'Interface digitale moderne pour la gestion logistique', 4);

-- Insertion des questions FAQ
INSERT INTO faq_items (question, answer, display_order) VALUES
    ('Quels types de marchandises transportez-vous ?', 'Nous assurons le transport de colis, palettes, matériels professionnels, documents sensibles ou tout autre type de marchandise nécessitant un acheminement rapide, sécurisé et soigné.', 1),
    ('Proposez-vous des livraisons urgentes ?', 'Oui, nous proposons un service de livraison express pour répondre aux besoins urgents de nos clients, avec une prise en charge rapide partout en France.', 2),
    ('Comment obtenir un devis ?', 'Vous pouvez obtenir un devis personnalisé en quelques clics via notre formulaire en ligne. Une réponse rapide vous sera envoyée dans les plus brefs délais.', 3),
    ('Où intervenez-vous ?', 'AWL intervient sur l''ensemble du territoire français, y compris en zones urbaines, rurales et industrielles.', 4),
    ('Vos véhicules sont-ils adaptés aux livraisons sensibles ?', 'Oui, notre flotte est composée de véhicules entretenus et adaptés aux livraisons sensibles : sécurisation, suivi et conditions de transport respectées.', 5);

-- =====================================================
-- TRIGGERS POUR MISE À JOUR AUTOMATIQUE
-- =====================================================

-- Fonction pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers pour toutes les tables
CREATE TRIGGER update_mission_section_updated_at BEFORE UPDATE ON mission_section FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_fleet_vehicles_updated_at BEFORE UPDATE ON fleet_vehicles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_environmental_commitments_updated_at BEFORE UPDATE ON environmental_commitments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faq_items_updated_at BEFORE UPDATE ON faq_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- INDEX POUR OPTIMISATION
-- =====================================================

CREATE INDEX idx_services_display_order ON services(display_order);
CREATE INDEX idx_services_active ON services(is_active);
CREATE INDEX idx_fleet_vehicles_display_order ON fleet_vehicles(display_order);
CREATE INDEX idx_fleet_vehicles_active ON fleet_vehicles(is_active);
CREATE INDEX idx_environmental_commitments_display_order ON environmental_commitments(display_order);
CREATE INDEX idx_environmental_commitments_active ON environmental_commitments(is_active);
CREATE INDEX idx_faq_items_display_order ON faq_items(display_order);
CREATE INDEX idx_faq_items_active ON faq_items(is_active);

-- =====================================================
-- COMMENTAIRES POUR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE mission_section IS 'Configuration de la section Mission - une seule entrée autorisée';
COMMENT ON TABLE services IS 'Services proposés par AWL - ordonnés par display_order';
COMMENT ON TABLE fleet_vehicles IS 'Véhicules de la flotte AWL - ordonnés par display_order';
COMMENT ON TABLE environmental_commitments IS 'Engagements environnementaux d''AWL - ordonnés par display_order';
COMMENT ON TABLE faq_items IS 'Questions fréquemment posées - ordonnées par display_order';

COMMENT ON COLUMN services.icon_name IS 'Nom de l''icône React (ex: FaTruck, MdSpeed)';
COMMENT ON COLUMN services.color_class IS 'Classe CSS pour la couleur de l''icône';
COMMENT ON COLUMN environmental_commitments.emoji IS 'Emoji affiché pour représenter l''engagement';

-- Schéma de base de données pour les demandes de transport
-- Table pour stocker les demandes de transport

CREATE TABLE IF NOT EXISTS demandes_transport (
    id SERIAL PRIMARY KEY,
    type_marchandise VARCHAR(100) NOT NULL,
    quantite VARCHAR(255) NOT NULL,
    chargement_code_postal VARCHAR(10) NOT NULL,
    chargement_date DATE NOT NULL,
    livraison_code_postal VARCHAR(10) NOT NULL,
    livraison_date DATE NOT NULL,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    telephone VARCHAR(20) NOT NULL,
    transport_regulier BOOLEAN NOT NULL,
    informations_complementaires TEXT,
    statut VARCHAR(50) DEFAULT 'nouvelle',
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    date_modification TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_demandes_transport_email ON demandes_transport(email);
CREATE INDEX IF NOT EXISTS idx_demandes_transport_statut ON demandes_transport(statut);
CREATE INDEX IF NOT EXISTS idx_demandes_transport_date_creation ON demandes_transport(date_creation);

-- Table pour les types de marchandises (optionnel, pour normalisation)
CREATE TABLE IF NOT EXISTS types_marchandise (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    actif BOOLEAN DEFAULT true
);

-- Insertion des types de marchandises de base
INSERT INTO types_marchandise (nom, description) VALUES
    ('palettes', 'Palettes standard ou euro'),
    ('colis', 'Colis individuels'),
    ('machines', 'Machines et équipements'),
    ('materiaux', 'Matériaux de construction'),
    ('autres', 'Autres types de marchandises')
ON CONFLICT (nom) DO NOTHING;

-- Table pour les statuts de demande
CREATE TABLE IF NOT EXISTS statuts_demande (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    couleur VARCHAR(7) DEFAULT '#6B7280'
);

-- Insertion des statuts de base
INSERT INTO statuts_demande (nom, description, couleur) VALUES
    ('nouvelle', 'Demande nouvellement créée', '#3B82F6'),
    ('en_cours', 'Demande en cours de traitement', '#F59E0B'),
    ('devis_envoye', 'Devis envoyé au client', '#10B981'),
    ('acceptee', 'Demande acceptée par le client', '#059669'),
    ('refusee', 'Demande refusée par le client', '#EF4444'),
    ('terminee', 'Transport terminé', '#6B7280')
ON CONFLICT (nom) DO NOTHING;

-- Table pour les notifications (optionnel)
CREATE TABLE IF NOT EXISTS notifications (
    id SERIAL PRIMARY KEY,
    demande_id INTEGER REFERENCES demandes_transport(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    lu BOOLEAN DEFAULT false,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger pour mettre à jour la date de modification
CREATE OR REPLACE FUNCTION update_date_modification()
RETURNS TRIGGER AS $$
BEGIN
    NEW.date_modification = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_date_modification
    BEFORE UPDATE ON demandes_transport
    FOR EACH ROW
    EXECUTE FUNCTION update_date_modification();

-- Vue pour faciliter les requêtes
CREATE OR REPLACE VIEW v_demandes_transport_complete AS
SELECT 
    dt.*,
    tm.nom as type_marchandise_nom,
    s.nom as statut_nom,
    s.couleur as statut_couleur
FROM demandes_transport dt
LEFT JOIN types_marchandise tm ON dt.type_marchandise = tm.nom
LEFT JOIN statuts_demande s ON dt.statut = s.nom;

-- Fonction pour créer une nouvelle demande
CREATE OR REPLACE FUNCTION creer_demande_transport(
    p_type_marchandise VARCHAR(100),
    p_quantite VARCHAR(255),
    p_chargement_code_postal VARCHAR(10),
    p_chargement_date DATE,
    p_livraison_code_postal VARCHAR(10),
    p_livraison_date DATE,
    p_nom VARCHAR(255),
    p_email VARCHAR(255),
    p_telephone VARCHAR(20),
    p_transport_regulier BOOLEAN,
    p_informations_complementaires TEXT DEFAULT NULL
) RETURNS INTEGER AS $$
DECLARE
    nouvelle_demande_id INTEGER;
BEGIN
    INSERT INTO demandes_transport (
        type_marchandise,
        quantite,
        chargement_code_postal,
        chargement_date,
        livraison_code_postal,
        livraison_date,
        nom,
        email,
        telephone,
        transport_regulier,
        informations_complementaires
    ) VALUES (
        p_type_marchandise,
        p_quantite,
        p_chargement_code_postal,
        p_chargement_date,
        p_livraison_code_postal,
        p_livraison_date,
        p_nom,
        p_email,
        p_telephone,
        p_transport_regulier,
        p_informations_complementaires
    ) RETURNING id INTO nouvelle_demande_id;

    -- Créer une notification
    INSERT INTO notifications (demande_id, type, message)
    VALUES (nouvelle_demande_id, 'nouvelle_demande', 'Nouvelle demande de transport créée');

    RETURN nouvelle_demande_id;
END;
$$ LANGUAGE plpgsql;


-- Table pour les détails des services (page services)
CREATE TABLE service_details (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
    subtitle VARCHAR(255) NOT NULL,
    detailed_description TEXT NOT NULL,
    features JSONB NOT NULL, -- Stockage des fonctionnalités en JSON
    process_steps JSONB NOT NULL, -- Stockage des étapes du processus en JSON
    is_active BOOLEAN NOT NULL DEFAULT true,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimisation
CREATE INDEX idx_service_details_service_id ON service_details(service_id);
CREATE INDEX idx_service_details_active ON service_details(is_active);
CREATE INDEX idx_service_details_display_order ON service_details(display_order);

-- Trigger pour mise à jour automatique
CREATE TRIGGER update_service_details_updated_at 
    BEFORE UPDATE ON service_details 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insertion des données détaillées par défaut
INSERT INTO service_details (service_id, subtitle, detailed_description, features, process_steps, display_order) VALUES
    (1, 'Solutions logistiques complètes pour tous vos besoins de transport', 
     'Notre service de transport de marchandises couvre l''ensemble de vos besoins logistiques, du transport express au fret lourd. Nous garantissons la sécurité, la ponctualité et la traçabilité de vos envois.',
     '[
       {"icon": "FaTruck", "title": "Flotte Moderne", "description": "Véhicules utilitaires légers (-3,5T) équipés des dernières technologies"},
       {"icon": "FaShieldAlt", "title": "Sécurité Garantie", "description": "Assurance complète et suivi en temps réel de vos marchandises"},
       {"icon": "FaClock", "title": "Ponctualité", "description": "Respect des délais de livraison avec notifications en temps réel"},
       {"icon": "FaMapMarkedAlt", "title": "Couverture Nationale", "description": "Livraison partout en France avec une logistique optimisée"}
     ]',
     '[
       "Évaluation de vos besoins et planification",
       "Préparation et emballage sécurisé", 
       "Transport avec suivi en temps réel",
       "Livraison et signature électronique"
     ]',
     1),
    (2, 'Service spécialisé pour vos achats de meubles et matériaux',
     'Nous vous accompagnons dans vos projets d''aménagement avec un service de livraison spécialisé pour les meubles IKEA et les matériaux Leroy Merlin. Montage, installation et élimination des emballages inclus.',
     '[
       {"icon": "FaBox", "title": "Livraison à Domicile", "description": "Livraison directement chez vous, même en étage"},
       {"icon": "FaTools", "title": "Montage de Meubles", "description": "Assemblage professionnel de vos meubles IKEA"},
       {"icon": "FaUsers", "title": "Installation Complète", "description": "Déballage, installation et élimination des emballages"},
       {"icon": "MdSchedule", "title": "Créneaux Flexibles", "description": "Plage horaire de livraison adaptée à vos disponibilités"}
     ]',
     '[
       "Préparation de la commande en magasin",
       "Transport sécurisé vers votre domicile",
       "Montage et installation des meubles", 
       "Nettoyage et élimination des emballages"
     ]',
     2),
    (5, 'Transport sécurisé de médicaments et équipements médicaux',
     'Notre service de transport médical respecte les normes strictes du secteur de la santé. Nous assurons le transport de médicaments, équipements médicaux et échantillons avec contrôle de température et traçabilité complète.',
     '[
       {"icon": "FaThermometerHalf", "title": "Contrôle de Température", "description": "Maintenance de la chaîne du froid pour les produits sensibles"},
       {"icon": "FaClipboardCheck", "title": "Traçabilité Complète", "description": "Suivi détaillé de chaque étape du transport"},
       {"icon": "MdSecurity", "title": "Normes Médicales", "description": "Respect des normes ISO et bonnes pratiques pharmaceutiques"},
       {"icon": "FaClock", "title": "Livraison Urgente", "description": "Service d''urgence disponible 24h/24 pour les cas critiques"}
     ]',
     '[
       "Validation des documents et autorisations",
       "Préparation du conditionnement adapté",
       "Transport avec contrôle de température",
       "Livraison et signature électronique"
     ]',
     3);

-- Commentaire pour documentation
COMMENT ON TABLE service_details IS 'Détails des services pour la page services - contenu détaillé de chaque service';
COMMENT ON COLUMN service_details.features IS 'JSON array des fonctionnalités avec icon, title, description';
COMMENT ON COLUMN service_details.process_steps IS 'JSON array des étapes du processus';