const { v4: uuidv4 } = require('uuid');
const { isMongoConnected, readData, writeData } = require('../config/db');
const { MongoUser, MongoApk, MongoDownload, MongoContact } = require('./schemas');

// ================= USER REPOSITORY =================
const User = {
  async findById(id) {
    if (isMongoConnected()) {
      return await MongoUser.findOne({ id }).lean();
    }
    const data = readData();
    return data.users.find(u => u.id === id) || null;
  },

  async findByUsername(username) {
    if (isMongoConnected()) {
      return await MongoUser.findOne({ username: new RegExp(`^${username}$`, 'i') }).lean();
    }
    const data = readData();
    return data.users.find(u => u.username.toLowerCase() === username.toLowerCase()) || null;
  },

  async findAll(filter = {}) {
    if (isMongoConnected()) {
      const query = {};
      if (filter.role) query.role = filter.role;
      if (filter.status) query.status = filter.status;
      return await MongoUser.find(query).sort({ createdAt: -1 }).lean();
    }
    const data = readData();
    let result = [...data.users];
    if (filter.role) result = result.filter(u => u.role === filter.role);
    if (filter.status) result = result.filter(u => u.status === filter.status);
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async create(userObj) {
    const newUser = {
      id: userObj.id || uuidv4(),
      username: userObj.username,
      passwordHash: userObj.passwordHash,
      role: userObj.role || 'CLIENT',
      status: userObj.status || 'active',
      mustChangePassword: !!userObj.mustChangePassword,
      createdAt: userObj.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isMongoConnected()) {
      const doc = new MongoUser(newUser);
      await doc.save();
      return doc.toObject();
    }

    const data = readData();
    data.users.push(newUser);
    writeData(data);
    return newUser;
  },

  async updateById(id, updates) {
    updates.updatedAt = new Date().toISOString();
    if (isMongoConnected()) {
      return await MongoUser.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    }
    const data = readData();
    const index = data.users.findIndex(u => u.id === id);
    if (index === -1) return null;
    data.users[index] = { ...data.users[index], ...updates };
    writeData(data);
    return data.users[index];
  },

  async deleteById(id) {
    if (isMongoConnected()) {
      const res = await MongoUser.deleteOne({ id });
      return res.deletedCount > 0;
    }
    const data = readData();
    const initialLen = data.users.length;
    data.users = data.users.filter(u => u.id !== id);
    writeData(data);
    return data.users.length < initialLen;
  },

  async count(filter = {}) {
    if (isMongoConnected()) {
      const query = {};
      if (filter.role) query.role = filter.role;
      return await MongoUser.countDocuments(query);
    }
    const data = readData();
    let list = data.users;
    if (filter.role) list = list.filter(u => u.role === filter.role);
    return list.length;
  }
};

// ================= APK REPOSITORY =================
const Apk = {
  async findById(id) {
    if (isMongoConnected()) {
      return await MongoApk.findOne({ id }).lean();
    }
    const data = readData();
    return data.apks.find(a => a.id === id) || null;
  },

  async findAll(filter = {}) {
    if (isMongoConnected()) {
      const query = {};
      if (filter.status) query.status = filter.status;
      return await MongoApk.find(query).sort({ createdAt: -1 }).lean();
    }
    const data = readData();
    let result = [...data.apks];
    if (filter.status) result = result.filter(a => a.status === filter.status);
    return result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async create(apkObj) {
    const newApk = {
      id: apkObj.id || uuidv4(),
      projectName: apkObj.projectName,
      apkName: apkObj.apkName,
      description: apkObj.description || '',
      version: apkObj.version || '1.0.0',
      unityVersion: apkObj.unityVersion || '2022.3 LTS',
      fileName: apkObj.fileName,
      originalName: apkObj.originalName || apkObj.fileName,
      fileSize: apkObj.fileSize,
      storagePath: apkObj.storagePath,
      thumbnail: apkObj.thumbnail || '',
      status: apkObj.status || 'published',
      uploadedBy: apkObj.uploadedBy || 'OWNER',
      downloadCount: apkObj.downloadCount || 0,
      createdAt: apkObj.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (isMongoConnected()) {
      const doc = new MongoApk(newApk);
      await doc.save();
      return doc.toObject();
    }

    const data = readData();
    data.apks.push(newApk);
    writeData(data);
    return newApk;
  },

  async updateById(id, updates) {
    updates.updatedAt = new Date().toISOString();
    if (isMongoConnected()) {
      return await MongoApk.findOneAndUpdate({ id }, { $set: updates }, { new: true }).lean();
    }
    const data = readData();
    const index = data.apks.findIndex(a => a.id === id);
    if (index === -1) return null;
    data.apks[index] = { ...data.apks[index], ...updates };
    writeData(data);
    return data.apks[index];
  },

  async deleteById(id) {
    if (isMongoConnected()) {
      const res = await MongoApk.deleteOne({ id });
      return res.deletedCount > 0;
    }
    const data = readData();
    const initialLen = data.apks.length;
    data.apks = data.apks.filter(a => a.id !== id);
    writeData(data);
    return data.apks.length < initialLen;
  },

  async incrementDownload(id) {
    if (isMongoConnected()) {
      return await MongoApk.findOneAndUpdate({ id }, { $inc: { downloadCount: 1 } }, { new: true }).lean();
    }
    const data = readData();
    const item = data.apks.find(a => a.id === id);
    if (item) {
      item.downloadCount = (item.downloadCount || 0) + 1;
      writeData(data);
      return item;
    }
    return null;
  },

  async count(filter = {}) {
    if (isMongoConnected()) {
      const query = {};
      if (filter.status) query.status = filter.status;
      return await MongoApk.countDocuments(query);
    }
    const data = readData();
    let list = data.apks;
    if (filter.status) list = list.filter(a => a.status === filter.status);
    return list.length;
  }
};

// ================= DOWNLOAD AUDIT REPOSITORY =================
const Download = {
  async create(dlObj) {
    const newDownload = {
      id: dlObj.id || uuidv4(),
      userId: dlObj.userId,
      username: dlObj.username,
      apkId: dlObj.apkId,
      projectName: dlObj.projectName,
      apkVersion: dlObj.apkVersion || '1.0.0',
      ipAddress: dlObj.ipAddress || '127.0.0.1',
      userAgent: dlObj.userAgent || '',
      downloadedAt: dlObj.downloadedAt || new Date().toISOString()
    };

    if (isMongoConnected()) {
      const doc = new MongoDownload(newDownload);
      await doc.save();
      return doc.toObject();
    }

    const data = readData();
    data.downloads.push(newDownload);
    writeData(data);
    return newDownload;
  },

  async findAll(limit = 100) {
    if (isMongoConnected()) {
      return await MongoDownload.find().sort({ downloadedAt: -1 }).limit(limit).lean();
    }
    const data = readData();
    return [...data.downloads]
      .sort((a, b) => new Date(b.downloadedAt) - new Date(a.downloadedAt))
      .slice(0, limit);
  },

  async count() {
    if (isMongoConnected()) {
      return await MongoDownload.countDocuments();
    }
    const data = readData();
    return data.downloads.length;
  },

  async findByUserId(userId) {
    if (isMongoConnected()) {
      return await MongoDownload.find({ userId }).sort({ downloadedAt: -1 }).lean();
    }
    const data = readData();
    return data.downloads
      .filter(d => d.userId === userId)
      .sort((a, b) => new Date(b.downloadedAt) - new Date(a.downloadedAt));
  }
};

// ================= CONTACT MESSAGES REPOSITORY =================
const Contact = {
  async create(contactObj) {
    const newContact = {
      id: contactObj.id || uuidv4(),
      name: contactObj.name,
      email: contactObj.email,
      subject: contactObj.subject || '',
      message: contactObj.message,
      createdAt: new Date().toISOString()
    };

    if (isMongoConnected()) {
      const doc = new MongoContact(newContact);
      await doc.save();
      return doc.toObject();
    }

    const data = readData();
    data.contacts.push(newContact);
    writeData(data);
    return newContact;
  },

  async findAll() {
    if (isMongoConnected()) {
      return await MongoContact.find().sort({ createdAt: -1 }).lean();
    }
    const data = readData();
    return [...data.contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
};

module.exports = {
  User,
  Apk,
  Download,
  Contact
};
