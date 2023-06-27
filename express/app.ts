import express, { Express } from "express";
import utils from "./routes/utils";

const app: Express = express();

app.use(utils);

export default app;
