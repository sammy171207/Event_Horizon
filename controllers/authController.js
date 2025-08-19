
import User from "../models/User.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const signUp=async(req,res)=>{
    try {
        const{name,email,password,role}=req.body
        const existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }else{
            const hashedPassword=await bcrypt.hash(password,10)
            const user=await User.create({name,email,password:hashedPassword,role})
            console.log(user,"User created successfully")
            return res.status(201).json({message:"User created successfully"})
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Something went wrong"})
    }
}

const signIn=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const existingUser=await User.findOne({email})
        if(!existingUser){
            return res.status(404).json({message:"User not found"})
        }else{
            const isPasswordCorrect=await bcrypt.compare(password,existingUser.password)
            if(!isPasswordCorrect){
                return res.status(400).json({message:"Invalid credentials"})
            }else{
                const token=jwt.sign({_id:existingUser._id,email:existingUser.email},process.env.JWT_SECRET,{expiresIn:"1h"})
                return res.status(200).json({message:"Login successful",token})
            }
            }
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

export {signUp,signIn}