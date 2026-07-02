import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

// create token
const createToken = (id) => {
  return JWT.sign({id}, process.env.JWT_SECRET);
};

// Routes for user login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"User doesn't exists"})
        }

        if(!password){
            return res.json({success: false, message:"Enter password"})
        }

        const isPassMatch = await bcrypt.compare(password, user.password)
        if(!isPassMatch){
            res.json({success:false, message: "Invalid credential"})
        }else{
            const token = createToken(user._id);
            res.json({success:true, token})
        }

    } catch (error) {
        console.log("Error while login :", loginUser);
        return res.json({success:false, message:`Error while login ${error}`})
    }
};

// Routes for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // checking user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email formate and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter above 8 digits password" });
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create model
    const newUser = new userModel({
      name,
      email,
      password: hashPassword,
    });

    const user = await newUser.save(); // return userdata after save

    // generate auth token for user
    const token = createToken(user._id);

    // send response
    return res.json({ success: true, token});
  } catch (error) {
    console.log("Error while register user ", error);
    return res.json({success: false, message: `Error while register : ${error}`})
  }
};

// Routes for admin login
const adminLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
  
    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
      return res.json({success: false, message:"Wrong Credential"})
    }
  
    const token = JWT.sign(email+password, process.env.JWT_SECRET);
    if(!token){
      return res.json({success: false, message:"something went wrong token not generate"})
    }
  
    return res.json({success: true, token})
  } catch (error) {
    console.log("Error white admin authentication ", error);
    return res.json({success:false, message:`Fail admin login : ${error}`})
  }
}; 

export { loginUser, registerUser, adminLogin };
