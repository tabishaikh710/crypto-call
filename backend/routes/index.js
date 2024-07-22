const express = require('express');
const authController = require('../controller/authController'); // Make sure this path is correct
const router = express.Router();

// Testing route
router.get('/test', (req, res) => res.json({ msg: 'Working!' }));

// User routes
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
