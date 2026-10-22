const { Contact } = require('../models/store');

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim(),
      subject: subject ? subject.trim() : 'General Inquiry',
      message: message.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! Our AR/VR innovation team will get back to you shortly.',
      contactId: newContact.id
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    res.status(500).json({ success: false, message: 'Server error processing your message.' });
  }
};

const getContacts = async (req, res) => {
  try {
    const messages = await Contact.findAll();
    res.json({ success: true, count: messages.length, messages });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = {
  submitContact,
  getContacts
};
