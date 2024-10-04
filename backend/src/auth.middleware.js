import jwt from 'jsonwebtoken';
import { User } from './user.model.js';

const jwtVerification = async (req,res,next) =>{
    try {
        const token = req.cookies.accessToken|| req.header("authorization")?.replace("Bearer ", "");
        console.log("Token:", token);
        if(!token){
            throw new Error("anauthorized request");
        }
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        console.log(decoded);
        const user = await User.findById(decoded?._id).select("-password -refreshToken");

        if(!user){
            res.status(401).json("invalid access token");
        } 

        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
    }

}

export  default jwtVerification;
