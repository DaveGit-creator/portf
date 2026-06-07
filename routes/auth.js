const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { generateToken } = require('../middlewares/auth');

// Simple login that checks a users table (passwords stored in plaintext for demo only)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Missing credentials' });

  try {
    const [rows] = await pool.query('SELECT id, email, password_hash FROM users WHERE email = ?', [email]);
    if (!rows || rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    const user = rows[0];
    // In a real app verify hashed password. Here we accept exact match with password_hash for demo
    if (user.password_hash !== password) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken({ id: user.id, email: user.email });
    res.json({ token });
  } catch (err) {
    console.error('Auth error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
