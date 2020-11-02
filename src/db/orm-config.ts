import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { User } from "./entities/User";

export const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'vlivanov',
  password: 'vlivanov',
  database: 'wannawatch',
  synchronize: true,
  logging: false,
  entities: [User],
};
