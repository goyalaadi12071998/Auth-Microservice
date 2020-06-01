import express from 'express';
import { requireAuth } from '../middlewares/require-auth';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/user/currentuser', currentUser , requireAuth ,async function(req,res){
    //console.log(req.session);
    res.send({currentUser : req.currentUser || null});
});

export { router as currentUserRouter };