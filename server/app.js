import express from "express";
import userRoutes from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import dotenv from 'dotenv'; 

dotenv.config({
    path: './.env',
});

const app = express();

//Using Middlewares 
app.use(express.json());
// express.use(express.urlencoded());

connectDB(process.env.MONGODB_URI);

app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send("Welcome to myChat")
});

app.listen(4000, () => {
    console.log("Server is running on Port 4000");
});

