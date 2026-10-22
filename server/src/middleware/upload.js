const multer = require('multer');
const path = require('path');
const fs = require('fs');

const APK_STORAGE_DIR = path.join(__dirname, '../../storage/apks');
const THUMB_STORAGE_DIR = path.join(__dirname, '../../storage/thumbnails');

// Ensure storage folders exist
[APK_STORAGE_DIR, THUMB_STORAGE_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'apkFile') {
      cb(null, APK_STORAGE_DIR);
    } else if (file.fieldname === 'thumbnail') {
      cb(null, THUMB_STORAGE_DIR);
    } else {
      cb(new Error('Unknown upload field: ' + file.fieldname), null);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, `${cleanBase}-${uniqueSuffix}${ext}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === 'apkFile') {
    // Validate APK extension
    if (ext === '.apk') {
      return cb(null, true);
    }
    return cb(new Error('Invalid file type for APK. Only .apk files generated from Unity 2022 are accepted.'));
  }

  if (file.fieldname === 'thumbnail') {
    // Validate image extension
    const allowedImages = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    if (allowedImages.includes(ext)) {
      return cb(null, true);
    }
    return cb(new Error('Invalid image type. Allowed: .jpg, .jpeg, .png, .webp, .gif'));
  }

  cb(new Error('Unexpected field: ' + file.fieldname));
};

const maxSizeBytes = (parseInt(process.env.MAX_FILE_SIZE_MB, 10) || 500) * 1024 * 1024;

const uploadApkAndThumbnail = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: maxSizeBytes
  }
}).fields([
  { name: 'apkFile', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

// Error handling wrapper middleware for multer
const handleUpload = (req, res, next) => {
  uploadApkAndThumbnail(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: `File too large. Maximum size allowed is ${process.env.MAX_FILE_SIZE_MB || 500}MB.`
        });
      }
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`
      });
    } else if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    next();
  });
};

module.exports = {
  handleUpload,
  APK_STORAGE_DIR,
  THUMB_STORAGE_DIR
};
