console.log("starting server");

import app from "app";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./AppDataSource";
dotenv.config();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Express available on http://localhost:${port}`);
});
