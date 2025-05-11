import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "./entity/User";
import { Movie } from "./entity/Movie";
import { Favourite } from "./entity/Favourite";

dotenv.config();

const {
  NODE_ENV,
} = process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: 'postgres_db',
  port: parseInt("5432"),
  username: 'postgres',
  password: 'password',
  database: 'mydatabase',
  synchronize: NODE_ENV === "dev" ? false : false,
  logging: NODE_ENV === "dev" ? false : false,
  entities: [User, Movie, Favourite],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});
