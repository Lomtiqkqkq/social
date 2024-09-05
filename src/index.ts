import express from 'express'
import dotenv from 'dotenv'
import InitPostgres from './db/init.postgres';
dotenv.config()
async function bootstrap() {
    const app = express()
    const port = process.env.PORT || 3000
    await InitPostgres.sync().then(()=>{
        console.log(`db connection started`);
    })
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.listen(port, () => {
        `app listen: ${port}`
    })
}
bootstrap()
