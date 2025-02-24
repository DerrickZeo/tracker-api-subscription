// central error handling middleware to track errors

//err track what haben before the request
// next track what happens after the request

//  explanation: in Creating a  subscription -> middleware(chack for renewal date) -> maybe another middleware (that checks for errors) -> only when they call their 'next' status -> controller (handles thhe actual logic of creation)

const errorMiddleware = (err, req, res, next) => {
    try{
        let error = {...err};
        error.message = err.message;
        console.error(err);

        //Mongoose bad ObjectId
        if(err.name == 'CastError'){
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        //Mongoose duplicate key
        if(err.code == 11000){
            const message = 'duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        //Mongoose validation error
        if(err.name == 'ValidationError'){
            const message = Object.values(err.errors).map(val => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }
        //Middleware send an HTTP response with the following
        res.status(error.statusCode || 500).json({ 
            success: false, 
            error: error.message || 'Server Error'});
    }catch(error){
        next(error); //send error to next step for us know that the error happened 
    }
};


export default errorMiddleware;