
import User from "../models/User.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { handleError, handleValidationError } from '../utils/errorHandler.js';

const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return handleValidationError(res, error);
        }
        return handleError(res, error, "Failed to create user");
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        // Verify password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                _id: existingUser._id, 
                email: existingUser.email,
                role: existingUser.role 
            },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                role: existingUser.role
            }
        });
    } catch (error) {
        return handleError(res, error, "Failed to authenticate user");
    }
}

export { signUp, signIn }