const express = require('express');
const { createUser } = require('./middlewares/users/create_users');
const { createTenant } = require('./middlewares/tenants/create_tenants');
const { signInUser } = require('./middlewares/connexion/connexion_user');
const { signInTenant } = require('./middlewares/connexion/connexion_tenant');


// + Recherche, mise à jour, suppression
const { searchUserByName } = require('./middlewares/recherche/recherche');
const { searchByEmail } = require('./middlewares/recherche/recherche_mail');
const { updateUser } = require('./middlewares/users/update_users');
const { deleteUser } = require('./middlewares/users/delete_users');
const crypto = require('cryptojs');

const app = express();
const port = 3000;

app.use(express.json());

// === Accueil ===
app.get('/', (req, res) => {
  res.send('Hello depuis Express 👋');
});

// === Création d'un utilisateur ===
app.post('/create-user', async (req, res) => {
  const { email, password, nom, prenom, tenantId, role } = req.body;
  try {
    const newUser = await createUser(email, password, nom, prenom, tenantId, role);
    res.status(201).json({ message: "User créé avec succès", user: newUser });
  } catch (error) {
    console.error("Erreur création user:", error);
    res.status(500).json({ error: "Erreur lors de la création de l'utilisateur" });
  }
});

// === Création d'un tenant ===
app.post('/create-tenant', async (req, res) => {
  console.log("🧾 Données reçues pour le tenant :", req.body);
  const { nom, email, password } = req.body;
  try {
    const newTenant = await createTenant(nom, email, password);
    res.status(201).json({ message: "Tenant créé avec succès", tenant: newTenant });
  } catch (error) {
    console.error("Erreur création tenant:", error);
    res.status(500).json({ error: "Erreur lors de la création du tenant" });
  }
});

// === Connexion utilisateur ===
app.post('/signin/user', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user  = await signInUser(email, password);
    res.status(200).json({ message: "Connexion réussie", user: user });
  } catch (error) {
    console.error("Erreur connexion user:", error.message);
    res.status(401).json({ error: error.message });
  }
});

// === Connexion tenant ===
app.post('/signin/tenant', async (req, res) => {
  const { email, password } = req.body;
  try {
    const tenant = await signInTenant(email, password);
    console.log(tenant);
    res.status(200).json({message: "Connexion réussie", tenant: tenant });
  } catch (error) {
    console.error("Erreur connexion tenant:", error.message);
    res.status(401).json({ error: error.message });
  }
});

// === Recherche utilisateurs ===
app.get('/recherche', async (req, res) => {
  const { nomUser, tenantId } = req.query;
  try {
    const user = await searchUserByName(nomUser, tenantId);
    if (!user) {
      console.error("Aucun user trouvé !");
    } else {
      user.email = crypto.Crypto.AES.decrypt(user.email, process.env.SECRET_KEY);
      return res.status(200).json({ message: "Recherche réussie", user: user });
    }
  } catch (error) {
    console.error("Erreur lors de la recherche :", error.message);
    res.status(401).json({ error: error.message });
  }
});

app.get('/recherche/user', async (req, res) => {
  const email = req.query.email;
  try {
    const user = await searchByEmail(email);
    if (!user) {
      console.error("Aucun user trouvé !");
    } else {
      user.email = crypto.Crypto.AES.decrypt(user.email, process.env.SECRET_KEY);
      return res.status(200).json({ message: "Recherche réussie", user: user });
    }
  } catch (error) {
    console.error("Erreur lors de la recherche :", error.message);
    res.status(401).json({ error: error.message });
  }
});

// === Mise à jour utilisateurs ===
app.patch('/update/user', async (req, res) => {
  const { email, ...updateFields } = req.body;
  try {
    const updatedUser = await updateUser(email, updateFields);
    res.status(200).json({ message: "Utilisateur mis à jour", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Mise à jour échouée : " + error.message });
  }
});

// === Suppression utilisateurs ===
app.delete('/delete/user', async (req, res) => {
  const id = req.query.id;
  try {
    const deletedUser = await deleteUser(id);
    res.status(200).json({ message: "L'utilisateur a été supprimé", user: deletedUser });
  } catch (error) {
    res.status(500).json({ error: "Suppression échouée : " + error.message });
  }
});

// === Lancement du serveur ===
app.listen(port, () => {
  console.log(`🚀 Serveur Express démarré sur http://localhost:${port}`);
});
