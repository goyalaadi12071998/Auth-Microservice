import express from 'express';
import mongoose, { mongo } from 'mongoose';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import 'express-async-errors';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';
const app = express();
app.set('trust proxy', false);
app.use(json());
app.use(cookieSession({
    signed : false,
    secure : false
}));

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);


app.all('*', async function(){
    throw new NotFoundError();
});

app.use(errorHandler);

const start = async function(){
    try {
        
        await await mongoose.connect('mongodb+srv://goyalaadesh461:11710461Aa@test-d3lnu.mongodb.net/test?retryWrites=true&w=majority',{
            useCreateIndex : true,
            useNewUrlParser : true,
            useUnifiedTopology : true
        });
    }  catch(err){
        console.log(err);
    }
    app.listen(3000,function(){
        console.log('Listening on port 3000!');
    });
}

start();