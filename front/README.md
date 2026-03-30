# Front-end — Angular (YourCarYourWay)

Partie **interface** du projet full stack. Pour le contexte global (back-end, prérequis, ordre de démarrage), lisez d’abord le **`README.md` à la racine du dépôt** (un niveau au-dessus de ce dossier).

---

## Environnement local

1. Depuis le dossier `front/` :
   ```bash
   npm install
   ```
2. Lancer le serveur de développement :
   ```bash
   npm start
   ```
   Équivalent : `ng serve` — l’app est servie sur **http://localhost:4200/** (rechargement automatique à l’enregistrement des fichiers).

3. **Le back-end Spring Boot doit tourner** si l’application s’appuie sur l’API ou le WebSocket (voir README racine, section *Lancer le back-end*).

---

## Versions

Projet généré avec [Angular CLI](https://github.com/angular/angular-cli) **18.x**. Les dépendances exactes sont dans `package.json`.

---

## Commandes utiles

| Objectif | Commande |
|----------|----------|
| Serveur de dev | `npm start` ou `ng serve` |
| Build production | `npm run build` ou `ng build` — sortie dans `dist/` |
| Tests unitaires | `npm test` ou `ng test` (Karma) |
| Nouveau composant | `ng generate component nom-du-composant` |

Pour `ng generate` (directives, services, etc.), voir la [doc Angular CLI](https://angular.dev/tools/cli).

---

## Fin de projet / livrable

Avant de rendre le travail, vérifiez qu’un **nouveau développeur** peut : lire le README racine, installer les dépendances, lancer le back puis le front, et comprendre où se trouve le code du front (`src/app/`, etc.). Complétez le README racine si une étape manque.
