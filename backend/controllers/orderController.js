import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay'

//global variable
const currency = 'inr';
const deliveryCharge = 10;

// razorpay payment gateway initialize
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_SECRET_KEY
})

// place order usign COD method
const placeOrder = async (req, res) =>{
    try {
        const {items, amount, address, userId} = req.body;

        console.log("Items : ", items);

        if(!(items.length > 0 )){
            return res.json({success: false, message:"Add something in cart"})
        }

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = await new orderModel(orderData)
        await newOrder.save()

        // or 
        // await new orderModel.create(orderData)

        await userModel.findByIdAndUpdate(userId, {cartData:{}})

        res.json({success:true, message:"Order Placed"})
    } catch (error) {
        console.log("error while place order COD", error);
        res.json({success: false, message: error.message})
    }
}

// place order using  Stripe Method
const placeOrderStripe = async (req, res) =>{

}

// place order uinsg Razorpay 
const placeOrderRazorPay = async (req, res) =>{
    try {
        
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()


        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder.id
        }

        await razorpayInstance.orders.create(options, (error, order) =>{
            if(error){
                console.log("Error while razorpayorderCreate ::", error);
                return res.json({sucess: false, message:error.message})
            }
            res.json({success: true, order})
        })

    } catch (error) {
        console.log("error while razorpay payment integration::", error);
        res.json({success: false, message: error.message})
    }
}

// verify razorpay payment 
const verifyRazorpay = async (req, res) =>{
    try {
        const { userId, razorpay_order_id} = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            console.log("STATUS PAID RAZORPAY");
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true});
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success: true, message:"Payment successfull"})
        }else{
            console.log("STATUS NOT PAID BY RAZORPAY");
            res.json({success: false, message: "Payment failed"})
        }
    } catch (error) {
        console.log("Error while razorpay payment varify:: ", error);
        res.json({success: false, message:error.message})
    }
}

// All order data for admin
const allOrders = async (req, res) =>{
    try {
        const orders = await orderModel.find({});
        res.json({success: true, orders})
    } catch (error) {
        console.log('Error while all orders fetch for admin :', error);
        res.json({success: false, message:error.message})
    }
} 

// user order data for frontend
const userOrders = async (req, res) =>{
    try {
        console.log("user Order 0");
        const {userId} = req.body;
        console.log("user Order 1");
    
        const orders = await orderModel.find({ userId })
    
        console.log("User order List 3:: ", orders);

        res.json({success:true, orders})
    } catch (error) {
        res.json({success:false, message:error.message})
        console.log("Error while user order list :: ", error);
    }
}

// update order status from admin panel
const updateStatus  = async (req, res) =>{
    try {
        const {orderId, status} = req.body

        if(!(orderId || status)){
            return res.json({success:false, message: "Please select valid status or orderId"})
        }

        await orderModel.findByIdAndUpdate(orderId, { status })

        res.json({success: true,  message:"Order status updated."})

    } catch (error) {
        console.log("Error while status update");
        res.json({success: false, message:error.message})
    }
}

export {verifyRazorpay, placeOrder, placeOrderRazorPay, placeOrderStripe, allOrders, userOrders, updateStatus}