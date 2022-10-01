const express = require("express");
const router = express.Router();

const validateUser = require("../middleware/auth");
const { register, login, validation, logout, googlelogin } = require("../controllers/auth");
const { profile, changePassword, users, user, searchUser } = require("../controllers/user");

router.post("/register", register)

router.post("/login", login);

router.get("/me",validateUser, validation)

router.post("/logout",validateUser, logout)

router.put("/googlelogin", googlelogin);

router.put("/profile",validateUser,profile)

router.put("/changePassword",validateUser,changePassword)

router.get("/",validateUser,users)

router.get("/user/:id",validateUser, user)

router.get("/search",validateUser, searchUser)


module.exports = router;
