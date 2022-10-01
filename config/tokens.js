const jwt = require("jsonwebtoken")

function generateToken (payload) {
    return jwt.sign(payload,SECRET,{ expiresIn: "2h"})
}

function validateToken (token) {
    return jwt.verify(token,SECRET)
}

const SECRET = "butterfly"

module.exports = { generateToken, validateToken }