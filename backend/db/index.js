import mongoose from "mongoose";
import 'dotenv/config';
import { DB_NAME } from "../constant.js";

const connectDB = async()=>{
    try {
        mongoose.connection.on('connected', ()=>{
            console.log("Db connected");
        })

        await mongoose.connect(`${process.env.MONGOOSE_URI}${DB_NAME}`);
    } catch (error) {
        console.error("MongoDb connection error :", error)
    }

}

export default connectDB;