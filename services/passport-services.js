'use strict';

const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const userModel = require('../model/user');
const keys = require('../config/keys');

// Connect to the database.
mongoose.connect(keys.mongoURL);

// Initialize the data model.
userModel.init();
const User = mongoose.model('User');

function processUser(profile, done) {
  User.findOne({googleId: profile.id})
    .then(userData => {
      if (userData) {
        console.log('User already exists in mongo');
        return done(null, userData);
      }

      new User({googleId: profile.id}).save()
        .then(newUserData => {
          return done(null, newUserData);
        });
    });
}

passport.serializeUser((user, done) => {
  console.log('Serializing user');
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Deserializing user');
  User.findById(id).then(userData => {
    return done(null, userData);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (securityToken, refreshToken, profile, done) => {
    console.log('In final callback from google');
    return processUser(profile, done);
  })
);
