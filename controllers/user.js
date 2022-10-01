const { User, Movies } = require("../models");

exports.profile = (req, res) => {
  const userId = req.user.id;

  User.update(req.body, {
    where: { id: userId },
    returning: true,
  }).then(() => res.sendStatus(204));
};

exports.changePassword = (req, res) => {
  const userId = req.user.id;

  User.update(req.body, {
    where: { id: userId },
    returning: true,
    individualHooks: true,
  }).then(() => res.sendStatus(204));
};

exports.users = (req, res) => {
  User.findAll({
    include: {
      model: Movies,
    },
  }).then((users) => res.send(users));
};

exports.user = (req, res) => {
  const { id } = req.params;

  User.findOne({
    where: { id: id },
    include: {
      model: Movies,
    },
  }).then((user) => res.send(user));
};

exports.searchUser = (req,res) => {
  const { name } = req.query
  User.findAll({
    where:{name:name}
  }).then(users => res.send(users))
}