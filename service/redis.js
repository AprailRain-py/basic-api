const redis = require("redis");
const redisURL = "redis://127.0.0.1:6379"; //process.env.redisURL
const redisClient = redis.createClient(redisURL);

// promisify functions
const _ = require("util");
redisClient.set = _.promisify(redisClient.set);
redisClient.get = _.promisify(redisClient.get);

module.exports = redisClient;
