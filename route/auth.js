const express = require('express');
const router = express.Router();

const { generateOtp, verifyOtp } = require('../controllers/auth');

router.post('/auth/otp/generate', generateOtp);
router.post('/auth/otp/verify', verifyOtp);

module.exports = router;
