const mongoose = require('mongoose');

const UserModel = mongoose.model('User', new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  alive: Boolean,
  gender: String,
  createdAt: Number,
  updatedAt: Number,
}));

module.exports = { UserModel };
