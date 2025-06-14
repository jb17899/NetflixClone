import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";

export const connectDB = async()=>{
    try{
        console.log(ENV_VARS.MONGO_URL);
        const conn = await mongoose.connect(ENV_VARS.MONGO_URL);
        console.log(conn.connection.host);
    }catch(error){
        console.log(error);
        process.exit(1);
    }

};