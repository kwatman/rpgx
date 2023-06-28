import express, { Express } from "express";
import utils from "./routes/utils";

const app: Express = express();
const path = __dirname + "/web/";
app.use(utils);
app.use(express.static(path));
app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

export default app;
