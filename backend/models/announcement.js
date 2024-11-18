const mongoose = require('mongoose');

// Define the announcement schema
const announcementSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
