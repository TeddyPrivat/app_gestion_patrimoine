const express = require('express');
const user = require('./middlewares/users/create_users');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello depuis Express 👋');
});

app.post('/create-user', (req, res) => {
  const  email = "test@test.fr";
  const password = "icicatest";

  user.createUser(email, password);
  res.send('Utilisateur en cours de création...');
});

app.listen(port, () => {
  console.log(`🚀 Serveur Express démarré sur http://localhost:${port}`);
});
