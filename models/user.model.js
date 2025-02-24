import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: { //constraint user name
            type: String,
            required: [true, 'User Name is required'],
            trim: true, //if empty spaces occur
            minLength: 2,
            maxLengthe: 50
        },
        email: {
            type: String,
            required: [true, 'User emails is required'],
            unique: true,
            trim: true, //if empty spaces occur
            lowercase: true,
            match: [/\S+@\S+\.\S+/, 'Please input a a valid email address'] //regular expression to constrain email addressed e.g derrickktsamoh@gmail.com
        },
        password: {
            type: String,
            required: [true, 'User password is required'],
            minLength: 6
        }
    },
    { timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;