"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const REDIS_PORT = parseInt(process.env.REDIS_PORT, 10);
const redisClient = new ioredis_1.default({
    host: process.env.REDIS_HOST,
    port: REDIS_PORT,
});
redisClient.on("connect", () => console.log("Connected to Redis"));
redisClient.on("error", (err) => console.error("error from Redis: ", err));
exports.default = redisClient;
