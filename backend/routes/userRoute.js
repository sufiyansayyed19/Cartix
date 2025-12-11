import express from 'express';
import  { loginUser, registerUser, adminLogin, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { authLimiter, registerLimiter } from '../middleware/rateLimiter.js';
import authUser from '../middleware/authUser.js';

const userRouter = express.Router();

// Apply rate limiting to authentication endpoints
userRouter.post('/register', registerLimiter, registerUser);

userRouter.post('/login', authLimiter, loginUser);

userRouter.post('/admin', authLimiter, adminLogin);

// Profile routes (protected with authUser middleware)
userRouter.get('/profile', authUser, getUserProfile);

userRouter.post('/profile/update', authUser, updateUserProfile);

export default userRouter;
