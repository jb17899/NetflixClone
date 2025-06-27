import dotenv from "dotenv";
import __dirname from "path";
dotenv.config({path: __dirname + "/../.env"});
console.log(__dirname.dirname);

export const ENV_VARS = {
    MONGO_URL:process.env.MONGO_URL,
    PORT : process.env.PORT||5000,
    SECRET:process.env.SET_SECRET,
    NODE_ENV:process.env.NODE_ENV,
    TMDB_API_KEY:process.ACCESS_TOKEN
};