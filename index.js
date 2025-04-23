const express = require('express');
const user = require('./middlewares/users/create_users');
const tenant = require('./middlewares/tenants/create_tenants');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello depuis Express 👋');
});

app.post('/create-user', async (req, res) => {
  const { email, password, nom, prenom, tenantId, role } = req.body;
  try{
    const newUser = await user.createUser(email, password, nom, prenom, tenantId, role);
    console.log("Tenant créé :", newUser);
    res.status(201).json({ message: "User créé avec succès", user: newUser });
  } catch (error) {
    console.error("Erreur lors de la création de l'user :", error);
    res.status(500).json({ error: "Erreur lors de la création de l'user" });
  }
});

app.post('/create-tenant', async (req, res) => {
  const { name } = req.body;
  try {
    const newTenant = await tenant.createTenant(name);
    console.log("Tenant créé :", newTenant);
    res.status(201).json({ message: "Tenant créé avec succès", tenant: newTenant });
  } catch (error) {
    console.error("Erreur lors de la création du tenant :", error);
    res.status(500).json({ error: "Erreur lors de la création du tenant" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Serveur Express démarré sur http://localhost:${port}`);
});
