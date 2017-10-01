'use strict';

const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  googleId: String
});

module.exports = {
  init() {
    mongoose.model('User', userSchema);
  }
};
