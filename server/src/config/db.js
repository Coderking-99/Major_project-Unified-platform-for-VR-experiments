const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const DATA_FILE = path.join(__dirname, '../../data/store.json');

// Ensure data directory exists
const dataDir = path.dirname(DATA_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initial state for file-based fallback store
const defaultState = {
  users: [],
  apks: [],
  downloads: [],
  contacts: []
};

// Safe read / write for JSON fallback
function readData() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(defaultState, null, 2));
      return defaultState;
    }
    const content = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(content || '{}') || defaultState;
  } catch (err) {
    console.error('Error reading JSON store:', err.message);
    return defaultState;
  }
}

function writeData(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing JSON store:', err.message);
  }
}

let isMongoConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/arvr_platform';
  try {
    // Attempt MongoDB connection with 2-second timeout
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000
    });
    isMongoConnected = true;
    console.log('✅ MongoDB connected successfully at', uri);
  } catch (err) {
    isMongoConnected = false;
    console.log('ℹ️  MongoDB connection not detected (' + err.message + ').');
    console.log('✅ Using high-performance persistent JSON data store at: ' + DATA_FILE);
  }
}

module.exports = {
  connectDB,
  isMongoConnected: () => isMongoConnected,
  readData,
  writeData,
  DATA_FILE
};
