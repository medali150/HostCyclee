import express from 'express';
import { deleteHostingCycle, getAllHostingCycles,  isAuthenticated, login, logout, register, registerHostingCycle, resetPassword, sendResetOtp, sendVerifyOtp, verifyAdmin, verifyEmail } from '../controllers/authController.js';
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





export default authRouter; // N'oubliez pas d'exporter le routeur