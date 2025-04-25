const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function searchUserByName(nomUser, tenantId){
  return prisma.user.findFirst({
    where: {
      nom: {
        equals: nomUser,
        mode: "insensitive"
      },
      tenantId: tenantId
    }
  });
}

module.exports = {
  searchUserByName
}

