import { DataSource } from "typeorm";
import { User } from "./models/User";
export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  entities: ["dist/models/**/*.js"],
  synchronize: true,
});
