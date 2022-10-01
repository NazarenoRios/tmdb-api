const jwt = require("jsonwebtoken")

const SECRET = "butterfly"

function generateToken (payload) {
    return jwt.sign(payload,SECRET,{ expiresIn: "2h"})
}

function validateToken (token) {
    return jwt.verify(token,SECRET)
}

module.exports = { generateToken, validateToken }