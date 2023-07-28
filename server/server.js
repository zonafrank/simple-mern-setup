import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { MongoClient } from "mongodb";
import devBundle from "./devBundle";
import template from "../template";

const CURRENT_WORKING_DIR = process.cwd();
const dbUrl = process.env.MONGODB_URI;

const mongoClient = new MongoClient(dbUrl);
const db = mongoClient.db("mernsimplesetup");

const app = express();
// console.log(`*** NODE_ENV: ${process.env.NODE_ENV} ***`);
if (process.env.NODE_ENV === "development") {
  devBundle.compile(app);
}

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.get("/", (request, response) => {
  response.status(200).send(template());
});

let PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info(`Server started on port ${PORT}`);
  }
});
