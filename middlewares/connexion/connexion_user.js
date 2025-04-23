const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function signInUser(email, password) {
  const user = await prisma.user.findUnique({
    where:{ email: email.toLowerCase() },
  });
  console.log(user);
  if (!user) {
    throw new Error('Email incorrect ou utilisateur non trouvé');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Mot de passe incorrect');
  }

  return user;
}

module.exports = {
  signInUser,
}
