const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Complaint = require('../models/Complaint');
const { protect } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

// Submit complaint (public or authenticated)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { isAnonymous, studentName, studentId, college, location, category, description } = req.body;
    const complaint = await Complaint.create({
      user: req.headers.authorization ? null : null,
      isAnonymous: isAnonymous === 'true',
      studentName: isAnonymous === 'true' ? 'Anonymous' : studentName,
      studentId: isAnonymous === 'true' ? '' : studentId,
      college, location, category, description,
      image: req.file ? req.file.filename : null
    });
    res.status(201).json({ success: true, complaintId: complaint.complaintId, message: 'Complaint submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get complaints for logged-in user
router.get('/my', protect, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Track by complaint ID (public)
router.get('/track/:complaintId', async (req, res) => {
  try {
    const complaint = await Complaint.findOne({ complaintId: req.params.complaintId });
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Public stats
router.get('/stats', async (req, res) => {
  try {
    const total = await Complaint.countDocuments();
    const resolved = await Complaint.countDocuments({ status: 'Resolved' });
    const pending = await Complaint.countDocuments({ status: 'Pending' });
    const underReview = await Complaint.countDocuments({ status: 'Under Review' });
    res.json({ total, resolved, pending, underReview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
