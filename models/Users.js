const { DataTypes, Model } = require("sequelize");
const db = require("../db");

const bcrypt = require("bcrypt");

class User extends Model {

  hashedPassword(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
    return bcrypt
      .hash(password, this.salt)
      .then((hash) => hash === this.password);
  }
}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    salt: {
      type: DataTypes.STRING,
    },

    lastActivity: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    }, 

    pic: {
      type: DataTypes.TEXT,
      defaultValue:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    }
  },
  { sequelize: db, modelName: "users" }
);

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;

  return user.hashedPassword(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

User.beforeUpdate((user) => {
  const salt = bcrypt.genSaltSync();
  user.salt = salt;

  return user.hashedPassword(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
})

module.exports = User;
