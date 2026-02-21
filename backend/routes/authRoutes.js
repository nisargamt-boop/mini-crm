const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

function generateToken(admin) {
  return jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '7d',
  });
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Admin already exists' });
    const admin = await Admin.create({ name, email, password });
    res.status(201).json({ token: generateToken(admin), admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
    const isMatch = await admin.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ token: generateToken(admin), admin: { id: admin._id, name: admin.name, email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
