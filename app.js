import express from "express";

import {PORT} from './config/env.js';

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"; 
import subscriptionRouter from "./routes/subscription.route.js";
//import { connect } from "mongoose";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json()); // To handle Json data sent in request or API calls
app.use(express.urlencoded({extended: false})); // To process form data sent via HTML forms in a simple format
app.use(cookieParser()); //Reads cookies from incoming  request so app can store data
 
//routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

//Global error Handler
app.use(errorMiddleware);


app.get('/', (req, res) => {
    res.send('Welcome to the subscription tracker API');
});

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is listening on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;