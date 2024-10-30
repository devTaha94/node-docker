const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const pg = require('pg');
const { Pool, Client } = pg


const PORT = process.env.PORT || 4000;
const app = express();

const REDIS_PORT = 6379;
const REDIS_HOST = "redis";
const redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});

async function initializeRedis() {
    try {
        await redisClient.connect();
        console.log('Connected to Redis!');
    } catch (err) {
        console.log('Redis Client Error:', err);
    }
}

// Initialize Redis connection
initializeRedis();

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = "mongo";
const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose.connect(URI)
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.log('DB Connection Error:', err));



const PG_USER = 'root';
const PG_PASSWORD = 'example';
const PG_PORT = 5432;
const PG_HOST = "postgres";
const PG_URI = `postgresql://${PG_USER}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}`;
const client = new Client({
    connectionString: PG_URI,
})

client
    .connect()
    .then(() => console.log('Connected to Postgres!'))
    .catch((err) => console.log('DB Connection Error:', err));


app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));

app.get('/', async (req, res) => {
    try {
        await redisClient.set('products', 'products ...');
        res.send('<h1>Hello World!</h1>');
    } catch (err) {
        console.log('Redis Error:', err);
        res.status(500).send('Error connecting to Redis');
    }
});

app.get('/data', async (req, res) => {
    let products = await redisClient.get('products')
    res.send(`<h1>${products}<\h1>`)
})