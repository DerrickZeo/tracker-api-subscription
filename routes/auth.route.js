import {Router} from 'express';
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';

const authRouter = Router();

/*INSTEAD OF THIS:
authRouter.post('/sign-up', (req, res) => {
    res.send({title: 'Sign-up'})
} );

authRouter.post('/sign-in', (req, res) => {
    res.send({title: 'Sign-in'})
} );

authRouter.post('/sign-out', (req, res) => {
    res.send({title: 'Sign-out'})
} );*/

//DO THIS 

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/sign-out', signOut);



export default authRouter;