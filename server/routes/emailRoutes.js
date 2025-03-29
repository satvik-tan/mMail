const express = require("express");
const { sendEmails } = require("../controllers/emailController");
const multer = require("multer");
const path = require("path");

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter: Allow only CSV files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "text/csv" || file.originalname.toLowerCase().endsWith(".csv")) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV files are allowed"), false);
  }
};

// Multer configuration
const upload = multer({
  storage: storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 1, // Only allow 1 file
  },
  fileFilter: fileFilter,
});

// Middleware for handling file upload errors
const uploadMiddleware = (req, res, next) => {
  upload.single("csvFile")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ error: true, message: `Multer error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ error: true, message: `Upload failed: ${err.message}` });
    }
    next();
  });
};

// Route to handle email sending with CSV upload
router.post("/send", uploadMiddleware, sendEmails);

module.exports = router;
