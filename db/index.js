require('dotenv').config()
const Sequelize = require("sequelize")

const db = new Sequelize("butterflix", "nan", "8PglUPlvoqIqUXJvJK5rvPOnY4h0rH9L", {
  host: 'dpg-ccrns5ien0hinujvijdg-a',
  dialect: 'postgres',
  logging: false
});

module.exports = db;