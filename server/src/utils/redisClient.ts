import Redis from 'ioredis';
import dotenv from "dotenv";

dotenv.config();
const REDIS_PORT = parseInt(process.env.REDIS_PORT as string, 10);

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: REDIS_PORT,
});

redisClient.on("connect", () => console.log("Connected to Redis"))
redisClient.on("error",(err) => console.error("error from Redis: ", err));

export default redisClient

