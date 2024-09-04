import express from 'express'
import dotenv from 'dotenv'
import initPostgres from './db/init.postgres';
dotenv.config()
async function bootstrap() {
    const app = express()
    const port = process.env.PORT || 3000
    // initPostgres()
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.listen(port, () => {
        `app listen: ${port}`
    })
}
bootstrap()
