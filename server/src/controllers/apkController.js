const path = require('path');
const fs = require('fs');
const { Apk } = require('../models/store');

// Upload a new Unity APK (Owner only)
const uploadApk = async (req, res) => {
  try {
    const { projectName, apkName, description, version, unityVersion, status } = req.body;

    if (!projectName || !apkName) {
      return res.status(400).json({
        success: false,
        message: 'Project name and APK name are required fields.'
      });
    }

    if (!req.files || !req.files.apkFile || req.files.apkFile.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Unity .apk file is required.'
      });
    }

    const apkFile = req.files.apkFile[0];
    const thumbnailFile = req.files.thumbnail && req.files.thumbnail.length > 0
      ? req.files.thumbnail[0]
      : null;

    const newApk = await Apk.create({
      projectName: projectName.trim(),
      apkName: apkName.trim(),
      description: description ? description.trim() : '',
      version: version ? version.trim() : '1.0.0',
      unityVersion: unityVersion ? unityVersion.trim() : '2022.3 LTS',
      fileName: apkFile.filename,
      originalName: apkFile.originalname,
      fileSize: apkFile.size,
      storagePath: apkFile.path,
      thumbnail: thumbnailFile ? `/storage/thumbnails/${thumbnailFile.filename}` : '',
      status: status === 'unpublished' ? 'unpublished' : 'published',
      uploadedBy: req.user.username || 'OWNER',
      downloadCount: 0
    });

    res.status(201).json({
      success: true,
      message: 'Unity 2022 APK uploaded and registered successfully.',
      apk: newApk
    });
  } catch (error) {
    console.error('Upload APK error:', error);
    res.status(500).json({ success: false, message: 'Server error during APK upload.' });
  }
};

// Get all APKs (Admin overview)
const getAllApks = async (req, res) => {
  try {
    const apks = await Apk.findAll();
    res.json({
      success: true,
      count: apks.length,
      apks
    });
  } catch (error) {
    console.error('Get all APKs error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching APKs.' });
  }
};

// Get single APK details
const getApkById = async (req, res) => {
  try {
    const { id } = req.params;
    const apk = await Apk.findById(id);

    if (!apk) {
      return res.status(404).json({ success: false, message: 'APK not found.' });
    }

    res.json({ success: true, apk });
  } catch (error) {
    console.error('Get APK by ID error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Update APK metadata
const updateApk = async (req, res) => {
  try {
    const { id } = req.params;
    const { projectName, apkName, description, version, unityVersion, status } = req.body;

    const existing = await Apk.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'APK not found.' });
    }

    const updates = {};
    if (projectName !== undefined) updates.projectName = projectName.trim();
    if (apkName !== undefined) updates.apkName = apkName.trim();
    if (description !== undefined) updates.description = description.trim();
    if (version !== undefined) updates.version = version.trim();
    if (unityVersion !== undefined) updates.unityVersion = unityVersion.trim();
    if (status !== undefined) updates.status = status;

    if (req.files && req.files.thumbnail && req.files.thumbnail.length > 0) {
      updates.thumbnail = `/storage/thumbnails/${req.files.thumbnail[0].filename}`;
    }

    if (req.files && req.files.apkFile && req.files.apkFile.length > 0) {
      const newFile = req.files.apkFile[0];
      // Clean up old file if exists
      if (existing.storagePath && fs.existsSync(existing.storagePath)) {
        try { fs.unlinkSync(existing.storagePath); } catch (_) {}
      }
      updates.fileName = newFile.filename;
      updates.originalName = newFile.originalname;
      updates.fileSize = newFile.size;
      updates.storagePath = newFile.path;
    }

    const updated = await Apk.updateById(id, updates);

    res.json({
      success: true,
      message: 'APK information updated successfully.',
      apk: updated
    });
  } catch (error) {
    console.error('Update APK error:', error);
    res.status(500).json({ success: false, message: 'Server error updating APK.' });
  }
};

// Toggle publish / unpublish status
const togglePublishStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Apk.findById(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: 'APK not found.' });
    }

    const newStatus = existing.status === 'published' ? 'unpublished' : 'published';
    const updated = await Apk.updateById(id, { status: newStatus });

    res.json({
      success: true,
      message: `APK is now ${newStatus}.`,
      apk: updated
    });
  } catch (error) {
    console.error('Toggle publish status error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// Delete APK (Removes record and disk file)
const deleteApk = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await Apk.findById(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: 'APK not found.' });
    }

    // Delete disk file
    if (existing.storagePath && fs.existsSync(existing.storagePath)) {
      try {
        fs.unlinkSync(existing.storagePath);
      } catch (err) {
        console.warn('Could not remove file from disk:', err.message);
      }
    }

    await Apk.deleteById(id);

    res.json({
      success: true,
      message: `APK "${existing.projectName}" deleted successfully.`
    });
  } catch (error) {
    console.error('Delete APK error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting APK.' });
  }
};

module.exports = {
  uploadApk,
  getAllApks,
  getApkById,
  updateApk,
  togglePublishStatus,
  deleteApk
};
