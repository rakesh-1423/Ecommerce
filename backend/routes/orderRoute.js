import express from 'express'
import { placeOrder, placeOrderRazorPay, placeOrderStripe, allOrders, userOrders, updateStatus, verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js';

const orderRoutes = express.Router();

// Admin features
orderRoutes.post('/list',adminAuth, allOrders)
orderRoutes.post('/status',adminAuth, updateStatus)

// Payment features
orderRoutes.post('/place', authUser, placeOrder)
orderRoutes.post('/stripe', authUser, placeOrderStripe)
orderRoutes.post('/razorpay', authUser, placeOrderRazorPay)

//verify razorpay payment 
orderRoutes.post('/verifyRazorpay', authUser, verifyRazorpay)

// user features 
orderRoutes.post('/userorders', authUser, userOrders)
export default orderRoutes;