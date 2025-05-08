const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const passport = require('../auth');
const userController = require('../controllers/personControllers');
const {jwtAuthMiddleware, generateToken} = require('../jwt')

// Public route: Register new user
router.post('/signup', async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();

    const payload = {
        id:response.id,
        username:response.username
    }

    const token = await generateToken(payload)

    console.log("User registered.");
    res.status(201).json({response:response,token:token});
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(400).json({ error: 'Internet server error.' });
  }
});

// Public route: login for user
router.post('/login', async (req, res) => {
    try {
      const {username,password} = req.body;
      const user = await Person.findOne({username:username});
      if(!user || !user.comparePassword(password)) {
        return res.status(401).json({error:'Invalid username or password.'})
      }

      const payload = {
          id:user.id,
          username:user.username
      }
  
      const token = await generateToken(payload)
  
      console.log("User Login.");
      res.status(200).json({token:token});
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ error: 'Internet server error.' });
    }
  });

  // Public route: get user detail
router.get('/profile',jwtAuthMiddleware,  async (req, res) => {
    try {
      const userdata = req.user;
      const userId = userdata.id
      const user = await Person.findById(userId);
      res.status(200).json({user:user});
    } catch (error) {
      console.error("Error during fetch user:", error);
      res.status(500).json({ error: 'Internet server error.' });
    }
  });

// Protected routes
const requireAuth = passport.authenticate('local', { session: false });

router.get('/', jwtAuthMiddleware, userController.getAllUsers);

router.get('/:worktype', requireAuth, async (req, res) => {
  try {
    const worktype = req.params.worktype;
    const validTypes = ['chef', 'manager', 'waiter'];

    if (!validTypes.includes(worktype)) {
      return res.status(400).json({ error: 'Invalid work type' });
    }

    const response = await Person.find({ work: worktype });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:Id', requireAuth, async (req, res) => {
  try {
    const personId = req.params.Id;
    const updatedData = req.body;

    const response = await Person.findByIdAndUpdate(personId, updatedData, {
      new: true,
      runValidators: true
    });

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:Id', requireAuth, async (req, res) => {
  try {
    const personId = req.params.Id;
    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }

    res.status(200).json({ message: "Person deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
