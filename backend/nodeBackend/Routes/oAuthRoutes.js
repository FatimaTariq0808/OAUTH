const express = require('express');
const router = express.Router();
const {googleRedirect, googleCallback} = require('../Controllers/oAuthController');

router.get('/google', googleRedirect);
router.get('/google/callback', googleCallback);

module.exports = router;