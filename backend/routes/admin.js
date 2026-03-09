const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const Contact = require('../models/Contact');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/auth');

// All complaints
router.get('/complaints', protect, adminOnly, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update status
router.put('/complaints/:id', protect, adminOnly, async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes, updatedAt: Date.now() },
      { new: true }
    );
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Stats
router.get('/stats', protect, adminOnly, async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const resolved = await Complaint.countDocuments({ status: 'Resolved' });
    const pending = await Complaint.countDocuments({ status: 'Pending' });
    const underReview = await Complaint.countDocuments({ status: 'Under Review' });
    const users = await User.countDocuments({ role: 'student' });
    const contacts = await Contact.countDocuments();
    res.json({ total, resolved, pending, underReview, users, contacts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// All contacts
router.get('/contacts', protect, adminOnly, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
