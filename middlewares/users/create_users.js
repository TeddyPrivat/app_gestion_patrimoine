const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser(email, password, nom, prenom, tenantId, role) {
  const saltRounds = 10;

  const passwordHash = await bcrypt.hash(password, saltRounds);
  const emailHash = await bcrypt.hash(email, saltRounds);

  await prisma.user.create({
    data: {
      nom: nom,
      prenom: prenom,
      email: emailHash,
      password: passwordHash,
      tenantId: tenantId,
      role: role
    },
  });
}

module.exports = {
  createUser
};
