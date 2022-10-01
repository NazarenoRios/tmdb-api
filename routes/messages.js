const express = require("express");
const { addMessage, getMessages } = require("../controllers/messages");
const router = express.Router();

router.post("/addMessage", addMessage);
router.post("/getMessage", getMessages );


module.exports = router;
