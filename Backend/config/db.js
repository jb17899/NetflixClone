import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(ENV_VARS.MONGO_URL);
    }catch(error){
        // console.log(error);
        process.exit(1);
    }

};