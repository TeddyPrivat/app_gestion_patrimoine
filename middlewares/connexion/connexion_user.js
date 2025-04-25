const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { generateToken } = require('../auth');

const prisma = new PrismaClient();

async function signInUser(email, password) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (!user) {
    throw new Error('Email incorrect ou utilisateur non trouvé');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Mot de passe incorrect');
  }

  // Création du token JWT
  const token = generateToken({
    id: user.id,
    email: user.email,
    tenantId: user.tenantId,
    role: user.role
  });

  return {
    user,
    token
  };
}

module.exports = {
  signInUser,
};
