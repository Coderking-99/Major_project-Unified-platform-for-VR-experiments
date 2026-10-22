const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const { getClientApks, downloadApk } = require('../controllers/downloadController');

// Client routes allow CLIENT (and OWNER if previewing)
router.use(authenticate, requireRole('CLIENT', 'OWNER'));

// View all published APK applications
router.get('/apks', getClientApks);

// Secure APK streaming download
router.get('/apks/:id/download', downloadApk);

module.exports = router;
