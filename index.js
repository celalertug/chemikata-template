require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodParser = require('body-parser');
const userController = require('./controller/user');
const { UserModel } = require('./model');

(async () => {
  await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

  const app = express();

  app.use(bodParser.json());
  app.use('/user', userController(UserModel));

  app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(process.env.PORT, 'listening');
  });
})();
