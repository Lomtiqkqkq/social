import {Sequelize} from '@sequelize/core';
import {PostgresDialect} from '@sequelize/postgres';
import dotenv from 'dotenv';
dotenv.config()

const InitPostgres = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: String(process.env.PG_PASSWORD),
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),

})
export default InitPostgres
