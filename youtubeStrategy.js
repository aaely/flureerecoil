
const passport = require('passport')
const SpotifyStrategy = require('passport-youtube-v3').Strategy

require('dotenv').config();

const authCallbackPath = '/auth/youtube/callback'

passport.serializeUser(function (user, done) {
done(null, user);
});

passport.deserializeUser(function (obj, done) {
done(null, obj);
});

passport.use(
new SpotifyStrategy(
  {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:5000' + authCallbackPath,
    proxy: true
  },
  async function (accessToken, refreshToken, expires_in, profile, done) {

      const user = { acc_token: accessToken, ref_token: refreshToken, prf: profile, exp: expires_in }
      console.log(user)
      console.log(process.env.CLIENT_ID)
    return done(null, user)
  }
));