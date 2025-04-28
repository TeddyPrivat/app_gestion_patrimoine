const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const CryptoJS = require('cryptojs');

async function createTenant(nom, email, password) {
  const passwordHashed = CryptoJS.Crypto.SHA256(password).toString();
  const emailHashed = CryptoJS.Crypto.SHA256(email.toLowerCase()).toString();

  const encryptedEmail = CryptoJS.Crypto.AES.encrypt(email.toLowerCase(), process.env.SECRET_KEY).toString();

  return prisma.tenant.create({
    data: {
      nom: nom,
      email: encryptedEmail,
      emailHash: emailHashed,
      password: passwordHashed
    }
  });
}

module.exports = {
  createTenant
};
