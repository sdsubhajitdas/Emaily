const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const mongoose = require("mongoose");
require("dotenv").config();

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });

      // Add if user doesn't exist
      if (!user) {
        user = await new User({
          googleId: profile.id,
          displayName: profile.displayName,
          displayPictureLink: profile._json.picture,
        }).save();
      }

      // Update user profile photo
      if (user.displayPictureLink != profile._json.picture) {
        await user.update({ displayPictureLink: profile._json.picture });
      }

      done(null, user);
    }
  )
);
