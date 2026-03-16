# Sally Games — La Suite Ultime de Jeux Mobiles
### React Native + Expo SDK 54 · Architecture Propre · Évolutif & Monétisable

Sally Games est une collection premium de plus de 50 applications mobiles conçues pour un engagement massif. Construit avec la performance et l'évolutivité à l'esprit, ce projet sert de template robuste pour le déploiement rapide de jeux utilisant les dernières technologies Expo.

---

## 📑 Table des Matières
1. [Présentation du Projet](#-présentation-du-projet)
2. [Catalogue & Catégories](#-catalogue--catégories)
3. [Architecture Technique](#-architecture-technique)
4. [Guide de Déploiement](#-guide-de-déploiement)
5. [Stratégie de Monétisation](#-stratégie-de-monétisation)
6. [Planning de Déploiement](#-planning-de-déploiement)
7. [Stratégie Business (B2B/B2B2C)](#-stratégie-business)

---

## 🚀 Présentation du Projet
Chaque jeu de la suite Sally est construit sur une architecture unifiée qui sépare la **Logique de Jeu**, le **Thème**, et les **Fonctionnalités Natives** (Publicités, Sons, Stockage).
- **Technologie de Base** : React Native + Expo SDK 54.
- **Plateforme Cible** : Android (optimisé pour la fluidité et la publication facile).
- **Fonctionnalité Spéciale** : Support natif du RTL (arabe), permettant l'accès au marché de plus de 400M de personnes en zone MENA.

---

## 🎮 Catalogue & Catégories
Le projet contient plus de 50 applications, classées en 4 piliers principaux :

### 🧩 Logique & Puzzles
- **Sudoku Sally** : Puzzle logique classique aux couleurs de Sally.
- **Lingo / Lingo Duel** : Jeux de devinettes de mots.
- **Hex Conquer** : Puzzle de stratégie et de territoire.
- **Maze Architect** : Construction et navigation dans des labyrinthes.
- **Color Flood** : Stratégie de remplissage de couleurs.

### 🕹️ Arcade & Adresse
- **Fractal Tower / Topple Tower** : Construction basée sur la physique.
- **Neon Slice** : Jeu de réflexes et de précision.
- **Micro Golf** : Arcade de physique minimaliste.
- **Quake Run** : Survie à rythme effréné.

### ⚔️ Duels & Multijoueur
- **Pixel Duel** : Combat rétro 1v1.
- **Tempo Duel** : Compétition basée sur le rythme.
- **Duel Pong** : Combat de raquettes classique.

### 🎓 Éducatif & Culturel
- **Darija Quiz** : Spécialement conçu pour le marché marocain.
- **Braille Touch** : Expérience éducative accessible.
- **Morse Runner** : Apprentissage du code Morse par le jeu.

---

## 🛠️ Architecture Technique
Nous utilisons une structure de dossiers modulaire pour garantir que l'ajout d'un nouveau jeu prend moins de 15 minutes :
- `src/config/` : IDs centralisés pour AdMob et règles du jeu.
- `src/theme/` : Système de design unifié "Sally" (Couleurs, Fonts, Ombres).
- `src/hooks/` : Logique réutilisable pour `useSound`, `useAdmob`, et `useStorage`.
- `src/i18n/` : Support multilingue (AR, FR, EN) avec détection automatique.

---

## 📦 Guide de Déploiement

### Étape 1 : Développement Local
1. **Dupliquer le Template** : `cp -r sally-game-template mon-nouveau-jeu`
2. **Installer les Dépendances** : `npm install`
3. **Configurer l'Identité** : Mettre à jour `app.json` (nom, slug, package) et `config.js`.
4. **Lancer** : `npx expo start`

### Étape 2 : Build Cloud (EAS)
Sally Games utilise **Expo Application Services (EAS)** pour les builds de production.
```bash
# Configuration EAS
eas build:configure

# Build pour Android (Production)
eas build --platform android --profile production
```

### Étape 3 : Publication sur le Store
- Téléverser le fichier `.aab` sur la **Google Play Console**.
- Configurer la fiche du store (Titre, Description, Captures d'écran).
- Soumettre pour examen (Délai typique : 1 à 3 jours).

---

## 💰 Stratégie de Monétisation
La suite est optimisée pour un ARPU (Revenu Moyen Par Utilisateur) élevé via **Google AdMob** :
- **Bannières** : Revenu persistant pendant le jeu.
- **Interstitiels** : Déclenchés tous les $N$ jeux (ex: tous les 3 jeux) pour équilibrer UX et revenus.
- **Vidéos Récompensées** : Publicités à la demande pour des indices ou des vies supplémentaires.

---

## 📅 Planning de Déploiement (3 Mois)
| Mois | Objectif | Livrable |
|------|----------|----------|
| **Mois 1** | Optimisation Template & Lot 1 | 15 premiers jeux publiés (Arcade & Puzzles) |
| **Mois 2** | Lot 2 & Assurance Qualité | 20 jeux publiés + Optimisation des performances |
| **Mois 3** | Lot 3 & Expansion | 15 derniers jeux + Personnalisations B2B |

---

## 💼 Stratégie Business (B2B / B2B2C)

### 1. B2B (Marquage Entreprise)
- **White Label** : Proposer "Sally Games" à des clients corporatifs comme outils d'engagement interne (ex: un "Sudoku Co-brandé" pour les employés d'une banque).
- **Licences Sans Pub** : Les clients paient un abonnement annuel pour offrir des jeux sans publicité à leurs employés/clients.

### 2. B2B2C (Partenariats)
- **Bundles Télécom** : Partenariat avec des FAI/Opérateurs au Maroc/MENA pour inclure Sally Games dans des "Gaming Packs".
- **Récompenses Locales** : Gagner des points dans les jeux échangeables contre des réductions réelles chez des partenaires locaux.

### 3. Growth Hacking (Marché MENA)
- **Localisation Culturelle** : Priorité au contenu en Darija et en Arabe.
- **Offline First** : Optimisé pour les environnements à faible bande passante.
- **Tournois Communautaires** : Organisation de tournois locaux via les modules "Duel".

---
*Sally Group — Documentation Automatisée v1.0.0*
