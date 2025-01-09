import userModel from "../models/userModel.js";



export const getUserData=async(req,res)=>{
    try {
        const {userId}=req.body;
        const user=await userModel.findById(userId)
        if (!user) {
            return res.json({success:false,message:"user not found "})
            
        }
        res.json({success:true,
            userData:{
              
              name:user.name,
              isAcconuntVerified:user.isAcconuntVerified,
              isAdmin:user.isAdmin,
            
              
            }})

        
    } catch (error) {
      return res.json({success:false,message:error.message})
    }
}


// Get all users for the admin dashboard
export const getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await userModel.find({}, '-password'); // Exclude the password field for security reasons
        if (!users) {
            return res.json({ success: false, message: "No users found" });
        }

        res.json({
            success: true,
            users: users.map(user => ({
                id: user._id,
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAcconuntVerified,
                isAdmin: user.isAdmin,
                createdAt: user.createdAt, // Include additional details if needed
                updatedAt: user.updatedAt
            }))
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
export const getUserById = async (req, res) => {
  const { userId } = req.params; // Extract the userId from the route parameters

  try {
      // Fetch the user by ID from the database
      const user = await userModel.findById(userId).select('-password'); // Exclude password for security

      if (!user) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      res.json({
          success: true,
          user: {
              id: user._id,
              name: user.name,
              email: user.email,
              isAccountVerified: user.isAcconuntVerified,
              isAdmin: user.isAdmin,
              startDate: user.startDate,
              endDate: user.endDate,
              cost: user.cost,
              duration: user.duration,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
          }
      });
  } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
  }
};
export const verifyAdmin = async (req, res) => {
  try {
      const { userId } = req.body; // Get userId from request body

      // Find the user in the database
      const user = await userModel.findById(userId);
      if (!user) {
          return res.json({ success: false, message: "User not found" });
      }

      // Check if the user is an admin
      if (user.isAdmin) {
          return res.json({
              success: true,
              message: "User is an admin",
          });
      } else {
          return res.json({
              success: false,
              message: "User is not an admin",
          });
      }
  } catch (error) {
      return res.json({ success: false, message: error.message });
  }
};

import express from 'express';
import multer from 'multer';
import path from 'path';


const app = express();

// Set up Multer storage configuration to store images locally
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Local folder where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Generate unique file name
  }
});

const upload = multer({ storage: storage });

// Route to upload profile image
export const uploadProfileImage = async (req, res) => {
  const { userId } = req.params; // Extract userId from the route parameters

  // Ensure the file is uploaded
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image uploaded' });
  }

  const imageUrl = req.file.path; // Path to the uploaded image

  try {
    // Find user by ID and update their profile image URL
    const updatedUser = await userModel.findByIdAndUpdate(userId, { image: imageUrl }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Return the updated user info
    res.json({
      success: true,
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAccountVerified: updatedUser.isAcconuntVerified,
        isAdmin: updatedUser.isAdmin,
        startDate: updatedUser.startDate,
        endDate: updatedUser.endDate,
        cost: updatedUser.cost,
        duration: updatedUser.duration,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
        image: updatedUser.image, // Add the image field to the response
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Use the middleware to handle image upload
app.post('/upload-profile-image/:userId', upload.single('profileImage'), uploadProfileImage);

// Get all users for the admin dashboard
