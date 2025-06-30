import express from "express";
import authRoutes from "./routes/auth_route.js";
import movieRoutes from "./routes/movie_route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import tvRoutes from "./routes/tv.route.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import searchRoutes from "./routes/search.route.js";
import pkg from "cors";
import path from "path";
const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(pkg({
    origin: true,
    credentials:true
}));
if(ENV_VARS.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/Frontend/dist')));
}

const PORT = ENV_VARS.PORT;
app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute,movieRoutes);
app.use("/api/v1/tv",protectRoute,tvRoutes); 
app.use("/api/v1/search",protectRoute,searchRoutes); 

if(ENV_VARS.NODE_ENV === "production"){
    app.get("*", (_, res) => {
        res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
    });
}
app.listen(PORT,()=>{
    console.log("server on",PORT);
    connectDB();
})
