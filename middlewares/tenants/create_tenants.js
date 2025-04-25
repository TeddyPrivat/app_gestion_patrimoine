const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cryptojs = require('cryptojs');

async function createTenant(nom, email, password) {
  const passwordHashed = cryptojs.Crypto.SHA256(password).toString();
  const emailHashed = cryptojs.Crypto.SHA256(email.toLowerCase()).toString();
  email = cryptojs.Crypto.AES.encrypt(email, process.env.SECRET_KEY);
  return prisma.tenant.create({
    data: {
      nom: nom, // ✅ bien "nom", PAS "name"
      email: email,
      emailHash: emailHashed,
      password: passwordHashed
    }
  });
}

module.exports = {
  createTenant
};
