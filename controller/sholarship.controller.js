
const express = require("express");
const router = express.Router();
const multer = require('multer');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// Create the multer instance
const upload = multer({ storage: storage });


const Scholarship = require("../models/Scholarship");

router.post("/saveForm", upload.fields([{name:'file_cv',maxCount:1},{name:'file_lettreMotivation',maxCount:1}]),  async (req, res) => {
  try {
    // Extract form data from the request body
    const { firstName, lastName, email, msg } = req.body;

    console.log('firstName', firstName);
    console.log('lastName', lastName);
    console.log('email', email);
    console.log('file_cv', req.files.file_cv);
    console.log('file_lettreMotivation', req.files.file_lettreMotivation);
    console.log('msg', msg);

    const cv = JSON.stringify(req.files.file_cv);
    const lettreMotivation = JSON.stringify(req.files.file_lettreMotivation);
    // Create a new Scholarship instance with the extracted data
    const scholarship = new Scholarship({ firstName, lastName, email, cv, lettreMotivation, msg });

    // Save the scholarship to the database
    const savedScholarship = await scholarship.save();

    console.log('Form data saved to the database:', savedScholarship);
    res.json({ success: true, message: 'Form data received and saved!' });
  } catch (error) {
    console.error('Error saving form data to the database:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
