const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Movies extends Model {}

Movies.init(
  {
    code: {
      type: DataTypes.INTEGER
    },

    title : {
      type: DataTypes.STRING
    },

    poster_path: {
      type: DataTypes.STRING
    },

    raiting: {
      type: DataTypes.FLOAT
    },

    release_date: {
      type: DataTypes.STRING
    }

  },
  { sequelize: db, modelName: "movies" }
);


module.exports = Movies;
