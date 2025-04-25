const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cryptojs = require('cryptojs');

async function createUser(email, password, nom, prenom, tenantId, role) {

  const passwordHash = cryptojs.Crypto.SHA256(password).toString();
  const cryptedEmail = cryptojs.Crypto.AES.encrypt(email.toLowerCase(), process.env.SECRET_KEY).toString();
  const hashedEmail = cryptojs.Crypto.SHA256(email).toString();

  return prisma.user.create({
    data: {
      nom: nom,
      prenom: prenom,
      email: cryptedEmail,
      password: passwordHash,
      tenantId: tenantId,
      role: role,
      emailHash: hashedEmail
    },
  });
}

module.exports = {
  createUser
};
