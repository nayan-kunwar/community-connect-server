import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("8000"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  MONGO_URI: z.string().url(),
  DB_NAME: z.string().default("community_connect"),
  ACCESS_TOKEN_SECRET: z.string().min(1, "ACCESS_TOKEN_SECRET is required"),
  REFRESH_TOKEN_SECRET: z.string().min(1, "REFRESH_TOKEN_SECRET is required"),
  ACCESS_TOKEN_EXPIRY: z.string().default("1d"),
  REFRESH_TOKEN_EXPIRY: z.string().default("15d"),
});

// console.log('Environment Variables:', envSchema.parse(process.env));

export const config = envSchema.parse(process.env);
