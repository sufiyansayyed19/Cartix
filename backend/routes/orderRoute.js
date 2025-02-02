import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe} from '../controllers/orderController.js';
import adminAuth from '../middleware/authAdmin.js';
import authUser from '../middleware/authUser.js';

const orderRouter = express.Router();

// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);

// Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/stripe', authUser, placeOrderStripe);
orderRouter.post('/razorpay', authUser, placeOrderRazorpay);

// User Feature
orderRouter.post('/userorders', authUser, userOrders);

//Verify payment
orderRouter.post('/verifyStripe', authUser, verifyStripe)

export default orderRouter;
