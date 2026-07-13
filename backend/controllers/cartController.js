import userModel from "../models/userModel.js"


// add product to user cart 
const addToCart = async(req, res)=>{
try {
    const {userId, itemId, size} = req.body

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData  

    console.log("cartData before :", cartData);

    if(cartData[itemId]){
        if(cartData[itemId][size]){
            cartData[itemId][size] += 1;
        }else{
            cartData[itemId][size] = 1;
        }
    }else{
        cartData[itemId] = {}
        cartData[itemId][size] = 1
    }

    console.log("CartData after : ", cartData , userId);

    await userModel.findByIdAndUpdate(userId, {cartData});

    res.json({sucess: true, message:"Added to cart"})
} catch (error) {
    console.log(error)
    res.json({sucess: false, message:error.message})
}
}


// update user cart 
const updateCart = async(req, res)=>{
try {
    const {userId, itemId, size, quantity} = req.body

    const userData = await userModel.findById(userId);
    const cartData = await userData.cartData;

    cartData[itemId][size] = quantity;
    
    await userModel.findByIdAndUpdate(userId, {cartData})
    res.json({sucess: true, message:"Cart Updated"}) 
} catch (error) {
    console.log(error)
    res.json({sucess: false, message:error.message})
}
}

// get user cart 
const getUserCart = async(req, res)=>{
try {
    const {userId} = req.body;

    const userData = await userModel.findById(userId)
    const cartData = userData.cartData;

    res.json({success: true, cartData})
} catch (error) {
    console.log(error);
    res.json({sucess:false, message:error.message})
}
}

export {addToCart, updateCart, getUserCart}