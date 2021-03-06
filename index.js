require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const authRoutes = require('./route/auth.js');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true }));

app.use('/api', authRoutes);
const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
