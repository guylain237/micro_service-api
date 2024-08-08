const express = require('express');
const { register, login, getUserInfoFromToken } = require('../controllers/auth');

const router = express.Router();


router.post('/register', register);

router.post('/login', login);

router.get('/getUserInfoFromToken',getUserInfoFromToken);

module.exports = router;