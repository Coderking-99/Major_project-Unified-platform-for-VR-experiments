require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');
const { connectDB } = require('../config/db');
const { User, Apk } = require('../models/store');

const APK_STORAGE_DIR = path.join(__dirname, '../../storage/apks');
const THUMB_STORAGE_DIR = path.join(__dirname, '../../storage/thumbnails');

[APK_STORAGE_DIR, THUMB_STORAGE_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

async function seedDatabase() {
  console.log('🌱 Starting database seed verification...');
  await connectDB();

  // 1. Seed Owner Account
  const ownerUsername = process.env.INITIAL_OWNER_USERNAME || 'OWNER';
  const ownerPassword = process.env.INITIAL_OWNER_PASSWORD || 'owner@123';

  let owner = await User.findByUsername(ownerUsername);
  if (!owner) {
    console.log(`🔐 Seeding initial OWNER account: "${ownerUsername}"...`);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(ownerPassword, salt);

    owner = await User.create({
      username: ownerUsername,
      passwordHash,
      role: 'OWNER',
      status: 'active',
      mustChangePassword: true
    });
    console.log(`✅ Initial OWNER account created successfully.`);
  } else {
    console.log(`ℹ️  OWNER account "${ownerUsername}" already exists.`);
  }

  // 2. Seed Demo Client Account
  const demoClientUsername = 'client_demo';
  let demoClient = await User.findByUsername(demoClientUsername);
  if (!demoClient) {
    console.log(`👤 Seeding demo CLIENT account: "${demoClientUsername}"...`);
    const salt = await bcrypt.genSalt(10);
    const clientHash = await bcrypt.hash('client@123', salt);

    demoClient = await User.create({
      username: demoClientUsername,
      passwordHash: clientHash,
      role: 'CLIENT',
      status: 'active',
      mustChangePassword: false
    });
    console.log(`✅ Demo CLIENT account created.`);
  }

  // 3. Seed Sample Unity 2022 APKs
  const existingApks = await Apk.findAll();
  if (existingApks.length === 0) {
    console.log('📦 Seeding initial Unity 2022 APK sample applications...');

    const sampleApks = [
      {
        projectName: 'Human Heart Blood Circulation',
        apkName: 'HeartCirculation_VR',
        description: 'Interactive 3D cardiovascular simulation for Meta Quest 2/3 and Pro. Explore ventricles, valves, oxygenation flows, and cardiac cycles in real-time VR.',
        version: '1.0.0',
        unityVersion: '2022.3 LTS',
        status: 'published',
        fileName: 'HeartCirculation_VR_v1.0.0.apk',
        fileSize: 45200000, // ~43 MB
        downloadCount: 18
      },
      {
        projectName: 'Physics Virtual Laboratory',
        apkName: 'PhysicsVR_Lab',
        description: 'Comprehensive Newtonian mechanics, optics, projectile motion, and electromagnetism virtual experiments built with Unity XR Interaction Toolkit.',
        version: '1.2.0',
        unityVersion: '2022.3 LTS',
        status: 'published',
        fileName: 'PhysicsVR_Lab_v1.2.0.apk',
        fileSize: 68500000, // ~65 MB
        downloadCount: 34
      },
      {
        projectName: 'Magnetic Field Simulation',
        apkName: 'MagneticFields_MR',
        description: 'Mixed Reality electromagnetic vector field visualization. Place physical bar magnets and observe 3D flux lines and Lorentz force vectors.',
        version: '1.0.1',
        unityVersion: '2022.3 LTS',
        status: 'published',
        fileName: 'MagneticFields_MR_v1.0.1.apk',
        fileSize: 38400000, // ~36 MB
        downloadCount: 12
      },
      {
        projectName: 'AI & Robotics Experience',
        apkName: 'RoboticsAI_Sim',
        description: '6-DOF robotic arm inverse kinematics and computer vision sorting simulation built for Oculus Quest with real-time AI obstacle avoidance.',
        version: '2.0.0',
        unityVersion: '2022.3 LTS',
        status: 'published',
        fileName: 'RoboticsAI_Sim_v2.0.0.apk',
        fileSize: 82100000, // ~78 MB
        downloadCount: 27
      }
    ];

    for (const sample of sampleApks) {
      // Create mock binary file if not present on disk so downloads succeed smoothly
      const diskPath = path.join(APK_STORAGE_DIR, sample.fileName);
      if (!fs.existsSync(diskPath)) {
        // Write mock binary header with Unity APK package marker
        const dummyBuffer = Buffer.alloc(1024 * 64); // 64KB sample binary
        dummyBuffer.write('PK\x03\x04Unity2022_Android_Package_Sample');
        fs.writeFileSync(diskPath, dummyBuffer);
      }

      await Apk.create({
        ...sample,
        storagePath: diskPath,
        originalName: sample.fileName,
        uploadedBy: 'OWNER'
      });
    }
    console.log(`✅ Sample Unity 2022 APK applications seeded successfully.`);
  }

  console.log('🎉 Seed verification complete.');
}

// If run directly via node
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('Seed error:', err);
      process.exit(1);
    });
}

module.exports = seedDatabase;
