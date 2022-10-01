const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Messages extends Model {}

Messages.init(
  {
    message: {
      type: DataTypes.JSON,
    },

    users: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },

    sender: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  { sequelize: db, modelName: "messages" }
);

module.exports = Messages;
