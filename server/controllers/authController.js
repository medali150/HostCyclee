import bcrypt from 'bcryptjs'; //Une bibliothèque utilisée pour hacher les mots de passe.
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import transporter from '../config/nodemailer.js';
import { SchemaTypeOptions } from 'mongoose';
import mongoose from 'mongoose';
import HostingCycle from '../models/HostingCycle.js'; // Adjust the path as needed

export const register =async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name || !email ||!password){
        return res.json({success:false,message:'Missing Details'});
    }
    try{
       const existingUser=await userModel.findOne({email})
       if(existingUser){
        return res.json({success:false,message:"user already exists"});
       }
     const hashedPassword=await bcrypt.hash(password,10);//Hachage du mot de passe : Utiliser bcrypt pour hacher le mot de passe avant de le stocker.
     const user =new userModel({name,email,password:hashedPassword});//Création de l'utilisateur : Utiliser le modèle utilisateur pour sauvegarder un nouvel utilisateur dans la base de données.
     await user.save();
        
     const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'}); 
    
     res.cookie('token',token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:process.env.NODE_ENV==='production' ?
        'none':'strict',
        maxAge:7*24*60*60*1000//7days
     });
     
      const mailoptions={
          from:process.env.SENDER_EMAIL,
          to:email,
          subject:'welcome to our app',
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
      }
      transporter.sendMail(mailoptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.json({ success: false, message: error.message }); // Ensure you return here
        } else {
            console.log('Email sent: ' + info.response);
            return res.json({ success: true }); // Ensure you return here to prevent further responses
        }
    });
    return res.json({success:true});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}
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
        const mailoptions={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'welcome to our app',
            text:`your otp is ${otp}`
        }

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
      const { namePAckage, startDate, endDate, cost, duration } = req.body;
  
      // Validate required fields
      if (!namePAckage || !startDate || !endDate || !cost || !duration) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
      }
  
      // Create a new hosting cycle
      const hostingCycle = new HostingCycle({
        namePAckage,
        startDate,
        endDate,
        cost,
        duration,
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