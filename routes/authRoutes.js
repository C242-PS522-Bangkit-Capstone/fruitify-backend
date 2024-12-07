const express = require('express');
const { 
  registerUser, 
  loginUser, 
  editProfile, 
  deleteProfile, 
  saveScanData 
} = require('../controllers/authController');

const router = express.Router();

// Route for user registration
router.post('/register', registerUser);

// Route for user login
router.post('/login', loginUser);

// Route for editing user profile
router.put('/profile/:id', editProfile);

// Route for deleting user profile
router.delete('/profile/:id', deleteProfile);

// Route for saving scan data
router.post('/scans', saveScanData);

module.exports = router;
