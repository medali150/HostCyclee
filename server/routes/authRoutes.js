import express from 'express';
import {  deleteAdmin, deleteHostingCycle, deleteUser, getAllHostingCycles,  isAuthenticated, login, logout, register, registerHostingCycle, resetPassword, sendResetOtp, sendVerifyOtp, verifyAdmin, verifyEmail } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';


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


export default authRouter;






// N'oubliez pas d'exporter le routeur