const path = require('path');
const fs = require('fs');
const { Apk, Download } = require('../models/store');

// Client: Get all published APKs
const getClientApks = async (req, res) => {
  try {
    const publishedApks = await Apk.findAll({ status: 'published' });

    // Sanitize output - never expose internal absolute storage paths
    const sanitized = publishedApks.map(apk => ({
      id: apk.id,
      projectName: apk.projectName,
      apkName: apk.apkName,
      description: apk.description,
      version: apk.version,
      unityVersion: apk.unityVersion,
      fileSize: apk.fileSize,
      thumbnail: apk.thumbnail,
      downloadCount: apk.downloadCount,
      createdAt: apk.createdAt,
      updatedAt: apk.updatedAt
    }));

    res.json({
      success: true,
      count: sanitized.length,
      apks: sanitized
    });
  } catch (error) {
    console.error('Get client APKs error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching applications.' });
  }
};

// Secure APK download endpoint
const downloadApk = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    // 1. Verify user is authenticated
    if (!user) {
      return res.status(401).json({ success: false, message: 'Authentication required to download APKs.' });
    }

    // 2. Fetch APK
    const apk = await Apk.findById(id);
    if (!apk) {
      return res.status(404).json({ success: false, message: 'Requested APK not found.' });
    }

    // 3. If client, check that APK is published
    if (user.role === 'CLIENT' && apk.status !== 'published') {
      return res.status(403).json({
        success: false,
        message: 'This application is currently not available for download.'
      });
    }

    // 4. Verify physical file exists on disk
    if (!apk.storagePath || !fs.existsSync(apk.storagePath)) {
      return res.status(404).json({
        success: false,
        message: 'APK binary file is missing from server storage. Please contact the administrator.'
      });
    }

    // 5. Record download audit record
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const userAgent = req.headers['user-agent'] || 'Unknown';

    await Download.create({
      userId: user.id,
      username: user.username,
      apkId: apk.id,
      projectName: apk.projectName,
      apkVersion: apk.version,
      ipAddress: clientIp,
      userAgent
    });

    // 6. Increment download count
    await Apk.incrementDownload(apk.id);

    // 7. Stream file download securely
    const downloadFileName = apk.originalName || `${apk.projectName.replace(/\s+/g, '_')}_v${apk.version}.apk`;
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    res.setHeader('Content-Disposition', `attachment; filename="${downloadFileName}"`);
    res.setHeader('Content-Length', apk.fileSize);

    const fileStream = fs.createReadStream(apk.storagePath);
    fileStream.pipe(res);
  } catch (error) {
    console.error('Download APK error:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, message: 'Server error initiating download.' });
    }
  }
};

// Admin: Get all download history logs
const getAllDownloads = async (req, res) => {
  try {
    const downloads = await Download.findAll(200);
    res.json({
      success: true,
      count: downloads.length,
      downloads
    });
  } catch (error) {
    console.error('Get all downloads error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching download logs.' });
  }
};

module.exports = {
  getClientApks,
  downloadApk,
  getAllDownloads
};
