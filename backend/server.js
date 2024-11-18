const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db'); // Adjust path if necessary
const bodyParser = require('body-parser');
require('dotenv').config(); // To load environment variables from .env file

const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;

// Middleware to parse incoming request body as JSON
app.use(bodyParser.json());

// Registration route
router.post('/register', (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Check if email is already registered
  const checkEmailQuery = 'SELECT email FROM users WHERE email = ?';
  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error.' });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: 'Email is already registered.' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ error: 'Password encryption failed.' });
      }

      // Insert the user into the database
      const insertUserQuery = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
      db.query(insertUserQuery, [name, email, hashedPassword, role], (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Database error.' });
        }
        res.status(201).json({ message: 'User registered successfully!' });
      });
    });
  });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  // Find the user by email
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Database error.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const user = results[0];

    // Compare the password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: 'Error comparing passwords.' });
      }

      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials.' });
      }

      // Create a JWT token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role },
      });
    });
  });
});

// Add routes to the app
app.use('/api', router);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
