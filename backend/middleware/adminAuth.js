import JWT from "jsonwebtoken"

const adminAuth = (req, res, next)=>{
    try {
        const {token} = req.headers

        if(!token){
            console.log("Token value found :", res.headers);
            return res.json({success:false, message:"Not Authorized Login Again"})
        }

        const decoded_token = JWT.verify(token, process.env.JWT_SECRET)

        if(decoded_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:"Not Authorized Login Again"})
        }

        next()

    } catch (error) {
        console.log("Error while admin authenticaion",error);
        return res.json({success:false, message:"Authentication fail.."})
    }
}

export default  adminAuth;