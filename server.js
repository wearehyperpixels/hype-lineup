// server.js

// Import required modules
const express = require('express');
const mysql = require('mysql');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON bodies

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// MySQL connection setup
const db = mysql.createConnection({
  host: 'ec2-3-12-240-188.us-east-2.compute.amazonaws.com',
  user: 'ec2-user',
  password: 'ec2-user',
  database: 'rave'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + db.threadId);
});

// Routes

// GET all events
app.get('/events', (req, res) => {
  db.query('SELECT * FROM event WHERE status_id = 1 ORDER BY date_start ASC', (error, results) => {
    if (error) {
      console.error('Error fetching events:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    res.json(results); // Respond with the list of events as JSON
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
