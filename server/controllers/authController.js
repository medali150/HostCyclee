import bcrypt from 'bcryptjs'; //Une bibliothèque utilisée pour hacher les mots de passe.
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import transporter from '../config/nodemailer.js';
import { SchemaTypeOptions } from 'mongoose';
import mongoose from 'mongoose';
import HostingCycle from '../models/HostingCycle.js'; // Adjust the path as needed
import websiteModel from '../models/websiteSchema.js';

export const register = async (req, res) => {
  const { name, email, password, Contry } = req.body;
  if (!name || !email || !password || !Contry) {
      return res.json({ success: false, message: 'Missing Details' });
  }
  try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
          return res.json({ success: false, message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
      const user = new userModel({
          name,
          email,
          password: hashedPassword,
          Contry,
          startDate: Date.now() // Set the start date to the current time
      });

      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      const mailoptions = {
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: 'Welcome to our app',
          html: `
              <html>
              <head>
                  <style>
                      body {
                          font-family: 'Arial', sans-serif;
                          background-color: #f0f8ff;
                          margin: 0;
                          padding: 0;
                          color: #333;
                      }
                      .container {
                          width: 100%;
                          max-width: 600px;
                          margin: 0 auto;
                          background-color: #fff;
                          padding: 20px;
                          border-radius: 10px;
                          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                      }
                      .header {
                          text-align: center;
                          margin-bottom: 30px;
                      }
                      .header h1 {
                          color: #ff6347;
                          font-size: 2.5em;
                      }
                      .content {
                          text-align: center;
                          font-size: 1.2em;
                          line-height: 1.6;
                          color: #555;
                      }
                      .content p {
                          margin-bottom: 20px;
                      }
                      .footer {
                          text-align: center;
                          margin-top: 30px;
                          font-size: 0.9em;
                          color: #888;
                      }
                      .footer a {
                          color: #ff6347;
                          text-decoration: none;
                      }
                  </style>
              </head>
              <body>
                  <div class="container">
                      <div class="header">
                          <h1>Welcome to Our App!</h1>
                      </div>
                      <div class="content">
                          <p>We are thrilled to have you on board. Get ready to explore all the amazing features our app has to offer!</p>
                          <p>Feel free to contact us if you need any assistance. We're here to help!</p>
                      </div>
                      <div class="footer">
                          <p>Stay connected with us!</p>
                          <p><a href="https://www.example.com">Visit our website</a></p>
                      </div>
                  </div>
              </body>
              </html>
          `
      };

      transporter.sendMail(mailoptions, (error, info) => {
          if (error) {
              console.log('Error sending email:', error);
              return res.json({ success: false, message: error.message });
          } else {
              console.log('Email sent: ' + info.response);
              return res.json({ success: true, message: 'Registration successful' });
          }
      });

  } catch (error) {
      res.json({ success: false, message: error.message });
  }
};

export const login = async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.json({success:false, message:'email and password are required '})
      
    }
    try{
        const user= await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not fond"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"password not fond"})
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'}); 
   
     res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production' ?
        'none':'strict',
        maxAge:7*24*60*60*1000//7days

     })
       return res.json({success:true})

    }
    
    catch(error){
        return res.json({success: false, message: error.message}) //lmessage ili 3y5arjah error

    }

}
export const logout=async(req,res)=>{
    try{
        res.clearCookie('token',{
                httpOnly:true,
                secure:process.env.NODE_ENV==='production',
                sameSite:process.env.NODE_ENV==='production' ?
                'none':'strict',
              
            })
            return res.json({success:true,message:"logged out"});

    }catch(error){
        return res.json({success: false, message: error.message}) //lmessage ili 3y5arjah error

    }
}
export const sendVerifyOtp= async(req,res)=>{
    try {
        const {userId}=req.body;
        const user=await userModel.findById(userId);
        if (user.isAcconuntVerified) {
            return res.json({success:false,message:"accout verified already :)"})

            
        }
        const otp = String(Math.floor(100000+Math.random()*900000));
        user.verifyotp=otp; //kol utilisateur 3an7otlah otp wou mba3ed fi verification 3an9aren bih 
        user.verifyotpexpireAt=Date.now()+24*60*60*1000;
        await user.save();
        //save user in the database 
        const mailoptions = {
          from: process.env.SENDER_EMAIL, // Ensure this environment variable is set
          to: user.email, // Ensure 'user.email' exists and is valid
          subject: 'Account Verification',
          html: `
              <html>
                  <head>
                      <style>
                          body {
                              font-family: Arial, sans-serif;
                              background-color: #f4f4f4;
                              margin: 0;
                              padding: 20px;
                          }
                          .container {
                              background-color: #ffffff;
                              padding: 20px;
                              border-radius: 5px;
                              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                          }
                          h1 {
                              color: #333333;
                              text-align: center;
                          }
                          p {
                              color: #555555;
                              line-height: 1.6;
                          }
                          .otp {
                              color: blue;
                              font-weight: bold;
                              font-size: 1.5em;
                          }
                          .footer {
                              text-align: center;
                              margin-top: 20px;
                              font-size: 0.9em;
                              color: #888888;
                          }
                      </style>
                  </head>
                  <body>
                      <div class="container">
                          <h1>Welcome to Our App!</h1>
                          <p>Dear ${user.name},</p>
                          <p>Thank you for registering with us. We are excited to have you onboard.</p>
                          <p>To complete your registration, please verify your account using the One Time Password (OTP) provided below:</p>
                          <p class="otp">Your OTP is: ${otp}</p>
                          <p>This OTP is valid for a short time, so please use it as soon as possible.</p>
                          <p>If you did not request this, please ignore this email.</p>
                          <p>If you have any questions, feel free to reach out to our support team.</p>
                          <p>Thank you for choosing our service!</p>
                      </div>
                      <div class="footer">
                          <p>&copy; ${new Date().getFullYear()} Our App. All rights reserved.</p>
                      </div>
                  </body>
              </html>
          `
      };
      

        await transporter.sendMail((mailoptions),(error,info)=>{
            if (error){
                return res.json({success:false,message:error.message});
            }else{
                console.log('Email sent: ' + info.response);
                return res.json({success:true})
            }
        });
        return res.json({success:true,message:"Email sent successfully"})
    } catch (error) {
        return res.json({success:false,message:error.message})
        
    }
}
export const verifyEmail=async(req,res)=>{
    
        const{userId,otp}=req.body;
        if (!userId || !otp) {
            return res.json({success:false,message:"missing details"})
            
        }
        try {
            const user=await userModel.findById(userId);
            if (!user){
                return res.json({success:false,message:"user not found"
                })
            }
            if(user.verifyotp===''|| user.verifyotp!==otp){
                return res.json({success:false,message:"invalid otp"})
            }
            if (user.verifyotpexpireAt<Date.now()){
                return res.json({success:false,message:"otp expired"});
            }
            user.isAcconuntVerified=true;
            user.verifyotp='';
            user.verifyotpexpireAt=0;
            await user.save();
            return res.json({success:true,message:"Email verified successfully"})
    } catch (error) {
        return res.json({success:false,message:error.message
        })
        
    }
}
export const isAuthenticated=async(req,res)=>{
    try {
        return res.json({success:true,message:"user authenticated"})
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}
export const sendResetOtp=async(req,res)=>{
    const {email}=req.body;
    if (!email) {
        return res.json({success:false,message:"email is required"})
        
    }
    try {
        const user=await userModel.findOne({email});
        if (!user) {
            return res.json({success:false,message:"user not found"})
        }
        const otp = String(Math.floor(100000+Math.random()*900000));
        user.resetOtp=otp; //kol utilisateur 3an7otlah otp wou mba3ed fi verification 3an9aren bih 
        user.resetOtpExpireAt=Date.now()+15*60*1000;
        await user.save();
        //save user in the database 
        const mailoptions={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'welcome to our app',
            text:`your otp is ${otp}
            use this otp to proceed with resetting your password `
        }

        await transporter.sendMail((mailoptions),(error,info)=>{
            if (error){
                return res.json({success:false,message:error.message});
            }else{
                console.log('Email sent: ' + info.response);
                return res.json({success:true})
            }
        });
        return res.json({success:true,message:"otp sent to your email"})
        
    } catch (error) {
        return res.json({success:false,message:error.message})
    }
}
//reset user password 
export const resetPassword=async (req,res)=>{
    const {email ,otp,newPassword}=req.body;
if (!otp || !email || !newPassword) {
    return res.json({success: false,message:"please provide all fields"})
    
}
try {
    const user=await userModel.findOne({email});
    if (!user){
     return res.json({success:false,message:"user not found"});
    }
    if (user.resetOtp=="" || user.resetOtp!=otp) {
        return res.json({success:false,message:"invalid otp"})
        
    }
    if (user.resetOtpExpireAt<Date.now()){
        return res.json({success:false,message:"otp expired"})
        
    }
    const hashedPassword=await bcrypt.hash(newPassword,10);
    user.password=hashedPassword;
    user.resetOtp="";
    user.resetOtpExpireAt=0;
    await user.save();
    return res.json({success:true,message:"password reset successfully"})
} catch (error) {
    return res.json({success:false,message:error.message})
    
}

}
export const registerHostingCycle = async (req, res) => {
    try {
      const { namePAckage, startDate, endDate, cost, duration, image,description} = req.body;
  
      // Validate required fields
      if (!namePAckage || !startDate || !endDate || !cost || !duration || !image || !description) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
  
      // Create a new hosting cycle
      const hostingCycle = new HostingCycle({
        namePAckage,
        startDate,
        endDate,
        cost,
        duration,
        image,
        description,
      });
  
      // Save to the database
      await hostingCycle.save();
  
      res.status(201).json({ success: true, message: 'Hosting cycle registered successfully', data: hostingCycle });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
export const getAllHostingCycles = async (req, res) => {
    try {
      // Fetch all hosting cycles from the database
      const hostingCycles = await HostingCycle.find();
  
      // If no cycles are found
      if (hostingCycles.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No hosting cycles found',
        });
      }
  
      // Return the hosting cycles as a JSON response
      res.status(200).json({
        success: true,
        data: hostingCycles,
      });
    } catch (error) {
      // Handle any errors that occur during the database query
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id); // Changez User par userModel
  
        // If the user wasn't found
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
  
        res.json({ success: true, message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};
  export const deleteHostingCycle = async (req, res) => {
    try {
      const { id } = req.params; // Get the ID from the route parameters
  
      // Find the hosting cycle by ID and delete it
      const hostingCycle = await HostingCycle.findByIdAndDelete(id);
  
      // If the hosting cycle doesn't exist
      if (!hostingCycle) {
        return res.status(404).json({
          success: false,
          message: 'Hosting cycle not found',
        });
      }
  
      // Successfully deleted the hosting cycle
      res.status(200).json({
        success: true,
        message: 'Hosting cycle deleted successfully',
      });
    } catch (error) {
      // Handle any errors that occur during the database operation
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
  
  export const verifyAdmin = async (req, res) => {
    try {
      const userId = req.session.userId; // Assuming you're storing the user ID in the session
      if (!userId) {
        return res.status(401).json({ success: false, message: "User not authenticated" });
      }
  
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Check if the user is an admin
      if (user.isAdmin) {
        return res.json({ success: true, message: "User is an admin" });
      } else {
        return res.status(403).json({ success: false, message: "Not an admin" });
      }
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  // Add an item to the user's cart// Adjust path if needed

  // Add an item to the user's cart
  export const removePackageFromCart = async (req, res) => {
    try {
        const { userId, packageId } = req.body; // Expecting userId and packageId in the request body

        // Find the user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Filter out the package by its ID
        user.cart = user.cart.filter(pkg => pkg.id !== packageId);
        await user.save();

        res.json({
            success: true,
            message: "Package removed successfully",
            cart: user.cart, // Return updated cart
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

  // Endpoint to simulate user clicking 'Add to Cart' and receiving the updated cart
  // Assuming this is the endpoint the frontend hits when the user clicks the 'Add to Cart' button.
  

// Get the user's cart
export const getUserCart = async (req, res) => {
    const { userId } = req.body; // Assuming userId is passed in the request body

    try {
        // Find the user and retrieve the cart
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Respond with the user's cart data
        res.json({
            success: true,
            cart: user.cart
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteAdmin = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAdmin = await Admin.findByIdAndDelete(id);
  
      // If the admin wasn't found
      if (!deletedAdmin) {
        return res.status(404).json({ success: false, message: 'Admin not found' });
      }
  
      res.json({ success: true, message: 'Admin deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
  export const addHostingCycleToCart = async (req, res) => {
    try {
      const { userId } = req.params; // Fetch userId from route params
      const { hostingCycleId } = req.body; // Fetch hostingCycleId from request body
  
      // Validate userId and hostingCycleId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: "Invalid userId" });
      }
      if (!mongoose.Types.ObjectId.isValid(hostingCycleId)) {
        return res.status(400).json({ success: false, message: "Invalid hostingCycleId" });
      }
  
      // Check if the user exists
      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Check if the hosting cycle exists
      const hostingCycle = await HostingCycle.findById(hostingCycleId);
      if (!hostingCycle) {
        return res.status(404).json({ success: false, message: "HostingCycle not found" });
      }
  
      // Add the hosting cycle to the user's cart
      user.cart.push(hostingCycle._id);
  
      // Save the updated user
      await user.save();
  
      // Return the updated cart information
      res.json({
        success: true,
        message: "HostingCycle added to cart successfully",
        cart: user.cart, // You can populate this if you want detailed cart info
      });
    } catch (error) {
      console.error("Error in addHostingCycleToCart:", error.message);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  // Delete a user



export const registerWebsite = async (req, res) => {
    const { name, url, description, ownerId } = req.body;
  
    // Check if all required fields are provided
    if (!name || !url || !ownerId) {
      return res.json({ success: false, message: "Missing required fields" });
    }
  
    try {
      // Check if the website with the same URL already exists
      const existingWebsite = await websiteModel.findOne({ url });
      if (existingWebsite) {
        return res.json({ success: false, message: "Website already exists." });
      }
  
      // Create a new website entry
      const newWebsite = new websiteModel({
        name,
        url,
        description,
        owner: ownerId,
      });
  
      await newWebsite.save();
  
      // Find the user and add the new website's ID to their websites array
      const user = await userModel.findById(ownerId);
      if (!user) {
        return res.json({ success: false, message: "User not found." });
      }
  
      // Add the new website to the user's websites array
      user.websites.push(newWebsite._id);
  
      await user.save();
  
      // Return success response with the newly created website
      return res.json({
        success: true,
        message: "Website registered successfully",
        website: newWebsite,
      });
    } catch (error) {
      // Return error response if something goes wrong
      return res.json({ success: false, message: error.message });
    }
  };
  export const deleteWebsite = async (req, res) => {
    const { userId, websiteId } = req.params; // Get userId and websiteId from params
  
    try {
      // Remove the website from the user's websites array
      const user = await userModel.findByIdAndUpdate(
        userId,
        { $pull: { websites: websiteId } }, // $pull removes the websiteId from the array
        { new: true } // Return the updated user
      );
  
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Optionally, delete the website document itself from the website collection
      const website = await websiteModel.findByIdAndDelete(websiteId);
  
      if (!website) {
        return res.status(404).json({ success: false, message: "Website not found" });
      }
  
      // Return a success response
      res.json({
        success: true,
        message: "Website successfully deleted from the user and the collection",
        user: {
          id: user._id,
          websites: user.websites, // The updated list of websites for the user
        }
      });
  
    } catch (error) {
      console.error("Error deleting website:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

/***************************************Update user Role “user” <-> “admin”***********************************
// Update user role
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    //  We will add cloudinary later
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
   res.status(200).json({
    success: true,
    message: "Role Updated Successfully"
   })
});*/


/***************************************************"ili ymsou 5atini ana raw mouch rajel :ama ka t7eb tstanfa3 mino 7el chof: "{https://devendrajohari9.medium.com/nodejs-authentication-authorisation-ee04ff744c80} */