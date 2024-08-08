const express = require('express');
const { register, login, getUserInfoFromToken } = require('../controllers/auth');
const authmiddleware = require('../middlewares/authmiddleware');

const router = express.Router();


router.post('/register', register);

router.post('/login', login);

router.get('/getRole',authmiddleware, getUserInfoFromToken);

module.exports = router;