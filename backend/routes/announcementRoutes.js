const express = require('express');
const Announcement = require('../models/announcement');  // Make sure this is correct
const router = express.Router();

// Get all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching announcements' });
  }
});

module.exports = router;
