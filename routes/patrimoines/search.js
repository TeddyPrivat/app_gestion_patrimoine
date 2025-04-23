const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /api/patrimoines/search
router.get('/search', async (req, res) => {
  const { type, minValeur, maxValeur, localisation, tenantId } = req.query;

  try {
    const results = await prisma.patrimoine.findMany({
      where: {
        ...(type && { type }),
        ...(minValeur && { valeurEstimee: { gte: parseFloat(minValeur) } }),
        ...(maxValeur && { valeurEstimee: { lte: parseFloat(maxValeur) } }),
        ...(localisation && { localisation: { contains: localisation, mode: 'insensitive' } }),
        ...(tenantId && { tenantId }),
      },
    });

    res.json(results);
  } catch (error) {
    console.error('Erreur lors de la recherche :', error);
    res.status(500).json({ error: "Erreur lors de la recherche" });
  }
});

module.exports = router;
