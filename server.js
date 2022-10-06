import * as dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import morgan from "morgan";
const logger = morgan;

import mongoose from "mongoose";
const mongoDB =
  `mongodb+srv://` +
  process.env.DB_USER +
  `:` +
  process.env.DB_PASS +
  `@cluster0.xapgiul.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(mongoDB, {
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

import userRouter from "./routes/api/users.js";
import thoughtRouter from "./routes/api/thoughts.js";

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/users", userRouter);
app.use("/api/thoughts", thoughtRouter);

export default app;
