import {Sequelize} from '@sequelize/core';
import {PostgresDialect} from '@sequelize/postgres';
import dotenv from 'dotenv';
import * as process from 'node:process';
dotenv.config()
const InitPostgres = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),

})
export default InitPostgres
