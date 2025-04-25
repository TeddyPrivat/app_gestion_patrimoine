const { PrismaClient } = require('@prisma/client');
const cryptojs = require("cryptojs");
const prisma = new PrismaClient();


async function updateUser(email, updateFields){
  const emailHashed = cryptojs.Crypto.SHA256(email).toString();
  try{
    return prisma.user.update({
      where: {
        emailHash: emailHashed
      },
      data: updateFields
    });
  }catch (error) {
    console.error("Erreur lors de la mise à jour :", error.message);
    throw error;
  }
}

module.exports = {
  updateUser,
}
