const express = require('express');
const router = express.Router();
const {getUserInfo,publicInfo} = require('../Controllers/userController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/userInfo', authenticateToken, getUserInfo);
router.get('/profile', publicInfo);

module.exports = router;