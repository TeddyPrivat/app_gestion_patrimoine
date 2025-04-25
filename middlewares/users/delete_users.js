const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function deleteUser(idUser){
  try{
    return prisma.user.delete({
      where: { id: idUser }
    })
  }catch(error){
    console.error("Erreur lors de la suppression :", error.message);
    throw error;
  }
}

module.exports = {
  deleteUser,
}
