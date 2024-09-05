import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import {connectPostgres} from "./db/dbConnectSQL";
import fileUpload from "express-fileupload";
dotenv.config()

async function bootstrap() {
    const app = express()
    const port = process.env.PORT || 3000
    const connectSQL = await connectPostgres()
    console.log(connectSQL)
    app.use(cors())
    app.use(express.json())
    app.use(fileUpload({}))
    app.use(express.urlencoded({extended: true}))
    app.listen(port, () => {
        `app listen: ${port}`
    })
}
bootstrap()
