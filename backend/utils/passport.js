const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`, // Update with your callback URL
      passReqToCallback: true,
      session: false,
    },
    (req, accessToken, refreshToken, profile, done) => {
      // console.log(req, "##", accessToken, "##", refreshToken, "##", profile);
      // console.log('here')
      done(null, profile);
    }
  )
);
