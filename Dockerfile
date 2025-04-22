# Étape 1 : Build
FROM node:20

# Dossier de travail dans le conteneur
WORKDIR /app

# Copier les fichiers
COPY package*.json ./
RUN npm install

# Copier le reste du code (src, prisma, etc.)
COPY . .

# Générer le client Prisma
RUN npx prisma generate

# Exposer le port (si ton app écoute sur 3000 par ex)
EXPOSE 3000

# Commande de lancement
CMD ["npm", "run", "dev"]
