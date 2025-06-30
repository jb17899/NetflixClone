import { ENV_VARS } from "../config/envVars.js";
import jwt from "jsonwebtoken";
import { user } from "../models/user.model.js";

export const protectRoute = async function(req,res,next){
    try{
        const token = req.cookies["jwt-netflix"];
        if(!token){
            return res.status(401).json({sucess:false,message:"Unauthorized,No token provided"});
        }
        const decoded = jwt.verify(token,ENV_VARS.SECRET);
        if(!decoded){
            return res.status(401).json({sucess:false,message:"Unauthorized,invalid web token provided"});
        }
        const User  = await user.findById(decoded.userId).select("-password");
        if(!User){
            return res.status(401).json({success:false,message:"user not found"});
        }
        req.user = User;
        next();
    }catch(error){
        res.status(500).json({success:false,message:"internal server error"});
    }

}