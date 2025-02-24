//We can querry the datatbase to extract a user or all users
import User from '../models/user.model.js'

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find(); //find all users
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error);
    }
}

//get a single user
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); //return all fields except password

        if(!user){
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}