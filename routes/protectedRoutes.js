// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');

router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({
    message: 'Welcome to the secure dashboard!',
    user: req.user,
  });
});

module.exports = router;
