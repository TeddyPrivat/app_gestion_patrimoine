const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/search', async (req, res) => {
  const { type, minValeur, maxValeur } = req.query;

  try {
    const patrimoines = await prisma.patrimoine.findMany({
      where: {
        ...(type && { type: { contains: type, mode: 'insensitive' } }),
        ...(minValeur && { valeurEstimee: { gte: parseFloat(minValeur) } }),
        ...(maxValeur && { valeurEstimee: { lte: parseFloat(maxValeur) } }),
      },
    });
    res.json(patrimoines);
  } catch (error) {
    console.error('Erreur lors de la recherche de patrimoines :', error);
    res.status(500).json({ error: 'Erreur lors de la recherche' });
  }
});

module.exports = router;
