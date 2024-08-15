const express = require("express");
const mongoose = require("mongoose");

// init app
const PORT = 4000;
const app = express();

// connect db
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo'
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
  .connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("database coonnected successful"))
  .catch((err) => console.log("connection failed :", err));

app.get("/", (req, res) => res.send("<h1>hello oumaima ridaa</h1>"));

app.listen(PORT, () => console.log(`app is up and running on port : ${PORT}`));
