import jwt from "jsonwebtoken";
import {ENV_VARS} from "../config/envVars.js";

export const genTokenandSetCookie = async(userId,user, res) => {
    const token = jwt.sign({ userId }, ENV_VARS.SECRET, { expiresIn: "15d" });

    res.cookies = res.cookie("jwt-netflix", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: ENV_VARS.NODE_ENV !== "development",
    });
};