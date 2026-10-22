const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['OWNER', 'CLIENT'], default: 'CLIENT' },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  mustChangePassword: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ApkSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  projectName: { type: String, required: true },
  apkName: { type: String, required: true },
  description: { type: String, default: '' },
  version: { type: String, default: '1.0.0' },
  unityVersion: { type: String, default: '2022.3 LTS' },
  fileName: { type: String, required: true },
  originalName: { type: String },
  fileSize: { type: Number, required: true },
  storagePath: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  status: { type: String, enum: ['published', 'unpublished'], default: 'published' },
  uploadedBy: { type: String, default: 'OWNER' },
  downloadCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const DownloadSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  userId: { type: String, required: true },
  username: { type: String, required: true },
  apkId: { type: String, required: true },
  projectName: { type: String, required: true },
  apkVersion: { type: String },
  ipAddress: { type: String },
  userAgent: { type: String },
  downloadedAt: { type: Date, default: Date.now }
});

const ContactSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, default: '' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const MongoUser = mongoose.model('User', UserSchema);
const MongoApk = mongoose.model('Apk', ApkSchema);
const MongoDownload = mongoose.model('Download', DownloadSchema);
const MongoContact = mongoose.model('Contact', ContactSchema);

module.exports = {
  MongoUser,
  MongoApk,
  MongoDownload,
  MongoContact
};
