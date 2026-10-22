const express = require('express');
const router = express.Router();
const { submitContact } = require('../controllers/contactController');

router.post('/contact', submitContact);
router.get('/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'AR/VR Innovation & Learning Platform API',
    unitySupport: 'Unity 2022.x LTS'
  });
});

module.exports = router;
