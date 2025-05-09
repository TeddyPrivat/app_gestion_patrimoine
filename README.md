# App Gestion Patrimoine

Application backend de gestion de patrimoine en **architecture multi-tenant**, développée avec **Node.js**, **Express** et **Prisma**, connectée à une base de données **PostgreSQL** via **Docker**.

## 🚀 Fonctionnalités principales

- API REST sécurisée pour la gestion des patrimoines
- Architecture multi-tenant (données isolées par client)
- Chiffrement des données sensibles (via Prisma Middleware)
- Dockerisation de l'API et de PostgreSQL pour un déploiement rapide
- Tests API avec Postman

## 🛠️ Technologies utilisées

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Postman](https://www.postman.com/) pour tester l'API

## 📦 Installation

1. **Cloner le projet :**

```bash
git clone https://github.com/TeddyPrivat/app_gestion_patrimoine.git
cd app_gestion_patrimoine

```

2. **Configurer les variables d'environnement (.env) :**

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
ENCRYPTION_KEY="votre_cle_de_chiffrement"

```

3. **Installer les dépendances :**

```bash
npm install

```

4. **Lancer PostgreSQL et l'API avec Docker :**

```bash
docker-compose up --build

```
