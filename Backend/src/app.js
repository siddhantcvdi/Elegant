import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { userRouter } from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import dotenv from 'dotenv'
import { categoryRouter } from './routes/category.routes.js';

dotenv.config()
const app = express();

app.use(express.json())
const allowedOrigins = process.env.CORS_ORIGINS.split(",");

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.static('public'))
app.use(cookieParser())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/products', productRouter)
app.use('/api/v1/categories', categoryRouter)

export {app}

