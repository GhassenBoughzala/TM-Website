
const express = require("express");
const router = express.Router();
const multer = require('multer');
const { contactEmail } = require("../middleware/mailer");
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

    const cv = JSON.stringify(req.files.file_cv);
    const lettreMotivation = JSON.stringify(req.files.file_lettreMotivation);
    // Create a new Scholarship instance with the extracted data
    const scholarship = new Scholarship({ firstName, lastName, email, cv, lettreMotivation, msg });

    // Save the scholarship to the database
    const savedScholarship = await scholarship.save();
    //await contactEmail({ firstName, lastName, email, cv:req.files.file_cv[0], lm:req.files.file_lettreMotivation[0], msg });

    // Contact email and handle errors
    try {
      await contactEmail({ firstName, lastName, email, cv: req.files.file_cv[0], lm: req.files.file_lettreMotivation[0], msg });
      emailSent = true;
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    console.log('Form data saved to the database:', savedScholarship);
    if (emailSent) {
      res.json({ success: true, message: 'Merci.' });
    } else {
      res.json({ success: true, message: 'Form data received and saved, but email sending failed.' });
    }
  } catch (error) {
    console.error('Error saving form data to the database:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
