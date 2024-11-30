import express from 'express'
import { configDotenv } from 'dotenv'
import db_connect from './config/db_connect.mjs'
import router from './router/index.mjs'
import cors from 'cors'

configDotenv();

db_connect(process.env.DB)
const app = express()
app.use(express.json())

app.use(cors({origin:'*'}))
app.use(router)
app.listen(process.env.PORT)