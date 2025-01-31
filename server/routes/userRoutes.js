import express from "express"
import { userAuth } from '../middleware/userAuth.js'; 
import {  getAllUsers, getUserById, getUserData } from "../controllers/userController.js";
import { addHostingCycleToCart, deleteUser } from "../controllers/authController.js";

const userRouter= express.Router();

userRouter.get('/data',userAuth,getUserData);
userRouter.get('/getAllUsers',getAllUsers);
userRouter.get('/:userId',userAuth,getUserById);

userRouter.delete('/users/:id', deleteUser); 
userRouter.post("/addHostingCycleToCart/:userId",userAuth,addHostingCycleToCart);


export default userRouter;