const express = require('express');
const router = express.Router();

const {
  generateOtp,
  verifyOtp,
  isJwtRequired,
} = require('../controllers/auth');

router.post('/auth/otp/generate', generateOtp);
router.post('/auth/otp/verify', isJwtRequired, verifyOtp);

module.exports = router;
