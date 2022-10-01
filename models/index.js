const User = require("./Users");
const Movies = require("./Movies")
const Messages = require("./Messages")

User.belongsToMany(Movies, { through: "favorites_movies" });
Movies.belongsToMany(User, { through: "favorites_movies" });

// User.hasMany(Messages)
// Messages.belongsToMany(User , { through: "user_chats" })

module.exports = { User , Movies, Messages };
