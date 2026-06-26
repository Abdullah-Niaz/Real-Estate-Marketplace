import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from "cookie-parser";
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js'
import connectDB from './config/db.js';

connectDB();

const app = express();

app.use(express.json())

app.use(cookieParser());


app.listen(3000, () => {
    console.log("Server running on port 3000");
})

app.use('/api/user', userRouter)
app.use('/api/auth/', authRouter)
app.use("/api/listing", listingRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500; //internal server error
    const message = err.message || "internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});