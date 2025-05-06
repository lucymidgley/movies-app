import "reflect-metadata";
import { DataSource } from "typeorm";

import * as dotenv from "dotenv";
import { User } from "./entity/User";
import { Movie } from "./entity/Movie";

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
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
  entities: [User, Movie],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
});
