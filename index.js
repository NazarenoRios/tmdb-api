const express = require("express");
const app = express();
const db = require("./db");
const models = require("./models");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const socket = require("socket.io");
require("dotenv").config();

const PORT = 5432;

app.use(cors({
    origin: "https://butterflix.vercel.app/",
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'], credentials: true,
  }));

app.use(express.json());

app.use(cookieParser());

// app.use(express.static("../client/build"))

app.use("/api", routes);


db.sync({force: false})
  .then(function () {
    console.log("DB Connected");
    app.listen(PORT, () =>
      console.log(`Server listened at port ${PORT}`)
    );
  })
  .catch((error) => console.log("ERR", error));
