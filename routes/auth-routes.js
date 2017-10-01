'use strict';

const passport = require('passport');

module.exports = {
  init(app) {
    app.get(
      '/auth/google',
      passport.authenticate('google', {scope: ['profile', 'email']})
    );

    app.get('/api/v1/user', (req, res) => {
      console.log('In GET user...');
      console.log(req);
      res.send(req.user);
    });

    app.get('/api/v1/logout', (req, res) => {
      console.log('In GET logout...');
      req.logout();
      res.send(req.user);
    });

    app.get('/auth/google/callback', passport.authenticate('google'));
  }
};
