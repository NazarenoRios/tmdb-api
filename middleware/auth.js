const tokens = require("../config/tokens")

function validateUser (req,res,next) {
    const token = req.cookies.token;
    const payload = tokens.validateToken(token)
    
    req.user = payload;

    if (payload) return next()

    res.sendStatus(401);
}


module.exports = validateUser;