import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './user.route.js'

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use('/user',userRouter)


export default app;