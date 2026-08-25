const express = require('express');
const { register, login, getDetails } = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/details', authenticate, getDetails);

module.exports = router;