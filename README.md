# YourCarYourWay — Projet full stack (OpenClassrooms P10)

Application **Angular** (front) + **Spring Boot** (API WebSocket). Ce dépôt regroupe les deux parties dans un seul projet pour faciliter le développement et la livraison.

---

## À quoi sert ce projet ?

- **`front/`** : interface utilisateur (Angular 18).
- **`back/`** : serveur Spring Boot avec **WebSocket** (`YourCarYourWay`).
- **`YourCarYourWay.sql`** : script SQL de modèle de données (schéma de référence ; la base n’est pas obligatoire pour lancer l’API telle qu’elle est configurée actuellement).

---

## Prérequis (à installer avant de cloner)

| Outil | Version indicative | Vérification |
|--------|-------------------|--------------|
| **Java** | 17 | `java -version` |
| **Maven** | embarqué via `mvnw` / `mvnw.cmd` dans `back/` | pas besoin d’installer Maven si vous utilisez le wrapper |
| **Node.js** | 18 ou supérieur (LTS recommandé) | `node -v` |
| **npm** | fourni avec Node | `npm -v` |

Pour **Docker Compose** uniquement : installez [Docker Desktop](https://www.docker.com/products/docker-desktop/) (ou équivalent) avec Compose v2 (`docker compose`).

> **Astuce :** notez les versions affichées si vous documentez un bug : ça aide souvent à reproduire le problème.

---

## Démarrage avec Docker Compose

À la **racine** du dépôt (là où se trouve `docker-compose.yml`) :

```bash
docker compose up --build
```

- **Interface** : [http://localhost:4200](http://localhost:4200) (Nginx sert le build de production Angular).
- **API / WebSocket** : le conteneur « back » expose **8080** sur la machine hôte ; le chat utilise `ws://localhost:8080/chat` (déjà prévu dans le front).

Le projet Compose s’appelle **`p10-oc`** (préfixe des conteneurs / réseau). Les images construites sont **`p10-oc-back`** et **`p10-oc-front`**.

Arrêt : `Ctrl+C` dans le terminal, puis éventuellement `docker compose down`.

Pour reconstruire après des changements de code : `docker compose up --build`.

---

## Démarrage rapide (sans Docker, ordre recommandé)

### 1. Cloner le dépôt

```bash
git clone https://github.com/ghazi135/p10-oc-dev-full-stack.git
cd p10-oc-dev-full-stack
```

(Adaptez le nom du dossier si votre clone s’appelle autrement, par ex. `FS_OC_P10-main`.)

### 2. Lancer le back-end

**Windows (PowerShell ou CMD), depuis la racine du projet :**

```bash
cd back
.\mvnw.cmd spring-boot:run
```

**macOS / Linux :**

```bash
cd back
./mvnw spring-boot:run
```

Par défaut, Spring Boot écoute sur **http://localhost:8080** (sauf configuration contraire).

Laissez ce terminal ouvert tant que vous développez sur l’API.

### 3. Lancer le front-end

Ouvrez un **second** terminal, à la racine du projet :

```bash
cd front
npm install
npm start
```

Le navigateur peut s’ouvrir sur **http://localhost:4200/**. Sinon, ouvrez cette URL manuellement.

---

## Structure utile du dépôt

```
.
├── back/                 # Spring Boot (Java 17) + Dockerfile
├── front/                # Angular CLI + Dockerfile + nginx.conf
├── docker-compose.yml    # back + front
├── YourCarYourWay.sql    # Modèle SQL de référence
└── README.md             # Ce fichier
```

Pour le détail des commandes Angular (`ng generate`, tests, build), voir **`front/README.md`**.

---

## Dépannage (souvent utile en premier jour)

- **Port déjà utilisé** : un autre programme utilise 4200 ou 8080. Fermez l’autre appli ou changez le port (Angular : `ng serve --port 4300` ; Spring : propriétés `server.port` si besoin).
- **`npm install` échoue** : vérifiez la version de Node (`node -v`), supprimez `front/node_modules` et relancez `npm install`.
- **Le front ne parle pas au back** : vérifiez que le back est bien démarré et que les URLs / WebSocket côté front correspondent à votre configuration.
- **Docker : le front ne se connecte pas au WebSocket** : vérifiez que le service `back` est bien « healthy » (logs sans erreur) et que le port **8080** n’est pas utilisé par un autre processus sur l’hôte.

---

## Pistes de relecture (livrable)

Relisez ce README en vous demandant : *« Si je n’ai jamais vu ce repo, est-ce que je sais quoi installer, dans quel ordre lancer les commandes, et où chercher le code ? »* Si une étape manque, ajoutez-la ici plutôt qu’en commentaire dans le code seul.
