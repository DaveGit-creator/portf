const express = require('express');
const router = express.Router();
const { validateContact } = require('../middlewares/validate');
const nodemailer = require('nodemailer');
const pool = require('../config/db');

router.post('/', validateContact, async (req, res) => {
  const { name, email, phone, subject, message, category } = req.body;

  // send email
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL,
    subject: `Portfolio Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCategory: ${category || 'General'}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error('Mail error:', err);
    // continue to save message even if mail fails
  }

  // save message to database if available
  try {
    await pool.query(
      'INSERT INTO messages (name, email, phone, subject, message, category, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [name, email, phone || null, subject, message, category || null]
    );
  } catch (err) {
    console.warn('DB save warning:', err.message);
  }

  res.json({ success: true, message: 'Your message was received.' });
});

module.exports = router;
