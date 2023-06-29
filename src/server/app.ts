import express, { Express } from "express";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";

const app: Express = express();
//const path = __dirname + "/web/";

const pathToRoutes = path.join(__dirname, "routes");

app.use(express.json());
app.use(cookieParser());

// Dynamically load all routes from the routes folder
fs.readdirSync(pathToRoutes).forEach(async (file) => {
  const routePath = path.join(pathToRoutes, file);
  const routeModule = await import(routePath);
  const route = routeModule.default;
  app.use("/api", route);
});

//app.use(express.static(path));

app.get("/", (req, res) => {
  res.sendFile(path + "index.html");
});

export default app;
