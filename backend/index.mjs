import express from 'express'
import { configDotenv } from 'dotenv'
import db_connect from './config/db_connect.mjs'
import ProductRouter from './router/ProductRouter.mjs';
import cors from 'cors'

configDotenv();

db_connect(process.env.DB)
const app =express()
app.use(express.json())

app.use(cors({origin:'http://localhost:5173'}))
app.use('/product/', ProductRouter)
app.listen(process.env.PORT)