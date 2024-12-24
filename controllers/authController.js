const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
  
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });
  
    const newUser = new User({ username, email, password});
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
  };
  
  exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: 'Invalid credentials' });
    }
  
    const token = jwt.sign(
    { id: user._id},
    process.env.JWT_SECRET, 
    { expiresIn: '1h' }
    );
  
    res.json({ token});
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
  };
