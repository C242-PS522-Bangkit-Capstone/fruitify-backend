const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Load SECRET_KEY from environment variables
const SECRET_KEY = process.env.SECRET_KEY;

// Function to create a JWT token
const createToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
};

// Register user
exports.registerUser = (req, res) => {
  const { name, email, password, gender } = req.body;

  // Hash the password before saving it to the database
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send({ message: 'Error hashing password' });
    }

    const query = 'INSERT INTO users (name, email, password, gender) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, gender], (err, results) => {
      if (err) {
        return res.status(500).send({ message: 'Error registering user' });
      }
      res.status(201).send({ message: 'User registered successfully' });
    });
  });
};

// Login user
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const user = results[0];

    // Verify the inputted password with the one in the database (hashed)
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }

      const token = createToken(user);
      res.send({ message: 'Login successful', token });
    });
  });
};

// Edit profile
exports.editProfile = (req, res) => {
  const { id } = req.params;
  const { name, email, gender } = req.body;

  const query = 'UPDATE users SET name = ?, email = ?, gender = ? WHERE user_id = ?';
  db.query(query, [name, email, gender, id], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error updating profile' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'Profile updated successfully' });
  });
};

// Delete profile
exports.deleteProfile = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE user_id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send({ message: 'Error deleting profile' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'Profile deleted successfully' });
  });
};

// Save scan data
exports.saveScanData = (req, res) => {
  const {
    userId,
    fruitName,
    fruitImageUrl,
    scanDate,
    fruitCondition,
    fruitWeight,     
    nutritionInfo   
  } = req.body;

  // Query to insert data into `data` table
  const query = `
    INSERT INTO data 
    (user_id, fruit_name, fruit_image_url, scan_date, fruit_condition, fruit_weight, nutrition_info) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [userId, fruitName, fruitImageUrl, scanDate, fruitCondition, fruitWeight, nutritionInfo],
    (err, results) => {
      if (err) {
        return res.status(500).send({ message: 'Error saving scan data', error: err.message });
      }
      res.status(201).send({ message: 'Scan data saved successfully' });
    }
  );
};
