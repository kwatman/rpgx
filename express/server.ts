import express, { Express, Request, Response } from "express";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Express available on http://localhost:${port}`);
});
