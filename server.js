import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
import dotenv from 'dotenv';
dotenv.config();
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);
import userRoute from './routes/userRoute.js';

app.use('/api/users', userRoute);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Node.js server is running on port ${port}`));