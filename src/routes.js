const router = require('express').Router();
const mongoose = require('mongoose');

const Mail = require('./models/mail.model');

router.post('/mails', async (req, res) => {
  const { name, email, subject, content } = req.body;

  if (!name || !email || !content) {
    res.status(400).json({ success: false, message: 'Missing information' });
    return;
  }

  try {
    const mail = new Mail({
      id: new mongoose.Types.ObjectId(),
      name,
      email,
      subject: subject ? subject : '',
      content,
    });
    await mail.save();

    res.status(201).json({
      success: true,
      message: 'Thanks for your message',
      mail,
    });
  } catch (error) {
    res.status(500).json({ error });
    return;
  }
});

module.exports = router;
