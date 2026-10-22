const bcrypt = require('bcryptjs');
const { User, Download } = require('../models/store');

// List all client accounts (Owner only)
const getAllClients = async (req, res) => {
  try {
    const clients = await User.findAll({ role: 'CLIENT' });

    // Sanitize and attach download counts
    const sanitized = await Promise.all(
      clients.map(async (client) => {
        const userDownloads = await Download.findByUserId(client.id);
        return {
          id: client.id,
          username: client.username,
          role: client.role,
          status: client.status,
          mustChangePassword: client.mustChangePassword,
          downloadCount: userDownloads.length,
          createdAt: client.createdAt,
          updatedAt: client.updatedAt
        };
      })
    );

    res.json({
      success: true,
      count: sanitized.length,
      clients: sanitized
    });
  } catch (error) {
    console.error('Get all clients error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching clients.' });
  }
};

// Create a new client account (Owner only)
const createClient = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and temporary password are required.'
      });
    }

    const cleanUsername = username.trim();
    if (cleanUsername.length < 3) {
      return res.status(400).json({
        success: false,
        message: 'Username must be at least 3 characters long.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Temporary password must be at least 6 characters long.'
      });
    }

    // Check uniqueness
    const existing = await User.findByUsername(cleanUsername);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Username "${cleanUsername}" is already taken.`
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newClient = await User.create({
      username: cleanUsername,
      passwordHash,
      role: 'CLIENT',
      status: 'active',
      mustChangePassword: true
    });

    res.status(201).json({
      success: true,
      message: `Client "${cleanUsername}" created successfully.`,
      client: {
        id: newClient.id,
        username: newClient.username,
        role: newClient.role,
        status: newClient.status,
        mustChangePassword: newClient.mustChangePassword,
        createdAt: newClient.createdAt
      }
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({ success: false, message: 'Server error creating client account.' });
  }
};

// Toggle client status (activate / deactivate)
const toggleClientStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await User.findById(id);

    if (!client || client.role !== 'CLIENT') {
      return res.status(404).json({ success: false, message: 'Client account not found.' });
    }

    const newStatus = client.status === 'active' ? 'inactive' : 'active';
    const updated = await User.updateById(id, { status: newStatus });

    res.json({
      success: true,
      message: `Client "${client.username}" is now ${newStatus}.`,
      client: {
        id: updated.id,
        username: updated.username,
        status: updated.status
      }
    });
  } catch (error) {
    console.error('Toggle client status error:', error);
    res.status(500).json({ success: false, message: 'Server error updating status.' });
  }
};

// Reset client password
const resetClientPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.'
      });
    }

    const client = await User.findById(id);
    if (!client || client.role !== 'CLIENT') {
      return res.status(404).json({ success: false, message: 'Client account not found.' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await User.updateById(id, {
      passwordHash,
      mustChangePassword: true
    });

    res.json({
      success: true,
      message: `Password reset successfully for client "${client.username}".`
    });
  } catch (error) {
    console.error('Reset client password error:', error);
    res.status(500).json({ success: false, message: 'Server error resetting password.' });
  }
};

// Delete client account
const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await User.findById(id);

    if (!client || client.role !== 'CLIENT') {
      return res.status(404).json({ success: false, message: 'Client account not found.' });
    }

    await User.deleteById(id);

    res.json({
      success: true,
      message: `Client "${client.username}" deleted successfully.`
    });
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({ success: false, message: 'Server error deleting client.' });
  }
};

// View client download activity
const getClientDownloads = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await User.findById(id);

    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found.' });
    }

    const history = await Download.findByUserId(id);

    res.json({
      success: true,
      client: {
        id: client.id,
        username: client.username
      },
      downloads: history
    });
  } catch (error) {
    console.error('Get client downloads error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching downloads.' });
  }
};

module.exports = {
  getAllClients,
  createClient,
  toggleClientStatus,
  resetClientPassword,
  deleteClient,
  getClientDownloads
};
