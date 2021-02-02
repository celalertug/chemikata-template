/* eslint-disable no-undef */
const assert = require('assert');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

const userController = require('../controller/user');
const { UserModel } = require('../model');

const clearDataList = (data) => data.map((i) => {
  const {
    _id, __v, createdAt, updatedAt, ...ret
  } = i;
  return ret;
});

describe('user api test', () => {
  let listener;
  const URL = 'http://localhost:3000';
  let mongoServer;
  const opts = { useNewUrlParser: true, useUnifiedTopology: true };

  before(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts);

    const app = express();

    app.use(bodyParser.json());

    app.use('/user', userController(UserModel));

    listener = app.listen(3000);
  });

  after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
    listener.close();
  });

  it('should test crud', async () => {
    await axios.post(`${URL}/user`, {
      name: 'lutfi',
      age: 33,
      email: 'lutfi@gmail.com',
      alive: true,
      gender: 'male',
    });

    await axios.post(`${URL}/user`, {
      name: 'necmi',
      age: 23,
      email: 'necmi@yahoo.com',
      alive: false,
      gender: 'male',
    });

    await axios.post(`${URL}/user`, {
      name: 'husniye',
      age: 29,
      email: 'husniye@yahoo.com',
      alive: true,
      gender: 'female',
    });

    const res = await axios.get(`${URL}/user`);
    const d = clearDataList(res.data);

    // console.log(d);
    assert.deepStrictEqual(d, [
      {
        name: 'lutfi',
        age: 33,
        email: 'lutfi@gmail.com',
        alive: true,
        gender: 'male',
      },
      {
        name: 'necmi',
        age: 23,
        email: 'necmi@yahoo.com',
        alive: false,
        gender: 'male',
      },
      {
        name: 'husniye',
        age: 29,
        email: 'husniye@yahoo.com',
        alive: true,
        gender: 'female',
      },
    ]);
  });
});
