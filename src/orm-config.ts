import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import config from "./utils/config";
import { User } from "./models/User";
import { Movie } from "./models/Movie";

export const ormConfig: PostgresConnectionOptions = {
  type: 'postgres',
  url:  'postgresql-curved-34636',
  // host: config.DB_HOST,
  // port: 5432,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: 'wannawatch',
  synchronize: true,
  logging: false,
  entities: [User, Movie],
};
