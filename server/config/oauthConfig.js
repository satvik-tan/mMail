const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_CALLBACK_URL
);

let storedRefreshToken = null; // Store refresh token here

// Store refresh token in memory
const setRefreshToken = (refreshToken) => {
  if (refreshToken) {
    storedRefreshToken = refreshToken;
    oAuth2Client.setCredentials({ refresh_token: refreshToken });
    console.log("✅ Refresh Token Set:", refreshToken);
  } else {
    console.error("❌ Invalid refresh token provided!");
  }
};

// Get new access token using refresh token


module.exports = { oAuth2Client, setRefreshToken };
