# Auto Wave Logistic - Site Web 

Site web moderne pour Auto Wave Logistic, une entreprise spécialisée dans le transport de marchandises.

## 🚀 Technologies Utilisées

- Next.js 14
- TypeScript
- Tailwind CSS
- React Icons
- Framer Motion

## 📋 Prérequis

- Node.js 18.17 ou supérieur
- npm ou yarn

## 🛠️ Installation

1. Clonez le dépôt :
```bash
git clone [URL_DU_REPO]
cd awl
```

2. Installez les dépendances :
```bash
npm install
```

3. Lancez le serveur de développement :
```bash
npm run dev
```

Le site sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## 📦 Structure du Projet

```
src/
├── app/                 # Pages et routes
├── components/          # Composants réutilisables
├── styles/             # Styles globaux
└── utils/              # Fonctions utilitaires
```

## 🎨 Personnalisation

- Les couleurs et le thème peuvent être modifiés dans `tailwind.config.js`
- Les textes et contenus sont modifiables dans les fichiers de composants
- Les images peuvent être remplacées dans le dossier `public/`

## 📱 Fonctionnalités

- Design responsive
- Intégration WhatsApp
- Formulaire de contact
- Animations fluides
- Mode sombre/clair
- SEO optimisé

## 🔧 Configuration

### Variables d'Environnement

Créez un fichier `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### WhatsApp

Pour configurer le bouton WhatsApp, modifiez le numéro dans :
- `src/components/whatsapp-button.tsx`
- `src/components/footer.tsx`

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📞 Support

Pour toute question ou assistance, contactez-nous à :
- Email : contact@autowave.fr
- WhatsApp : +33 1 23 45 67 89
