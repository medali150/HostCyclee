import express from 'express';
import {  addHostingCycleToCart, chatWithGemini, deleteAdmin, deleteHostingCycle, deleteUser, deleteWebsite, getAllHostingCycles,  isAuthenticated, login, logout, makeAdmin, register, registerHostingCycle, registerWebsite, resetPassword, sendResetOtp, sendVerifyOtp, verifyAdmin, verifyEmail } from '../controllers/authController.js';
import  userAuth  from '../middleware/userAuth.js'; 
import { addnamewebsite } from '../controllers/userController.js';


const authRouter = express.Router(); // Correction du nom du routeur
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/sendVerifyOtp',userAuth,sendVerifyOtp);
authRouter.post('/verifyEmail',userAuth,verifyEmail);
authRouter.get('/isAuthenticated',userAuth,isAuthenticated);
authRouter.post('/sendResetOtp',sendResetOtp);
authRouter.post('/resetPassword',resetPassword);
authRouter.post('/registerHostingCycle',registerHostingCycle);
authRouter.get('/getAllHostingCycles',getAllHostingCycles);
authRouter.delete('/hostingCycles/:id', deleteHostingCycle);
authRouter.get('/verifyAdmin', verifyAdmin);





// Authentication Routes
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

// Email Verification Routes
authRouter.post('/sendVerifyOtp', userAuth, sendVerifyOtp);
authRouter.post('/verifyEmail', userAuth, verifyEmail);

// User Authentication Check
authRouter.get('/isAuthenticated', userAuth, isAuthenticated);

// Password Reset Routes
authRouter.post('/sendResetOtp', sendResetOtp);
authRouter.post('/resetPassword', resetPassword);

// Hosting Cycle Routes
authRouter.post('/registerHostingCycle', registerHostingCycle);
authRouter.get('/getAllHostingCycles', getAllHostingCycles);
authRouter.delete('/hostingCycles/:id', deleteHostingCycle);
authRouter.delete('/deleteUser/:id', deleteUser);


// Admin Verification Route
authRouter.get('/verifyAdmin', verifyAdmin);

authRouter.delete('/admin/:id', deleteAdmin); 
// Cart Routes
authRouter.post("/addHostingCycleToCart/:userId",userAuth,addHostingCycleToCart);
authRouter.post("/addnamewebsite/:userId",userAuth,addnamewebsite);
authRouter.post("/registerWebsite", registerWebsite);
authRouter.delete("/delete-website/:userId/:websiteId", deleteWebsite);


authRouter.put("/makeAdmin/:id", makeAdmin);
authRouter.post('/Chat',chatWithGemini);

export default authRouter;







// N'oubliez pas d'exporter le routeur