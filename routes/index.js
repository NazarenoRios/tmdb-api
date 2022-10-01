const express = require("express");
const router = express.Router();

const usersRouter = require("./users");
const moviesRouter = require("./movies");
const messagesRouter = require("./messages")

router.use("/users", usersRouter)
router.use("/movies",moviesRouter)
router.use("/messages",messagesRouter)

router.use("/asd", (req,res) => {
    res.send("asd")
})

module.exports = router;