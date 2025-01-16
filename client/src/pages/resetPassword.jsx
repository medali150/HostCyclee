import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContent } from '../context/Appcontext';
import { toast } from 'react-toastify';
import './EmailVerify.css'
const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setotp] = useState(0);
  const [isotpSubmitted, setIsotpSubmitted] = useState(false);
 const {backendUrl ,setIsLogin ,userData, getUserData}=useContext(AppContent)
  const inputsRef=React.useRef([])
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    // Ajouter ici la logique pour vérifier l'email ou envoyer un OTP
  };
  const handeleInput= (e,index)=>{
    //hedi mta3 input filed 
    if(e.target.value.length>0 && index<inputsRef.current.length-1){
      inputsRef.current[index+1].focus()
    }
  }
  const handlekeyDown=(e,index)=>{
    if(e.key==='Backspace' && e.target.value === '' && index>0){
      inputsRef.current[index-1].focus()
    }

  }
  const onSumbitHandler= async (e)=>{
    try {
      e.preventDefault();
      const otpArray=inputsRef.current.map(e=>e.value);
      const otp=otpArray.join('')
 
      //send otp to backend
      const {data}=await axios.post('https://host-cycle-ji9x-jc6rrgn9k-aymens-projects-9ad69811.vercel.app/api/auth/verifyEmail',{otp})
      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/Home')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  }
  const onSubmitEmail=async(e)=>{
    e.preventDefault();
    try {
      const {data}=await axios.post('https://host-cycle-ji9x-jc6rrgn9k-aymens-projects-9ad69811.vercel.app/api/auth/sendResetOtp',{email})
    data.success ? toast.success(data.message):toast.error(data.message)
    data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
    
  }
const onSubmitOTP=async(e)=>{
  e.preventDefault();
  try {
    const {data}=await axios.post('https://host-cycle-ji9x-jc6rrgn9k-aymens-projects-9ad69811.vercel.app/api/auth/sendResetOtp',{email})
    const otpArray=inputsRef.current.map(e=>e.value);
    setotp(otpArray.join(''))
    setIsotpSubmitted(true)
    
  } catch (error) {
    toast.error(error.message)
  }
}
const onSubmitNewPassword=async(e)=>{

  e.preventDefault();
  try {
    const {data}=await axios.post('https://host-cycle-ji9x-jc6rrgn9k-aymens-projects-9ad69811.vercel.app/api/auth/resetPassword',{email,otp,newPassword})
    data.success ? toast.success(data.message):toast.error(data.message) 
    data.success && navigate('/Login') 
}catch (error) {
  toast.error(error.message)
  
}}
  return (
    <div className="login-container">
      <img
        onClick={() => navigate('/Home')}
        src="assets/logo.svg"
        alt="Logo"
        className="login-logo"
      />
         {!isEmailSent && (
      <form
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        onSubmit={onSubmitEmail}
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          reset password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter your registered email address.
        </p>
        <div className="input-container flex items-center">
          <img 
            src="assets/mail_icon.svg" 
            alt="Mail Icon" 
            className="input-icon mr-2" 
          />
         <input 
  type="email" 
  name="email" 
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email ID" 
  className="input-field flex-1 p-2 border border-gray-300 rounded-l"
  required
   />

          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>)}
      {isEmailSent && !isotpSubmitted && (
      <form onSubmit={onSubmitOTP} className='bg-slate-900 p-8 rounded-1g shadow-1g w-96 text-sm'>
      <h1 className='text-white text-2x1 font-semibold text-center mb-4'>reset otp password
      </h1>
      <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent
to your email id.</p>
<div className="container">
  {Array(6)
    .fill(0)
    .map((_, index) => (
      <input
        type="text"
        maxLength="1"
        key={index}
        required
        className="input-box" ref={e=> inputsRef.current[index]=e}
        onInput={(e)=>handeleInput(e,index)}
        onKeyDown={(e)=>handlekeyDown(e,index)}

      />
    ))}
</div>
    <button>Verify email</button>
 
      </form>)}
      {isotpSubmitted && (
      <form 
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        onSubmit={onSubmitNewPassword}
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          new password
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the new password below.
        </p>
        <div className="input-container flex items-center">
          <img 
            src="assets/mail_icon.svg" 
            alt="Mail Icon" 
            className="input-icon mr-2" 
          />
          <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="input-field flex-1 p-2 border border-gray-300 rounded-l"
              required
            />

          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>) } 
    </div>
   
  );
};

export default ResetPassword
