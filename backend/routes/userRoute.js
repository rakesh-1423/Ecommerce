import express from 'express'
import authUser from '../middleware/auth.js';
import { adminLogin, loginUser, registerUser, userProfile } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/admin', adminLogin)
userRouter.post('/userProfile', authUser, userProfile)

export default userRouter;