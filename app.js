const express = require('express');
require('dotenv').config();
const path = require('path')


// Import main routes
const router = require('./routes/routes');

// Express app initialization
const app = express();
const port = process.env.PORT || 7000;

// Middleware for JSON parsing
app.use(express.json());

// Middleware to use all routes
app.use('/api', router, express.static(path.join(__dirname, 'uploads'))); // Added '/api' prefix to all routes

// Middleware to handle routes not found
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// PUT route
app.put('/api/auth/profile/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, gender } = req.body;

// Example: received data log
  console.log(`Updating profile with ID: ${id}`);
  console.log(`Name: ${name}, Email: ${email}, Gender: ${gender}`);
});

// Middleware to handle global errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Running the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
