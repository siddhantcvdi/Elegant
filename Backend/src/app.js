import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRouter } from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import dotenv from 'dotenv'

dotenv.config()
const app = express();

app.use(express.json())
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))
console.log(process.env.CORS_ORIGIN);

app.use(express.static('public'))
app.use(cookieParser())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)

export {app}

