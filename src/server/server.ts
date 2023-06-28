import express, { Express, Request, Response } from "express";
import "reflect-metadata";
import app from "./app";
import dotenv from "dotenv";
import { AppDataSource } from "./AppDataSource";
import { User } from "./models/User";
dotenv.config();

const port = process.env.PORT;

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(port, () => {
  console.log(`Express available on http://localhost:${port}`);
});
