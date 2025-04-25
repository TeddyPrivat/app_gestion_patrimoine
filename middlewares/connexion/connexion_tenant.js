const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cryptojs = require('cryptojs');

async function signInTenant(email, password) {
  const emailHashed = cryptojs.Crypto.SHA256(email.toLowerCase()).toString();
  console.log("emailHashed", emailHashed);
  const tenant = await prisma.tenant.findUnique({
    where:{ emailHash: emailHashed },
    include: { users: true },
  });

  if (!tenant) {
    throw new Error('Email incorrect ou utilisateur non trouvé');
  }else{
    if(tenant.password !== cryptojs.Crypto.SHA256(password).toString()) {
      console.log(cryptojs.Crypto.SHA256(password).toString());
      throw new Error('Mot de passe incorrect');
    }
  }
  return tenant;
}

module.exports = {
  signInTenant,
}
