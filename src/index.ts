import 'reflect-metadata';
import 'express-async-errors';
import http from 'http';
// import fs from 'fs';
import { createConnection } from 'typeorm';
import { ormConfig } from './orm-config';
import logger from './utils/logger';
import config from './utils/config';
import app from './app';

// import { dirname } from 'path';
// import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

// const key = fs.readFileSync(__dirname + '/certs/localhost-key.pem', 'utf-8');
// const cert = fs.readFileSync(__dirname + '/certs/localhost.pem', 'utf-8');

(async () => {
    try {
        await createConnection(ormConfig);
        logger.info('Connected to DB');
    } catch (error) {
        logger.error('Failed to connect to DB', error.message);
        return;
    }

    try {
        const server = http.createServer(app);
        server.listen(config.PORT, () =>
            logger.info(`Server started on ${config.PORT}`)
        );
    } catch (error) {
        logger.error('Failed to start server', error.message);
    }
})();
