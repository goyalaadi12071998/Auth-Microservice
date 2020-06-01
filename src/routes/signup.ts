import express from 'express';
import { Request , Response } from 'express';
import { body } from 'express-validator';
const router = express.Router();
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import * as jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';

router.post('/api/users/signup', [
        body('name').trim().isLength({min:1}).withMessage('Provide valid name'),
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().isLength({min:4 , max:20}).withMessage('Password must be 4 to 20 letters')
    ] , validateRequest , async function(req:Request,res:Response){
    
        const { name , email , password } = req.body;
        const existingUser = await User.findOne({email : email});
        if(existingUser) {
            throw new BadRequestError('Email already exist');
        }
        const user = await User.build({name , email , password});
        await user.save();
        const userJwt = await jwt.sign({id : user.id, name : user.name , email : user.email,},'asdf');

        req.session = {
            jwt: userJwt
        }
        return res.status(201).send(user);
});

export { router as signupRouter };