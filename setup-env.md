# 🔧 Configuration des Variables d'Environnement

## Problème actuel
L'erreur `URL scheme "shttps" is not supported` indique que les variables d'environnement Supabase ne sont pas correctement configurées.

## Solution

### 1. Créer le fichier .env.local
Créez un fichier `.env.local` à la racine de votre projet avec le contenu suivant :

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://inrnnczugkgkeydyszwe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_clé_anonyme_ici
SUPABASE_SERVICE_ROLE_KEY=votre_clé_service_ici
```

### 2. Obtenir vos clés Supabase
1. **Connectez-vous à votre dashboard Supabase**
   - Allez sur https://supabase.com
   - Connectez-vous à votre compte
2. **Sélectionnez votre projet**
   - Cliquez sur votre projet AWL
3. **Récupérez vos clés**
   - Allez dans **Settings** > **API**
   - Copiez l'**URL** (Project URL)
   - Copiez la **Clé anonyme** (anon public)
   - Copiez la **Clé de service** (service_role) - **IMPORTANT pour le SSR**
4. **Remplacez dans .env.local**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://inrnnczugkgkeydyszwe.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### 3. Redémarrer le serveur
```bash
npm run dev
```

### 4. Vérifier la configuration
- Ouvrez votre navigateur
- Allez sur http://localhost:3000
- Vérifiez que le site se charge correctement
- Testez l'admin panel sur http://localhost:3000/admin

## ⚠️ Important : Clé de Service

La **SUPABASE_SERVICE_ROLE_KEY** est nécessaire pour :
- Le rendu côté serveur (SSR/SSG)
- L'optimisation SEO
- La récupération des données avant l'envoi au navigateur

**Sans cette clé, le site fonctionnera mais sans optimisation SEO !**

## 🔍 Vérification

### Test de la page d'accueil
1. Ouvrez http://localhost:3000
2. Faites clic droit > "Afficher le code source"
3. Recherchez le contenu de vos sections
4. Si le contenu est visible dans le code source → ✅ SEO optimisé
5. Si le contenu n'est pas visible → ❌ Problème de configuration

### Test de l'admin panel
1. Allez sur http://localhost:3000/admin
2. Connectez-vous avec vos identifiants
3. Testez la modification d'une section
4. Rafraîchissez la page d'accueil
5. Vérifiez que les changements apparaissent

## 🚨 Dépannage

### Erreur "Variables d'environnement manquantes"
- Vérifiez que `.env.local` existe à la racine du projet
- Vérifiez que les clés sont correctement copiées
- Redémarrez le serveur de développement

### Erreur "Service role key not found"
- Assurez-vous d'avoir copié la **service_role key** (pas l'anonyme)
- Cette clé se trouve dans Settings > API > service_role

### Le contenu ne se met pas à jour
- Vérifiez que les données sont bien insérées dans Supabase
- Vérifiez que `is_active = true` pour les éléments
- Attendez la revalidation (5 minutes par défaut)

## 📝 Notes importantes

- **NEXT_PUBLIC_** : Variables accessibles côté client
- **SUPABASE_SERVICE_ROLE_KEY** : Variable côté serveur uniquement
- Le site utilise **ISR (Incremental Static Regeneration)** avec revalidation toutes les 5 minutes
- Les modifications dans l'admin panel seront visibles après la prochaine revalidation 