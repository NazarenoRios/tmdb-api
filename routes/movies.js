const express = require("express");
const router = express.Router();
const { addFavorite, removeFavorite, getFavorite } = require("../controllers/favorites");

router.put("/addFavorite", addFavorite );

router.delete("/removeFavorite", removeFavorite);

router.get("/favorites", getFavorite)

module.exports = router;
