import express from "express";
import cors from "cors";

import {PORT} from './config/env.js';

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js"; 
import subscriptionRouter from "./routes/subscription.route.js";
//import { connect } from "mongoose";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.route.js";


const app = express();
app.use(cors()); // This will allow requests from any origin (useful in development)

app.use(express.json()); // To handle Json data sent in request or API calls
app.use(express.urlencoded({extended: false})); // To process form data sent via HTML forms in a simple format
app.use(cookieParser()); //Reads cookies from incoming  request so app can store data
app.use(arcjetMiddleware);

//routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);




app.get('/', (req, res) => {
    res.send('Welcome to the subscription tracker API');
});

//Global error Handler
app.use(errorMiddleware);

app.listen(PORT, async () => {
    console.log(`Subscription Tracker API is listening on http://localhost:${PORT}`);

    await connectToDatabase();
});

export default app;