const express = require('express');
const {protect} = require('../MiddleWare/Auth'); //This middleware could be used to protect the secured routes of the application
const {signup,login,refreshAccessToken} = require('../Controllers/authControllers');

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/refresh-token',protect, refreshAccessToken);

module.exports = router;