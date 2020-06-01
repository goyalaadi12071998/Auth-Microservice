import express from 'express';
import { body } from 'express-validator';
import { Request , Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import * as jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/api/users/signin', [
    body('email')
    .isEmail()
    .withMessage('Email must be valid'),
    body('password')
    .trim()
    .notEmpty()
    .withMessage('Please add password')

] ,  validateRequest , async function(req: Request ,res: Response){
    const {email , password} = req.body;
    const existingUser = await User.findOne({email : email});
    if(!existingUser) {
        throw new BadRequestError('User with this email does not exist');
    }
    const passwordMatch = await Password.compare(existingUser.password , password);
    if(!passwordMatch){
        throw new BadRequestError('Credentials does not match');
    }
    const userJwt = await jwt.sign({id : existingUser.id, email : existingUser.email},'asdf');
    req.session = {
        jwt: userJwt
    };
    return res.status(200).send(existingUser);

});

export { router as signinRouter };