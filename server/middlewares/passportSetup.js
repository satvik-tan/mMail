const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { setOAuthTokens } = require("../config/oauthConfig"); // if you plan to use this function
require("dotenv").config();

let RToken = null;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ["profile", "email", "https://mail.google.com/"],
      accessType: "offline",
      prompt: "consent",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("\n===== GOOGLE LOGIN SUCCESS =====");
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken || "Not provided ❌");
      console.log("Profile:", profile);

      // Remove the local variable declaration (i.e., don't use `const`)
      // This assigns the value to the outer RToken variable.
      RToken = refreshToken || null;

      if (!refreshToken) {
        console.error("\n🚨 Refresh Token Missing! Try revoking permissions and logging in again.");
      } else {
        console.log("\n✅ Refresh Token Found!");
      }

      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

module.exports = {
  passport,
  // This function returns the stored refresh token
  getRToken: () => RToken,
};
