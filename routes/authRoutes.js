const express = require('express');
const router = express.Router();
const { registerUser, loginUser,forgotPassword } = require('../controllers/authController');



// POST /api/auth/register

router.post('/register', registerUser);

// Add login route:
router.post('/login', loginUser);

// add forgot password route
router.post('/forgot-password', forgotPassword);

//add logout 
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  });


module.exports = router;