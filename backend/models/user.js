const Sequelize = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
  dialect: 'mysql', // or other dialects like 'postgres', 'sqlite', etc.
  host: 'localhost',
  port: 3306
});

const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true, // Ensures email is unique
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;