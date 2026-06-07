const express = require('express');
const router = express.Router();
const { validateContact } = require('../middlewares/validate');
const nodemailer = require('nodemailer');
const pool = require('../config/db');

// Helper to create transporter: prefer env SMTP, otherwise use Ethereal test account
async function createTransporter() {
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    return { transporter: nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    }), test: false, defaultTo: process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || process.env.SMTP_FROM };
  }

  // fallback: create Ethereal test account
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    }
  });

  return { transporter, test: true, defaultTo: testAccount.user };
}

router.post('/', validateContact, async (req, res) => {
  const { name, email, phone, subject, message, category } = req.body;

  // send email (use configured SMTP or Ethereal test account)
  const { transporter, test: isTest, defaultTo: transporterDefaultTo } = await createTransporter();

  const defaultTo = process.env.CONTACT_TO_EMAIL || transporterDefaultTo || null;

  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER || undefined,
    to: process.env.CONTACT_TO_EMAIL || defaultTo || email,
    subject: `Portfolio Contact Form: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\nCategory: ${category || 'General'}\n\nMessage:\n${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    if (isTest && info && nodemailer.getTestMessageUrl) {
      console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    }
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
