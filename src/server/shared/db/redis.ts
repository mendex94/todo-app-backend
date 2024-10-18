import { Redis } from "ioredis";

export const redis = new Redis({
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379,
  host: process.env.REDIS_HOST || "localhost",
  password: process.env.REDIS_PASSWORD,
  db: process.env.REDIS_DB ? parseInt(process.env.REDIS_DB) : 0,
});
