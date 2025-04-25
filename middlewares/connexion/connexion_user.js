const bcrypt = require('bcryptjs');
const CryptoJS = require('cryptojs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function signInUser(email, password) {
  const hashedEmail = CryptoJS.Crypto.SHA256(email.toLowerCase()).toString();
  const user = await prisma.user.findUnique({
    where:{ emailHash: hashedEmail },
  });
  console.log(user);
  if (!user) {
    throw new Error('Email incorrect ou utilisateur non trouvé');
  }else{
    let hashedPassword = CryptoJS.Crypto.SHA256(password).toString();
    console.log(hashedPassword);
    if(hashedPassword !== user.hashedPassword){
      throw new Error('Mot de passe incorrect');
    }
  }
  return user;
}

module.exports = {
  signInUser,
}
