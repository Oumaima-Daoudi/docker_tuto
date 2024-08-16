const express = require("express");
const mongoose = require("mongoose");
const redis = require('redis');
const { Client } = require('pg')


// init app
const PORT = 4000;
const app = express();

// connect to redis 
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis'
const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', err => console.log('Redis Client Error', err));
redisClient.on('connect', () => console.log('Connected to redis'));
redisClient.connect();

// connect db
const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 5432;
const DB_HOST = 'postgres'
const URI = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const client = new Client({
    connectionString:URI,
  })
client.connect()
  .then(() => console.log("postgres database coonnected successful"))
  .catch((err) => console.log("connection failed to postgres db :", err));


// const DB_USER = 'root';
// const DB_PASSWORD = 'example';
// const DB_PORT = 27017;
// const DB_HOST = 'mongo'
// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose
//   .connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("database coonnected successful"))
//   .catch((err) => console.log("connection failed :", err));

app.get("/", (req, res) => {
    redisClient.set('products','products....')
    res.send("<h1>hello oumaima</h1>")
});

app.get("/data", async (req, res) => {
    const products = await redisClient.get('products')
    res.send(`<h1>hello oumaima</h1> <h2>${products}</h2>`)
});

app.listen(PORT, () => console.log(`app is up and running on port : ${PORT}`));
