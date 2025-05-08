const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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
  username: {
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

personSchema.pre('save',async function(next){
    const person = this
    if(!person.isModified('password')) return next();
    try {
        const salt =  await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(person.password,salt)
        person.password = hashPassword
        next()
    } catch (error) {
        next(error) 
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatch = await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    } catch (error) {
        throw error
    }
}

// Create and export the model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;
