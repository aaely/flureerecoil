
const express = require('express'),
session = require('express-session'),
passport = require('passport'),
SpotifyStrategy = require('passport-spotify').Strategy,
consolidate = require('consolidate');
const axios = require('axios')

require('dotenv').config();

/*const getCustomer = async (userHandle) => {
  let customerQuery = {
    "select": ["*"],
    "from": ["customer/spotify", `${userHandle}`]
  }
  await axios({
  url: 'http://192.168.0.248:5000/api/db/aaely/dispensary/query',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  data: JSON.stringify(customerQuery) 
})}*/

/*const updateCustomer = async (id) => {
  let updateCustomerQuery = [{
    "_id": id,
    "spotify": "product_PineappleExpress",
  }]
  await axios({
    url: 'http://192.168.0.248:5000/api/db/aaely/dispensary/transact',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(updateCustomerQuery)
  })
}*/

const authCallbackPath = '/auth/spotify/callback'

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session. Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing. However, since this example does not
//   have a database of user records, the complete spotify profile is serialized
//   and deserialized.

passport.serializeUser(function (user, done) {
done(null, user);
});

passport.deserializeUser(function (obj, done) {
done(null, obj);
});

// Use the SpotifyStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, expires_in
//   and spotify profile), and invoke a callback with a user object.

passport.use(
new SpotifyStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:5000' + authCallbackPath,
    proxy: true
  },
  async function (accessToken, refreshToken, expires_in, profile, done) {
    // asynchronous verification, for effect...
    /*const existingCustomer = await getCustomer(profile.id)
      if (existingCustomer.length > 0) {
        // if user already exists
        done(null, existingCustomer);
      }*/

      const user = { acc_token: accessToken, ref_token: refreshToken, prf: profile, exp: expires_in }
      console.log(user)
      console.log(process.env.CLIENT_ID)
    return done(null, user)
  }
));