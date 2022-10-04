const { User, Movies } = require("../models");
const tokens = require("../config/tokens");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "860870041014-ouinu3c3c7162n61tuqnlubvrv7dlv3i.apps.googleusercontent.com"
);

exports.register = (req, res) => {
  const user = req.body;
  User.create(user).then(() => {
    console.log(user)
    res.sendStatus(201)
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    where: { email: email },
    include: {
      model: Movies,
    },
  }).then((user) => {
    if (!user) return res.send(401);

    user.validatePassword(password).then((isValid) => {
      if (!isValid) return res.send(401);

      const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        pic: user.pic
      };
      const token = tokens.generateToken(payload);
      res.cookie("token", token);
      res.status(201).send(token);
      console.log(user)
    });
  });
};

exports.validation = (req, res) => {
  console.log(req.user)
  res.send(req.user);
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
};

exports.googlelogin = (req, res) => {
  const { credential } = req.body;

  client
    .verifyIdToken({
      idToken: credential,
      audience:
        "860870041014-ouinu3c3c7162n61tuqnlubvrv7dlv3i.apps.googleusercontent.com",
    })
    .then((userInfo) => {
      const { email, given_name, family_name } = userInfo.payload;

      let password = email + email;

      User.findOne({
        where: { email: email },
        include: {
          model: Movies,
        },
      }).then((user) => {
        if (!user) {
          return User.create({email: email, password: password, name: given_name, lastname: family_name})
            .then((user) => {
              user.validatePassword(password).then((isValid) => {
                if (!isValid) return res.send(401);

                const payload = {
                  id: user.id,
                  email: user.email,
                  name: user.name,
                  lastname: user.lastname,
                };
                const token = tokens.generateToken(payload);
                res.cookie("token", token);
                res.sendStatus(201);
              })
            });
        }

        user.validatePassword(password).then((isValid) => {
          if (!isValid) return res.send(401);

          const payload = {
            id: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
          };
          const token = tokens.generateToken(payload);
          res.cookie("token", token);
          res.sendStatus(201);
        });
      });
    });
};
