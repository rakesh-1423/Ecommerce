import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./db/index.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRoutes from "./routes/orderRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary();


// middleware
app.use(express.json())
app.use(cors())

// Api endpoint
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRoute);
app.use('/api/order/', orderRoutes)

app.get("/", (req, res)=>{
    res.send("API working.")
})

app.listen(port, ()=>{
    console.log("Server started on PORT :", port)
}) 