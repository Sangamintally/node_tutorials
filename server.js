require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./auth');
const { connectDB } = require('./db');

// Route handlers
const personRoutes = require('./routes/personRoutes');
const menuRoutes = require('./routes/menuRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(bodyParser.json());
app.use(passport.initialize());

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to: ${req.url}`);
  next();
};
app.use(logRequest);

// Routes
app.use('/person', personRoutes); // No auth here!
app.use('/menu', menuRoutes);

app.get('/', (req, res) => {
  res.send('Hello World! This is me starting to learn again.');
});

// Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
