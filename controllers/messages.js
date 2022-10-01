const { Messages } = require("../models");

exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    const data = await Messages.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.send({ msg: "Message added successfully." });
    else return res.send({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.findAll({
      where: {
        users: [from, to]
      }
    })

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.send(projectedMessages);
  } catch (err) {
    next(err);
  }
};