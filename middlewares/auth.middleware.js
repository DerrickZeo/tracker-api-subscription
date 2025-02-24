//Here we protect user data

import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/env.js'
import User from '../models/user.model.js'

const authorize = async (req, res, next) => {
    try {
        let token;

        //extracting the token from the req header
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) // a token passed through the req header starts with 'Bearer' (from  protocol)
            {
        token = req.headers.authorization.split(' ')[1];//split header and return the second part [1] which is the token
        }

        //checking if there is no token
        if(!token) 
            return res.status(401).json({ 
            message: 'Unauthorized' });
        
            //verfy the token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        //check if user exist in datatbase
        const user = await User.findById(decoded.userId);
        //otherwise
        if(!user) 
            return res.status(401).json({ 
            message: 'Unauthorized' });

        req.user = user;//attach user to the req

        next();
    } catch (error) {
        // run with status 401 and return a json output with message 'unauthrized' and as the error information 
        res.status(401).json({
             message: 'Unauthorized', 
             error: error.message 
            }); 
    }
}

export default authorize;