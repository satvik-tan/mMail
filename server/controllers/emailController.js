const nodemailer = require("nodemailer");
const { parseCSV } = require("../utils/parseCSV");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const {oAuth2Client} = require("../config/oauthConfig");

const sendEmails = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded or invalid file format" });
    }

    // Get email template data from form
    const subject = req.body.subject || "Alfresco-2025 Chess Tournament";
    const greeting = req.body.greeting || "Hello";
    const body = req.body.body || "";
    const sender = req.body.sender || "Satvik";

    console.log("File received:", file.originalname, file.mimetype);
    console.log("Email template:", { subject, greeting, body, sender });
    
    try {
      // Ensure the parseCSV function is handling the file path properly
      const recipients = await parseCSV(file.path);
      console.log("Parsed Recipients:", recipients);
      
      if (!recipients || recipients.length === 0) {
        throw new Error("No valid recipients found in CSV");
      }

      oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

      // Create a Nodemailer transporter using Gmail and OAuth2 with refresh token.
      const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "satviktandon6@gmail.com", 
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: ACCESS_TOKEN,
        },
        tls: {
          rejectUnauthorized: true,
        },
      });

      // Loop over recipients and send an email to each.
      for (const recipient of recipients) {
        if (!recipient.email) {
          console.warn("Skipping recipient with no email:", recipient);
          continue;
        }
        
        const mailOptions = {
          from: `"${sender}" <satviktandon6@gmail.com>`,
          to: recipient.email,
          subject: subject,
          text: `${greeting} ${recipient.name || recipient.company || ""},

${body}`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to: ${recipient.email}`);
      }

      // Remove the file after processing.
      fs.unlinkSync(file.path);
      res.json({ success: true, message: "Emails sent successfully!" });
    } catch (parseError) {
      console.error("CSV parsing error:", parseError);
      return res.status(400).json({ error: `CSV parsing failed: ${parseError.message}` });
    }
  } catch (error) {
    console.error("Email sending error:", error);

    // Clean up file if there's an error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error("Error deleting file:", unlinkError);
      }
    }

    res.status(500).json({ error: error.message || "Internal server error" });
  }
};

module.exports = { sendEmails };