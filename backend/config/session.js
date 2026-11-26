import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import "dotenv/config";

export const SESSION_NAME = "23hours.sid";

const isProduction =
  process.env.NODE_ENV === "production";

export const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax",
  path: "/"
};

export function createSessionMiddleware() {
  if (!process.env.SESSION_SECRET) {
    throw new Error("SESSION_SECRET is missing");
  }

  return session({
    name: SESSION_NAME,

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    rolling: false,

    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      collectionName: "sessions",
      ttl: 30 * 24 * 60 * 60
    }),

    cookie: {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  });
}