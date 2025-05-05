const mongoose = require('mongoose');

// Define the schema for a person
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    min: 0
  },
  work: {
    type: String,
    enum: ['chef', 'waiter', 'manager'],
    required: true
  },
  mobile: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  address: {
    type: String,
    trim: true
  },
  salary: {
    type: String,
    trim: true
  },
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create and export the model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
