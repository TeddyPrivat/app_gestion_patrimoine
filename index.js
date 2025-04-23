const express = require('express');
const user = require('./middlewares/users/create_users');
const tenant = require('./middlewares/tenants/create_tenants');
const { signInUser } = require("./middlewares/connexion/connexion_user");
const { signInTenant } = require("./middlewares/connexion/connexion_tenant");
const searchPatrimoines = require('./routes/patrimoines/search');
const patrimoineRoutes = require('./routes/patrimoines/patrimoines');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api/patrimoines', searchPatrimoines);
app.use('/api/patrimoines', patrimoineRoutes);

app.get('/', (req, res) => {
  res.send('Hello depuis Express 👋');
});

app.post('/create-user', async (req, res) => {
  const { email, password, nom, prenom, tenantId, role } = req.body;
  try {
    const newUser = await user.createUser(email, password, nom, prenom, tenantId, role);
    console.log("User créé :", newUser);
    res.status(201).json({ message: "User créé avec succès", user: newUser });
  } catch (error) {
    console.error("Erreur lors de la création de l'user :", error);
    res.status(500).json({ error: "Erreur lors de la création de l'user" });
  }
});

app.post('/create-tenant', async (req, res) => {
  const { nom, email, password } = req.body;
  try {
    const newTenant = await tenant.createTenant(nom, email, password);
    console.log("Tenant créé :", newTenant);
    res.status(201).json({ message: "Tenant créé avec succès", tenant: newTenant });
  } catch (error) {
    console.error("Erreur lors de la création du tenant :", error);
    res.status(500).json({ error: "Erreur lors de la création du tenant" });
  }
});

app.post('/signin/user', async (req, res) => {
  const { email, password } = req.body;
  try {
    const userOK = await signInUser(email, password);
    if (!userOK) {
      console.error('Email incorrect ou utilisateur non trouvé');
    }
    return res.status(200).json({ message: "Connexion réussie !", userOK });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    res.status(401).json({ error: error.message });
  }
});

app.post('/signin/tenant', async (req, res) => {
  const { email, password } = req.body;
  try {
    const tenantOK = await signInTenant(email, password);
    if (!tenantOK) {
      console.error('Email incorrect ou tenant non trouvé');
    }
    return res.status(200).json({
      message: "Connexion réussie",
      tenant: {
        id: tenantOK.id,
        name: tenantOK.name,
        users: tenantOK.users
      }
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error.message);
    res.status(401).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Serveur Express démarré sur http://localhost:${port}`);
});
