const bcrypt = require("bcrypt");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function createUser(email, password, nom, prenom) {
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds)
    .then(passwordHash => {
      return prisma.user.create({
        data: {
          email: email,
          password: passwordHash,
          nom: nom,
          prenom: prenom,
        },
      });
    })
    .then(user => {
      console.log('Utilisateur créé:', user);
    })
    .catch(e => {
      console.error('Erreur:', e);
    });
}

module.exports = {
  createUser
};
