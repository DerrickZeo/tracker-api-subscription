import aj from '../config/arcjet.js';


const arcjetMiddleware = async (req, res, next) => {
    try {
        //protect this request and provide a deccision
        const decision = await aj.protect(req, {requested: 1});//use or take out one token from the token bucket per request

        if(decision.isDenied()){
            if(decision.reason.isRateLimit()) return res.status(429).json({error: 'Rate limit exceeded'});
            if(decision.reason.isBot()) return res.status(403).json({error: 'Bot detected'});

            return res.status(403).json({error: 'Access denied'});
        }

        next(); //process the request
    } catch (error) {
        console.log(`Arcjet Middleware Error: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;