# Configuration Cloudinary pour AWL

## 🚀 Configuration Cloudinary

### 1. Créer un compte Cloudinary

1. Allez sur [cloudinary.com](https://cloudinary.com)
2. Créez un compte gratuit
3. Notez vos informations de connexion

### 2. Récupérer vos clés API

Dans votre dashboard Cloudinary, vous trouverez :
- **Cloud Name** : Votre nom de cloud
- **API Key** : Votre clé API
- **API Secret** : Votre secret API

### 3. Configurer les variables d'environnement

Ajoutez ces variables à votre fichier `.env.local` :

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

### 4. Redémarrer le serveur

```bash
npm run dev
```

## 📁 Structure des dossiers Cloudinary

Les images seront organisées automatiquement dans Cloudinary :

- `awl-website/mission/` - Images de la section Mission
- `awl-website/fleet/` - Images des véhicules
- `awl-website/services/` - Images des services (si nécessaire)
- `awl-website/environment/` - Images des engagements environnementaux (si nécessaire)

## 🔧 Fonctionnalités incluses

### Upload automatique
- ✅ Validation des types de fichiers (JPG, PNG, WebP, GIF)
- ✅ Limite de taille (10MB max)
- ✅ Optimisation automatique des images
- ✅ Conversion automatique au format optimal

### Interface utilisateur
- ✅ Zone de glisser-déposer
- ✅ Aperçu en temps réel
- ✅ Indicateur de progression
- ✅ Gestion des erreurs
- ✅ Bouton de suppression

### Optimisations
- ✅ Compression automatique
- ✅ Redimensionnement intelligent
- ✅ Format WebP automatique
- ✅ CDN global pour des performances optimales

## 🎯 Utilisation dans l'admin panel

### Section Mission
- Upload de l'image principale de la mission
- Aperçu en temps réel
- Texte alternatif pour l'accessibilité

### Section Flotte
- Upload d'images pour chaque véhicule
- Gestion des images dans le formulaire d'édition
- Aperçu dans la liste des véhicules

## 🔒 Sécurité

- Validation côté serveur et client
- Limitation de la taille des fichiers
- Types de fichiers autorisés uniquement
- URLs sécurisées (HTTPS)

## 📈 Avantages

1. **Performance** : Images optimisées automatiquement
2. **Fiabilité** : CDN global de Cloudinary
3. **Simplicité** : Interface drag & drop intuitive
4. **Flexibilité** : Support de multiples formats
5. **SEO** : URLs optimisées et cache intelligent

## 🚨 Important

- Ne partagez jamais vos clés API publiquement
- Utilisez des variables d'environnement
- Surveillez votre utilisation (gratuit jusqu'à 25GB/mois)
- Sauvegardez régulièrement vos images importantes 