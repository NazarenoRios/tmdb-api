const Sequelize = require("sequelize")

const db = new Sequelize("butterflix_fdhi", "butterflix_fdhi_user", "3d5f2B59bcX6OclQOfUQjXwMVbkY3JzA", {
  host: 'dpg-ccrr6sqen0hinuk41dqg-a',
  dialect: 'postgres',
  logging: false
});

module.exports = db;