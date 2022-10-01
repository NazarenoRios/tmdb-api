const { User, Movies } = require("../models");

exports.addFavorite = (req, res) => {
  const { userId, code, title, poster_path, vote_average, release_date } = req.query;
  User.findByPk(userId).then((user) => {
    Movies.findOrCreate({
      where: {
        code: code,
        title: title,
        poster_path: poster_path,
        raiting: vote_average,
        release_date: release_date
      },
    }).then((movie) => {
      user.addMovies(movie[0].dataValues.id);
    });
  });
};

exports.removeFavorite = (req, res) => {
  const { userId, code } = req.query;
  User.findByPk(userId).then((user) => {
    Movies.findOne({
      where: {
        code: code,
      },
    }).then((movie) => {
      user.removeMovies(movie);
    });
  });
};

exports.getFavorite = (req, res) => {
  const { userId } = req.query;
  User.findByPk(userId).then((user) => {
    user.getMovies()
        .then((movies) => res.send(movies));
  });
};

