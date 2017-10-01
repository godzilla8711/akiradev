'use strict';

const authRoutes = require('./routes/auth-routes');
const passport = require('passport');
const express = require('express');
const cookieSession = require('cookie-session');
const app = express();

const keys = require('./config/keys');

// Initialize the passport services.
require('./services/passport-services');

// Enable cookie based authentication.
app.use(cookieSession(
  {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieSessionKey]
  }
));
app.use(passport.initialize());
app.use(passport.session());

// Initialize the authorization routes.
authRoutes.init(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`Started server app on port ${PORT}\n`);
