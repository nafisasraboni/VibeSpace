import { User } from '../models/user.model.js';
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export async function signup(req,res){
    try {
        const {email,password,username} = req.body;
        if(!email || !password || !username){
            return res.status(400).json({success:false,messege:"All fields are required"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({sucess:false,messege:"Invalid email"})   
        }
        if(password.length < 6){
            return res.status(400).json({sucess:false,messege:"Password must be at least 6 characters"})
        }
        const existingUserByEmail = await User.findOne({email:email})
        if(existingUserByEmail){
            return res.status(400).json({success:false,messege:"Email already exists"})
        }

        const existingUserByUsername = await User.findOne({username:username})
        if(existingUserByUsername){
            return res.status(400).json({success:false,messege:"Username already exists"})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const PROFILE_PICS = ["/avatar1.png","/avatar2.png","/avatar3.png"];
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

        const newUser = new User({
            email,
            password: hashedPassword,
            username,
            image
        });

            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                success: true,
                user: {
                    ...newUser._doc,
                    password:"",
                },
            });
        

    } catch (error) {
        console.log("Error in signup controller",error.messege)
        res.status(500).json({success:false,messege:"Internal server error"})
        
    }
}

export async function login(req,res){
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({success: false,messege: "All fields are required"});
        }
        const user = await User.findOne({email: email})
        if(!user){
            return res.status(404).json({success: false, messege:"Invalid credenrials"});
        }
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);

        if(!isPasswordCorrect)
            return res.status(400).json({success: false, messege: "Invalid credentials"});

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password:""
            }
        })
    } catch (error) {
        console.log("Error in login controller",error.messege);
        res.status(500).json({success: false, messege: "Internel server error"})

    }
}

export async function logout(req,res){
    try{
        res.clearCookie("jwt-netflix");
        res.status(200).json({ success: true, messege:"Logged out successfully"});

    }catch (error) {
        console.log("Error in logout controller", error.messege);
        res.status(500).json({ success: false, messege: "Internal server error"});
    }
} 

export const authCheck = async (req, res) => {
  try {
    
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: "Not authenticated - please log in" 
      });
    }

    
    const userData = {
      _id: req.user._id,
      username: req.user.username,
      email: req.user.email,
      createdAt: req.user.createdAt,
     
    };

    res.status(200).json({ 
      success: true,
      user: userData,
      message: "Authentication check successful"
    });

  } catch (error) {
    console.error("Auth check error:", error);
    
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Invalid token - please log in again"
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Session expired - please log in again"
      });
    }

    res.status(500).json({ 
      success: false,
      message: "Authentication check failed",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; //Sraboni