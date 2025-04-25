const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cryptojs = require('cryptojs');

async function searchByEmail(email) {
  const emailHashed = cryptojs.Crypto.SHA256(email).toString();
  return prisma.user.findUnique({
    where: { emailHash: emailHashed }
  });
}

module.exports = {
  searchByEmail
}
