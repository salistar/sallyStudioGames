# Sally Games — The Ultimate Mobile Gaming Suite
### React Native + Expo SDK 54 · Clean Architecture · Scalable & Monetizable

Sally Games is a premium collection of 50+ mobile applications designed for mass-market engagement. Built with performance and scalability in mind, this project serves as a robust template for rapid game deployment using the latest Expo technologies.

---

## 📑 Table of Contents
1. [Project Overview](#-project-overview)
2. [Catalog & Categories](#-catalog--categories)
3. [Technical Architecture](#-technical-architecture)
4. [Deployment Guide](#-deployment-guide)
5. [Monetization Strategy](#-monetization-strategy)
6. [Deployment Roadmap](#-deployment-roadmap)
7. [Business Strategy (B2B/B2B2C)](#-business-strategy)

---

## 🚀 Project Overview
Each game in the Sally suite is built using a unified architecture that separates **Game Logic**, **Theme**, and **Native Features** (Ads, Sounds, Storage). 
- **Core Technology**: React Native + Expo SDK 54.
- **Target Platform**: Android (optimised for playability and easy publishing).
- **Special Feature**: Native RTL (Arabic) support, allowing access to the 400M+ MENA market.

---

## 🎮 Catalog & Categories
The project contains over 50 applications, categorized into 4 main pillars:

### 🧩 Logic & Puzzles
- **Sudoku Sally**: Classic logic puzzle with Sally branding.
- **Lingo / Lingo Duel**: Word guessing games.
- **Hex Conquer**: Territory and strategy puzzle.
- **Maze Architect**: Level-building and navigation.
- **Color Flood**: Fill-the-screen strategy.

### 🕹️ Arcade & Skill
- **Fractal Tower / Topple Tower**: Physics-based building.
- **Neon Slice**: Precision-based reflex game.
- **Micro Golf**: Minimalist physics arcade.
- **Quake Run**: Fast-paced survival.

### ⚔️ Duels & Multiplayer
- **Pixel Duel**: 1v1 retro combat.
- **Tempo Duel**: Rhythm-based competition.
- **Duel Pong**: Classic paddle combat.

### 🎓 Educational & Cultural
- **Darija Quiz**: Specifically tailored for the Moroccan market.
- **Braille Touch**: Accessible educational experience.
- **Morse Runner**: Code learning through gameplay.

---

## 🎯 Version Implementation Roadmap (For Each Game)
Every game in the suite will follow this structured version release process:
- **v1.0.0 (MVP Release):** Core gameplay loop, basic Sally Theme (CSS/Styles), and functional local storage.
- **v1.1.0 (Monetization):** AdMob Integration (Banner, Interstitials, Rewarded Video).
- **v1.2.0 (Localization):** Darija, Arabic, French, and English (RTL Support).
- **v2.0.0 (Enhanced UI & Backgrounds):** Complex UI animations, dynamic backgrounds, and advanced sound design.
- **v2.5.0 (Social):** Leaderboards and achievement systems.
- **v3.0.0 (Cross-Platform):** Web platform support and iOS release.

---

## 🛠️ Technical Architecture
We use a modular folder structure to ensure that adding a new game takes less than 15 minutes:
- `src/config/`: Centralized IDs for AdMob and game rules.
- `src/theme/`: A unified "Sally" design system (Colors, Fonts, Shadows).
- `src/hooks/`: Reusable logic for `useSound`, `useAdmob`, and `useStorage`.
- `src/i18n/`: Multilingual support (AR, FR, EN) with auto-detection.

---

## 📦 Deployment Guide

### Phase 1: Local Development
1. **Duplicate Template**: `cp -r sally-game-template my-new-game`
2. **Install Deps**: `npm install`
3. **Configure Identity**: Update `app.json` (name, slug, package) and `config.js`.
4. **Run**: `npx expo start`

### Phase 2: Cloud Build (EAS)
Sally Games uses **Expo Application Services (EAS)** for production builds.
```bash
# Register with EAS
eas build:configure

# Build for Android (Production)
eas build --platform android --profile production
```

### Phase 3: Android Deployment (Google Play) - Detailed
To deploy each mobile app to Google Play:
1. **Prepare Release Build:** Generate an `.aab` file using EAS (`eas build --platform android --profile production`).
2. **Google Play Console Setup:**
   - Create a new app in the Google Play Console.
   - Set up the Store Listing (App Name, Short & Full Descriptions, Hi-Res Icon 512x512, Feature Graphic 1024x500, phone screenshots).
3. **App Content Declaration:** Fill out Privacy Policy, Ads declaration, Data Safety, Content Rating, and Target Audience questionnaires.
4. **App Signing:** Opt-in to Play App Signing.
5. **Release Management:**
   - Go to **Production** -> **Create new release**.
   - Upload the `.aab` file.
   - Enter Release Notes for the specific version.
6. **Publishing:** Save, confirm the rollout, and submit for review (typically 1-7 days).

### Phase 4: iOS Deployment (App Store) - Future
To deploy to the Apple App Store (planned future phase):
1. **Apple Developer Account:** Ensure you have an active Apple Developer Program membership.
2. **Build Preparation:** Create an App ID and Provisioning Profile in the Apple Developer Portal.
3. **Build the IPA:** Generate the `.ipa` file using EAS (`eas build --platform ios --profile production`).
4. **App Store Connect:** Create a new app record, fill out metadata, and define pricing.
5. **Upload:** Upload the build via Transporter or Xcode to TestFlight.
6. **Submit:** Provide iOS-specific screenshots, answer privacy questions, and submit for App Review.

### Phase 5: Web Platform & Background Features - Future
- **Dynamic Backgrounds:** Future updates will introduce rich, animated backgrounds (e.g., Lottie or React Native Skia) across all apps for a premium feel.
- **Web Export:** The architecture supports web builds (`npx expo export:web`).
- **Web Hosting:** The exported static files will be deployable on Vercel, Netlify, or Firebase Hosting to provide a browser-based version of each game.

### Git & Source Control
To push this localized suite or new apps to the monolithic repository, use the following commands:
```bash
git remote add origin https://github.com/salistar/sallyStudiGames.git
git branch -M main
git push -u origin main
```

---

## 💰 Monetization Strategy
The suite is optimized for high ARPU (Average Revenue Per User) via **Google AdMob**:
- **Banners**: Persistent revenue during gameplay.
- **Interstitials**: Triggered every $N$ games (e.g., every 3 games) to balance UX and revenue.
- **Rewarded Videos**: Opt-in ads for hints or extra lives.

---

## 📅 Deployment Roadmap (3 Months)
| Month | Objective | Deliverable |
|-------|-----------|-------------|
| **Month 1** | Template Optimization & Batch 1 | First 15 games published (Arcade & Puzzles) |
| **Month 2** | Batch 2 & Quality Assurance | 20 games published + Performance tuning |
| **Month 3** | Batch 3 & Expansion | Final 15 games + B2B Customizations |

---

## 💼 Business Strategy (B2B / B2B2C)

### 1. B2B (Company Branding)
- **White Label**: Offer "Sally Games" to corporate clients as internal engagement tools (e.g., a "Co-branded Sudoku" for bank employees).
- **Ad-Free Licenses**: Clients pay a yearly fee to have games without ads for their employees/customers.

### 2. B2B2C (Partnerships)
- **Telecom Bundles**: Partner with ISP/Telcos in Morocco/MENA to include Sally Games in "Gaming Packs".
- **Local Rewards**: Earn points in games that can be redeemed for real-world discounts with local partners.

### 3. Growth Hacking (MENA Market)
- **Cultural Localization**: Priority on Darija and Arabic content.
- **Offline First**: Optimized for low-bandwidth environments common in certain regions.
- **Community Duels**: Local tournaments via the "Duel" modules.

---
*Sally Group — Automated Documentation v1.0.0*
