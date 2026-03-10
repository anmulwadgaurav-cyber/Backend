const Redis = require("ioredis").default;
//require use karoge to .default lagana padega suggestions ke liye

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redis.on("connect", () => {
  console.log("Server is connected to Redis");
});

redis.on("error", (err) => {
  console.log(err);
});

module.exports = redis;

//abhitak ke code ka kaam sirf redis ko server se connect karna
