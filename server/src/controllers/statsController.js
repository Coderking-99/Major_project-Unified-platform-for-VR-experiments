const { User, Apk, Download } = require('../models/store');

const getAdminOverview = async (req, res) => {
  try {
    const totalClients = await User.count({ role: 'CLIENT' });
    const totalApks = await Apk.count();
    const publishedApks = await Apk.count({ status: 'published' });
    const totalDownloads = await Download.count();

    const allApks = await Apk.findAll();
    const recentUploads = allApks.slice(0, 5);

    const recentDownloads = await Download.findAll(5);

    res.json({
      success: true,
      stats: {
        totalClients,
        totalApks,
        publishedApks,
        totalDownloads,
        recentUploads,
        recentDownloads
      }
    });
  } catch (error) {
    console.error('Get admin overview stats error:', error);
    res.status(500).json({ success: false, message: 'Server error loading dashboard metrics.' });
  }
};

module.exports = {
  getAdminOverview
};
