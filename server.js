const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Contact route is implemented in ./routes/contact.js which handles sending email and persisting messages

// Mount routes
const contactRouter = require('./routes/contact');
const authRouter = require('./routes/auth');

app.use('/api/contact', contactRouter);
app.use('/api/auth', authRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
