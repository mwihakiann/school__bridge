// routes/messageRoutes.js
const express = require("express");
const router = express.Router();

// Import the Message model (adjust path as necessary)
const Message = require("../models/message");

// Create new message
router.post("/", (req, res) => {
  const { announcementId, message, author } = req.body;

  if (!announcementId || !message || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newMessage = Message.create(announcementId, message, author);
  res.status(201).json({ message: "Message added successfully", newMessage });
});

// Get messages for a specific announcement
router.get("/:announcementId", (req, res) => {
  const { announcementId } = req.params;
  const msgs = Message.findByAnnouncementId(announcementId);

  if (!msgs.length) {
    return res.status(404).json({ message: "No messages found for this announcement" });
  }

  res.status(200).json(msgs);
});

// Update message
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { message, author } = req.body;

  const updatedMessage = Message.update(id, message, author);

  if (!updatedMessage) {
    return res.status(404).json({ message: "Message not found" });
  }

  res.status(200).json({ message: "Message updated", updatedMessage });
});

// Delete message
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deleted = Message.delete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Message not found" });
  }

  res.status(200).json({ message: "Message deleted" });
});

module.exports = router;
