const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function createTenant(nom) {

  return prisma.tenant.create({
    data: {
      name: nom
    }
  });
}

module.exports = {
  createTenant
};
