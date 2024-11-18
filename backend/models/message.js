// models/message.js
class Message {
    constructor(id, announcementId, message, author, date) {
      this.id = id;
      this.announcementId = announcementId;
      this.message = message;
      this.author = author;
      this.date = date;
    }
  
    static create(announcementId, message, author) {
      const id = messages.length + 1;
      const date = new Date().toISOString();
      const newMessage = new Message(id, announcementId, message, author, date);
      messages.push(newMessage);
      return newMessage;
    }
  
    static findById(id) {
      return messages.find(m => m.id === parseInt(id));
    }
  
    static findByAnnouncementId(announcementId) {
      return messages.filter(m => m.announcementId === parseInt(announcementId));
    }
  
    static update(id, message, author) {
      const msg = this.findById(id);
      if (msg) {
        msg.message = message || msg.message;
        msg.author = author || msg.author;
        return msg;
      }
      return null;
    }
  
    static delete(id) {
      const index = messages.findIndex(m => m.id === parseInt(id));
      if (index !== -1) {
        messages.splice(index, 1);
        return true;
      }
      return false;
    }
  }
  
  module.exports = Message;
  