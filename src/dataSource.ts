import { DataSource } from "typeorm";
import Wilder from "./entities/Wilder";
import Skill from "./entities/Skill";

const dataSource = new DataSource({
  type: "sqlite",
  database: "./wildersdb.sqlite",
  synchronize: true,
  entities: [Wilder, Skill],
});

export default dataSource;
