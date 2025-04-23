const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function signInTenant(email, password) {
  const tenant = await prisma.tenant.findUnique({
    where:{ email: email.toLowerCase() },
    include: { users: true },
  });
  
  if (!tenant) {
    throw new Error('Email incorrect ou utilisateur non trouvé');
  }

  const isValid = await bcrypt.compare(password, tenant.password);
  if (!isValid) {
    throw new Error('Mot de passe incorrect');
  }

  return tenant;
}

module.exports = {
  signInTenant,
}
