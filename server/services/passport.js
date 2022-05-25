const e = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../confing/keys");
const User = require("../models/User");

// Serialize User ...
passport.serializeUser((user, done) => {
  done(null, user.id);
});
// // De Serialize User ..
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
// Passport Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log("User already Reigister in DB :");
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
      }).save();
      return done(null, user);
    }
  )
);
