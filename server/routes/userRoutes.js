import express from "express"
import userAuth from "../middleware/userAuth.js";
import {  getAllUsers, getUserById, getUserData, uploadProfileImage } from "../controllers/userController.js";
import { deleteUser } from "../controllers/authController.js";

const userRouter= express.Router();

userRouter.get('/data',userAuth,getUserData);
userRouter.get('/getAllUsers',userAuth,getAllUsers);
userRouter.get('/:userId',userAuth,getUserById);
userRouter.post('/upload-profile-image/:userId',userAuth,uploadProfileImage);
userRouter.delete('/users/:id', deleteUser); 



export default userRouter;