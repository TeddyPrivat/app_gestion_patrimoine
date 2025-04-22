const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello depuis Express 👋');
});

app.listen(port, () => {
  console.log(`🚀 Serveur Express démarré sur http://localhost:${port}`);
});
