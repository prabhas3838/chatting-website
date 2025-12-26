import jwt from "jsonwebtoken";
import User from "../models/user.js";


export const protectroute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Not authorized, no token"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message:"Not authorized, token failed"});
        }
        const user=await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(401).json({message:"Not authorized, user not found"});

        }
        console.log("JWT COOKIE:", req.cookies.jwt);

        req.user=user;
        next();




        
    } catch (error) {
        console.error("Protect route error:",error);
        
    }
}