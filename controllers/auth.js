const axios = require('axios');
const jwt = require('jsonwebtoken');

const accountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

exports.generateOtp = (req, res) => {
  return;
};

exports.verifyOtp = (req, res) => {
  return;
};

exports.isJwtRequired = expressJwt({
  secret: process.env.SECRET_KEY,
  userProperty: 'otp',
});
