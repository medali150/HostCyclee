import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
connectDB();
const app =express();
const port =process.env.PORT || 4000;

const allowedOrigins=['https://host-cycle-prqy2smta-aymens-projects-9ad69811.vercel.app']
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin :allowedOrigins, credentials:true}));
//api endpoints
app.get(`/`,(req,res)=> res.send("slm winik cv hello "));
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);
app.listen(port, ()=>console.log(`server started on port : ${port}`));
