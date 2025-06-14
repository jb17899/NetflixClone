import express from "express";
import authRoutes from "./routes/auth_route.js";
import movieRoutes from "./routes/movie_route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import tvRoutes from "./routes/tv.route.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import searchRoutes from "./routes/search.route.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = ENV_VARS.PORT;
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute,movieRoutes);
app.use("/api/v1/tv",protectRoute,tvRoutes); 
app.use("/api/v1/search",protectRoute,searchRoutes); 
app.listen(PORT,()=>{
    console.log("server on",PORT);
    connectDB();
})
