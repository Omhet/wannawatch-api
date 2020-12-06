import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import config from './utils/config';
import { User } from './models/User';
import { Movie } from './models/Movie';

// const getOptions = () => {
//   let connectionOptions: PostgresConnectionOptions;
//   connectionOptions = {
//     type: 'postgres',
//     synchronize: false,
//     logging: false,
//     extra: {
//       ssl: true,
//     },
//     entities: ['dist/entity/*.*'],
//   };
//   if (process.env.DATABASE_URL) {
//     Object.assign(connectionOptions, { url: process.env.DATABASE_URL });
//   }
//   return connectionOptions;
// };

// export const ormConfig: PostgresConnectionOptions = getOptions();

export const ormConfig: PostgresConnectionOptions = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    // host: config.DB_HOST,
    // port: 5432,
    // username: config.DB_USER,
    // password: config.DB_PASSWORD,
    database: 'wannawatch',
    synchronize: true,
    logging: false,
    entities: [User, Movie],
    // extra: {
    //     ssl: true,
    // },
};
