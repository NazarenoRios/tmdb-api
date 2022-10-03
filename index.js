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
    origin: "https://butterflix.vercel.app",
    methods: ['GET', 'POST', 'PUT' , 'DELETE', 'OPTIONS'], 
    credentials: true,
  }));

app.use(express.json());

app.use(cookieParser());

app.use((req,res,next) => {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

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
