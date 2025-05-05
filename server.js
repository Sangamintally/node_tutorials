// Load environment variables
require('dotenv').config();

// Import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./auth');
const { connectDB } = require('./db');

// Import route handlers
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Initialize Passport
app.use(passport.initialize());

// Logging middleware
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.url}`);
  next();
};

app.use(logRequest);

// Authentication middleware
const localAuthMiddleware = passport.authenticate('local', { session: false });

// Routes
app.use('/person', localAuthMiddleware, personRoutes);
app.use('/menu', menuRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World! This is me starting to learn again.');
});

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
