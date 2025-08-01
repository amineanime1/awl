# Configuration Resend pour l'envoi d'emails automatiques

## Qu'est-ce que Resend ?

Resend est un service d'envoi d'emails moderne et fiable, spécialement conçu pour les développeurs. Il offre une API simple et des templates d'emails professionnels.

## Configuration

### 1. Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit
3. Vérifiez votre domaine d'email (autowave.fr)

### 2. Obtenir votre clé API

1. Dans votre dashboard Resend
2. Allez dans "API Keys"
3. Créez une nouvelle clé API
4. Copiez la clé générée

### 3. Configurer les variables d'environnement

Ajoutez votre clé API dans votre fichier `.env.local` :

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Vérifier votre domaine

Pour envoyer des emails depuis votre domaine (autowave.fr), vous devez :

1. Ajouter votre domaine dans Resend
2. Configurer les enregistrements DNS requis
3. Vérifier la configuration

## Fonctionnalités implémentées

### Email de confirmation client

Quand un client remplit le formulaire de contact, il reçoit automatiquement :

- ✅ Confirmation de réception de sa demande
- ✅ Numéro de demande unique
- ✅ Récapitulatif de tous les détails
- ✅ Coordonnées de contact
- ✅ Design professionnel avec le branding AutoWave

### Email de notification équipe

L'équipe commerciale reçoit automatiquement :

- ✅ Notification de nouvelle demande
- ✅ Toutes les informations client
- ✅ Détails du transport
- ✅ Actions à effectuer
- ✅ Numéro de demande pour suivi

## Personnalisation

### Modifier les templates d'emails

Les templates sont dans `src/lib/email.ts`. Vous pouvez :

- Modifier le design HTML/CSS
- Changer les couleurs et le branding
- Ajouter des informations supplémentaires
- Modifier les adresses d'expédition

### Changer les adresses email

Dans `src/lib/email.ts`, modifiez :

```typescript
// Email de confirmation
from: 'AutoWave <contact@autowave.fr>'

// Email de notification
to: ['commercial@autowave.fr']
```

## Test

Pour tester l'envoi d'emails :

1. Configurez votre clé API Resend
2. Remplissez le formulaire de contact
3. Vérifiez la réception des emails

## Limites du plan gratuit

- 100 emails par jour
- Domaine vérifié requis
- Support communautaire

## Support

- Documentation Resend : [docs.resend.com](https://docs.resend.com)
- Support : support@resend.com 