import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    name:{type:String , required:true },
    email:{type: String, required:true},
    password:{type:String ,required:true},
    verifyotp:{type:String,default:''},
    verifyotpexpireAt:{type: Number, default:0},
    isAcconuntVerified:{type:Boolean,default:false},
    resetOtp:{type:String,default:''},
    resetOtpExpireAt:{type : Number,default:0},
    isAdmin: { type: Boolean, default: false },
    startDate: { type: Date },
    endDate: { type: Date},
    cost: { type: Number},
    Contry: { type: String, enum: ['Tunisia', 'Morocco','Algerie','Egypt','Libya'] },
    duration: { type: String, enum: ['6 months', '1 year'] },
    image: { type: String, default: '' }

})
const userModel = mongoose.models.user || mongoose.model('user',userSchema)


export default userModel; 
