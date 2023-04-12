import express from "express";
import mongoose from "mongoose";
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING;
mongoose.connect(CONNECTION_STRING);


const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Node.js server is running on port ${port}`));