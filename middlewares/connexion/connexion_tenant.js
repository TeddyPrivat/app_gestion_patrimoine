const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { generateToken } = require('../auth');

const prisma = new PrismaClient();

async function signInTenant(email, password) {
  const tenant = await prisma.tenant.findUnique({
    where: { email: email.toLowerCase() },
    include: { users: true },
  });

  if (!tenant) {
    throw new Error('Email incorrect ou tenant non trouvé');
  }

  const isValid = await bcrypt.compare(password, tenant.password);
  if (!isValid) {
    throw new Error('Mot de passe incorrect');
  }

  // Création du token JWT
  const token = generateToken({
    id: tenant.id,
    email: tenant.email,
    type: 'tenant' // utilisé pour différencier les types dans JWT
  });

  return {
    tenant,
    token
  };
}

module.exports = {
  signInTenant,
};
