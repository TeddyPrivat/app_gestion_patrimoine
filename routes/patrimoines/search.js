const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../../middlewares/auth'); // 🔐 On rajoute l'auth

const prisma = new PrismaClient();

// GET /api/patrimoines/search
router.get('/search', authenticateToken, async (req, res) => {
  const { type, minValeur, maxValeur, localisation } = req.query;

  try {
    const results = await prisma.patrimoine.findMany({
      where: {
        tenantId: req.user.tenantId || req.user.id, // 🔐 On force le tenant depuis le token JWT
        ...(type && { type }),
        ...(minValeur && { valeurEstimee: { gte: parseFloat(minValeur) } }),
        ...(maxValeur && { valeurEstimee: { lte: parseFloat(maxValeur) } }),
        ...(localisation && { localisation: { contains: localisation, mode: 'insensitive' } }),
      },
    });

    res.json(results);
  } catch (error) {
    console.error('Erreur lors de la recherche :', error);
    res.status(500).json({ error: "Erreur lors de la recherche" });
  }
});

module.exports = router;
