import JWT from 'jsonwebtoken'

const authUser = async(req, res, next)=>{
    try {

        const {token}  = req.headers;

        // console.log("Rakesh Token ::", token);

        if(!token){
            return res.json({success: false, message:"Not Authorized Login Again."})
        }
    
        const token_decode = JWT.verify(token, process.env.JWT_SECRET)

        console.log("Rakesh decoded_token: ", token_decode);
        if(token_decode.id){
            req.body.userId = token_decode.id;
            // console.log("successfully ----- userId push in body");
        }else{
            console.log("Auth token :::: something went wrong....");
            return ;
        }
    
        next();
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:`Error found while token to userid: ${error.message}`})
    }
}

export default authUser;