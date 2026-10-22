const express = require('express');
const router = express.Router();
const { authenticate, requireOwner } = require('../middleware/auth');
const { handleUpload } = require('../middleware/upload');
const {
  uploadApk,
  getAllApks,
  getApkById,
  updateApk,
  togglePublishStatus,
  deleteApk
} = require('../controllers/apkController');
const {
  getAllClients,
  createClient,
  toggleClientStatus,
  resetClientPassword,
  deleteClient,
  getClientDownloads
} = require('../controllers/clientController');
const { getAllDownloads } = require('../controllers/downloadController');
const { getAdminOverview } = require('../controllers/statsController');
const { getContacts } = require('../controllers/contactController');

// All admin routes require valid token and OWNER role
router.use(authenticate, requireOwner);

// Overview metrics
router.get('/overview', getAdminOverview);

// APK Management
router.get('/apks', getAllApks);
router.post('/apks', handleUpload, uploadApk);
router.get('/apks/:id', getApkById);
router.put('/apks/:id', handleUpload, updateApk);
router.patch('/apks/:id/publish', togglePublishStatus);
router.delete('/apks/:id', deleteApk);

// Client Management
router.get('/clients', getAllClients);
router.post('/clients', createClient);
router.patch('/clients/:id/status', toggleClientStatus);
router.post('/clients/:id/reset-password', resetClientPassword);
router.delete('/clients/:id', deleteClient);
router.get('/clients/:id/downloads', getClientDownloads);

// Downloads & Analytics
router.get('/downloads', getAllDownloads);

// Contact Inquiries
router.get('/contacts', getContacts);

module.exports = router;
