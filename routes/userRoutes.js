import express from 'express';

// import controllers 
import {signin, signup} from '../controller/userController.js'
const  router = express.Router();

router.post('/signin', signin)
router.post('/signup', signup)


export default router;