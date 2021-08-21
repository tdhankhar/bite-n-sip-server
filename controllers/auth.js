const axios = require('axios');
const jwt = require('jsonwebtoken');
const { uniqueId } = require('lodash');
var expressJwt = require('express-jwt');

const accountSid = process.env.TWILIO_ACCOUNT_ID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

exports.generateOtp = (req, res) => {
  const number = req.body.phoneNumber;
  const otp = Math.floor(1000 + Math.random() * 9000);

  client.messages
    .create({
      body: `Your Twilio code is ${otp}`,
      from: 'whatsapp:+14155238886',
      to: `whatsapp:+91${number}`,
    })
    .then((message) => {
      const token = jwt.sign({ _id: otp }, process.env.SECRET_KEY);
      res.cookie('token', token, { expire: new Date() + 9999 });
      return res.json({ token, phoneNumber: number });
    })
    .catch((err) => {
      console.log(err);
    })
    .done();
  return;
};

exports.verifyOtp = (req, res) => {
  const otp = req.body.otp;
  const number = req.body.phoneNumber;
  if (req.otp._id === otp) {
    console.log('OTP matched reached');
    const token = jwt.sign({ _id: number }, process.env.SECRET_KEY);
    res.cookie('token', token, { expire: new Date() + 9999 });
    return res.json({ token, phoneNumber: number });
  } else {
    return res.json({
      error: 'OTP did not match. try again !',
    });
  }
  return;
};

exports.isJwtRequired = expressJwt({
  secret: process.env.SECRET_KEY,
  userProperty: 'otp',
  algorithms: ['HS256'],
});
