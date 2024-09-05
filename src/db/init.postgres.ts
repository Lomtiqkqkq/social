import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config()

const InitPostgres = new Sequelize({
    username: process.env.PG_USER,
    password: String(process.env.PG_PASSWORD),
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    dialect: "postgres"
})
export default InitPostgres
