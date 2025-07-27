# Guide de Déploiement Vercel

## Problème Résolu

L'erreur "supabaseUrl is required" qui empêchait le build sur Vercel a été corrigée. Le problème était que le client Supabase côté client tentait de se créer même quand les variables d'environnement n'étaient pas définies.

## Modifications Apportées

### 1. Client Supabase Modifié
- `src/lib/supabase/client.ts` : Ajout d'une vérification pour créer le client seulement si les variables d'environnement sont définies
- `src/contexts/AuthContext.tsx` : Ajout de vérifications pour gérer le cas où le client Supabase est null
- Toutes les pages admin : Ajout de vérifications similaires

### 2. Configuration Vercel
- `vercel.json` : Configuration des variables d'environnement

## Configuration des Variables d'Environnement sur Vercel

### 1. Via l'Interface Web Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Sélectionnez votre projet AWL
3. Allez dans **Settings** > **Environment Variables**
4. Ajoutez les variables suivantes :

```
NEXT_PUBLIC_SUPABASE_URL = votre_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY = votre_clé_anonyme_supabase
SUPABASE_SERVICE_ROLE_KEY = votre_clé_service_supabase
NEXT_PUBLIC_BASE_URL = https://votre-domaine.vercel.app
CLOUDINARY_CLOUD_NAME = votre_cloudinary_cloud_name
CLOUDINARY_API_KEY = votre_clé_api_cloudinary
CLOUDINARY_API_SECRET = votre_secret_api_cloudinary
```

### 2. Via la CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Ajouter les variables d'environnement
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add NEXT_PUBLIC_BASE_URL
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
```

## Variables d'Environnement Requises

### Supabase (Obligatoires)
- `NEXT_PUBLIC_SUPABASE_URL` : URL de votre projet Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` : Clé anonyme publique
- `SUPABASE_SERVICE_ROLE_KEY` : Clé de service (pour le SSR)

### Base URL (Obligatoire)
- `NEXT_PUBLIC_BASE_URL` : URL de votre site déployé (ex: https://awl.vercel.app)

### Cloudinary (Optionnelles)
- `CLOUDINARY_CLOUD_NAME` : Nom de votre cloud Cloudinary
- `CLOUDINARY_API_KEY` : Clé API Cloudinary
- `CLOUDINARY_API_SECRET` : Secret API Cloudinary

## Test du Déploiement

1. Après avoir configuré les variables d'environnement
2. Poussez vos modifications sur GitHub
3. Vercel redéploiera automatiquement
4. Vérifiez que le build réussit dans les logs Vercel

## Fonctionnalités

### Avec Variables d'Environnement Configurées
- ✅ Site web complet avec données dynamiques
- ✅ Panel d'administration fonctionnel
- ✅ Authentification Supabase
- ✅ Upload d'images Cloudinary
- ✅ SEO optimisé avec SSR

### Sans Variables d'Environnement
- ✅ Site web avec données par défaut
- ⚠️ Panel d'administration non fonctionnel
- ⚠️ Pas d'authentification
- ⚠️ Pas d'upload d'images
- ✅ Site web fonctionnel avec contenu statique

## Dépannage

### Erreur "supabaseUrl is required"
- Vérifiez que `NEXT_PUBLIC_SUPABASE_URL` est configurée
- Vérifiez que `NEXT_PUBLIC_SUPABASE_ANON_KEY` est configurée

### Erreur "Dynamic server usage"
- Ces erreurs sont des avertissements et n'empêchent pas le déploiement
- Elles indiquent que certaines pages utilisent des données dynamiques

### Site ne se charge pas
- Vérifiez que `NEXT_PUBLIC_BASE_URL` est configurée correctement
- Vérifiez que toutes les variables Supabase sont configurées

## Support

Pour toute question ou problème :
1. Vérifiez les logs de build dans Vercel
2. Vérifiez que toutes les variables d'environnement sont configurées
3. Testez localement avec `npm run build` avant de déployer 