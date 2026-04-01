# Système de Vote Décentralisé (DApp)

## 📖 Description du Projet
Ce projet est une application décentralisée (DApp) de vote construite sur la blockchain Ethereum. Il permet à un organisateur de configurer des élections, d'enregistrer des candidats, et d'autoriser des électeurs spécifiques à voter de manière sécurisée, transparente et immuable. Le projet intègre le réseau IPFS pour le stockage décentralisé des ressources lourdes (images et métadonnées).

## 🛠️ Architecture technique

### Backend Blockchain (Dossier `/backend`)
- **Solidity (v0.8.x)** : Développement des Smart Contracts (`VotingContract.sol`).
- **Hardhat** : Environnement full-stack Ethereum (compilation, déploiement, et tests via Mocha/Chai).
- **OpenZeppelin** : Intégration de contrats standards sécurisés (utilisation de `Counters`).

### Frontend Web3 (Dossier `/frontend`)
- **Next.js & React** : Framework full-stack pour la logique et le rendu (Côté Client).
- **TypeScript** : Pour la sécurité et l'auto-complétion du code.
- **Ethers.js & Web3Modal** : Interaction avec la blockchain Ethereum et connexion de portefeuilles (MetaMask, etc.).
- **IPFS via Infura** : Upload décentralisé des images (via l'intégration du client `ipfs-http-client` et de `react-dropzone`).
- **Tailwind CSS & Shadcn UI** : Design réactif et UI moderne.

## 🚀 Fonctionnalités Principales
- **Authentification Web3** : Les utilisateurs peuvent lier leurs portefeuilles à l'application.
- **Gestion des droits (Access Control)** : Seul le créateur du contrat (l'organisateur) peut ajouter des candidats et octroyer le droit de vote aux électeurs.
- **Vote sécurisé** : L'état du réseau empêche le double vote (une fois qu'un électeur a voté, un boolean bloque de futures interactions).
- **Tableau de Bord** : Visualisation des candidats, vue globale des votants, et traçabilité en direct des résultats.

---

## 🧠 Compétences Acquises dans ce Projet

Au cours du développement de cette DApp, les compétences clés suivantes ont été acquises et mises en pratique :

### 1. Ingénierie Blockchain (Smart Contracts)
- Conception structurée des données en **Solidity** via l'utilisation de `structs` et de `mappings` pour lier les électeurs et les candidats à leurs adresses de portefeuille.
- Mise en place de règles de sécurité strictes avec les modificateurs de type `require` (contrôle des accès, validation de statut).
- Utilisation des `Events` Solidity pour créer un historique traçable des actions (création candidat, création électeur).

### 2. Intégration Web3 et Gestion d'État (Frontend)
- Utilisation du **Context API** natif à React (`votingContext`) pour instancier la connexion Ethers.js et partager globalement l'état du wallet, de l'organisateur et des candidats sans prop-drilling.
- Couplage de Web3Modal au composant pour écouter les instances de connexion `window.ethereum.request(...)` et récupérer les requêtes des comptes.
- Gestion des erreurs et du typage strict **TypeScript** au sein des structures de composants React JSX.

### 3. Stockage Décentralisé (IPFS)
- Implémentation du système InterPlanetary File System (IPFS). La blockchain stockant les données coûteusement, le front-end délègue le stockage des "fichiers lourds" (images des votants ou candidats) au réseau IPFS, pour injecter la simple URL du `hash` sur le contrat intelligent Ethereum.

### 4. Environnement de Développement & Débogage
- Configuration double module Frontend / Backend.
- Résolution complexe de bugs Typescript/React et interfaçage avec les spécificités des Providers React typés face aux données asynchrones de la Blockchain.
