# Projet Fil Rouge WEB - Contrôle Voiture Bluetooth (ESP32)

## Description

Ce projet permet de contrôler une voiture motorisée équipée d’un ESP32 via une interface web utilisant le Bluetooth Low Energy (BLE).  
L’utilisateur peut piloter la voiture (avancer, reculer, tourner, stop) depuis un navigateur compatible Web Bluetooth (Chrome, Edge).

---

## Fonctionnalités

- Connexion/déconnexion Bluetooth à l’ESP32
- Commandes directionnelles (↑, ↓, ←, →, Stop)
- Affichage de l’état de connexion et de la dernière commande envoyée
- Reconnexion automatique en cas de coupure non volontaire

---

## Structure du projet

```
frontend/
│
├── index.html        # Interface utilisateur
├── style.css         # Styles CSS
├── script.js         # Gestion des boutons directionnels
├── connect.js        # Gestion Bluetooth et communication avec l’ESP32
└── controller.js     # (optionnel) Autres scripts de gestion
```

---

## Prérequis

- Un ESP32 (ex: WROOM-32) avec le code BLE fourni dans ce projet
- Un navigateur compatible Web Bluetooth (Chrome, Edge)
- Serveur local (ex: VS Code Live Server, Python HTTP server…)

---

## Installation & Lancement

1. **Flasher l’ESP32** avec le code Arduino BLE fourni.
2. **Ouvrir le dossier `frontend/`** dans VS Code ou un éditeur.
3. **Lancer un serveur local** dans le dossier `frontend/` :
   - Avec Python :  
     `python -m http.server`
   - Ou avec l’extension Live Server de VS Code.
4. **Ouvrir le navigateur** à l’adresse indiquée (ex: http://localhost:8000).
5. **Cliquer sur "Connexion Bluetooth"** et sélectionner l’ESP32.
6. **Utiliser les flèches pour piloter la voiture**.

---

## Dépendances

- [Web Bluetooth API](https://developer.mozilla.org/fr/docs/Web/API/Web_Bluetooth_API)
- ESP32 Arduino BLE Library

---

## Auteurs

- Dylan Hebrard(Ynov B2 – Projet Fil Rouge WEB)
- Alexandre Echazarreta  (Ynov B2 – Projet Fil Rouge WEB)

---

## Remarques

- Le projet fonctionne uniquement sur HTTPS ou localhost.
- Si la connexion Bluetooth échoue, vérifier que l’ESP32 est bien alimenté et visible.
- Pour toute question ou bug, contacter le responsable du projet.
