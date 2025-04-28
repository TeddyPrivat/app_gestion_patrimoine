// middlewares/auth.js
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.JWT_SECRET || 'dev-secret';
//
// function generateToken(payload) {
//   return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
// }
//
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];
//
//   if (!token) return res.sendStatus(401);
//
//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user; // contient les infos du user + tenantId
//     next();
//   });
// }
//
// module.exports = { generateToken, authenticateToken };
