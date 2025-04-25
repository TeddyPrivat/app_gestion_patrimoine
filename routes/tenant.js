// routes/tenant.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { authenticateToken } = require('../middlewares/auth');

const prisma = new PrismaClient();

// ✅ Route GET /api/tenant/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const tenant = await prisma.tenant.findUnique({
      where: { id: req.user.id }, // pris depuis le token JWT
      include: { users: true },
    });

    if (!tenant) {
      return res.status(404).json({ error: "Tenant non trouvé" });
    }

    res.json(tenant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

