import {user} from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { genTokenandSetCookie } from "../utils/genToken.js";
export async function signup(req,res){
    try{
        const {email,password,username} = req.body;
        if(!email||!password||!username){
            return res.status(400).json({success:false,message:"ALl fields are required"});
        }
        if(password.length <6){
            return res.status(400).json({success:false,message:"password should be atleast 6 characters"});
        }
        const existingUserByEmail = await user.findOne({email:email});
        if(existingUserByEmail){
            return res.status(400).json({success:false,message:"user already exists"});
        }
        const existingUserByUsername = await user.findOne({username:username});
        if(existingUserByUsername){
            return res.status(400).json({success:false,message:"that username already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const ProfilePics = ["./avatar1.png","/avatar2.png","/avatar3.png"];
        const image = ProfilePics[Math.floor(Math.random()*ProfilePics.length)];
        const newUser = new user({
            email,
            password:hashPassword,
            username,
            image
        })
        if(newUser){
            genTokenandSetCookie(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                success:true,
                user:{
                    ...newUser._doc,
                    password:""
                },
            });
        }
        else{
            res.status(400).json({
                "val":"went wrong"
            })
        }



    }
    catch(error){
        res.status(500).json({success:false,message:"Internal server error"});

    }
}


export async function login(req,res){
    try{
        const {email,password} = req.body;
        if(!email||!password){
            return res.status(400).json({success:false,message:"All fields required"});
        }
        const newUser = await user.findOne({email:email});
        if(!newUser){
            return res.status(404).json({success:false,message:"Invalid credentials"})
        }
        const isPasswordCorrect = await bcrypt.compare(password,newUser.password);
        if(!isPasswordCorrect){
            return res.status(400).json({success:false,message:"invalid cred"});
        }
         genTokenandSetCookie(newUser._id,newUser,res);
        res.status(200).json({
            success:true,
            user:{
                ...newUser._doc,
                password:""
            }
        })

    }
    catch(error){
        res.status(400).json({
            siccess:false,
            message:"some error"
        });
    }
}
export async function logout(req,res){
    try{
        res.clearCookie("jwt-netflix");
        res.status(200).json({success:true,message:"logged out successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"internal server error"});
    }
}
export async function authCheck(req, res) {
	try {
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}