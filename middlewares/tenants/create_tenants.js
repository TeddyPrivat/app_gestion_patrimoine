const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

async function createTenant(nom, email, password) {
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  return prisma.tenant.create({
    data: {
      nom: nom,
      email: email,
      password: passwordHash
    }
  });
}

module.exports = {
  createTenant
};
