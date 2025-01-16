import React, { useContext } from 'react'
import './EmailVerify.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AppContent } from '../context/Appcontext';
import { toast } from 'react-toastify';
const EmailVerify = () => {
    const {backendUrl ,setIsLogin ,userData, getUserData}=useContext(AppContent)
  const navigate= useNavigate();
  const inputsRef=React.useRef([])
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
  return (
    <div  className="login-container">
       <img
    onClick={()=>navigate('/Home')}
      src="assets/logo.svg"
      alt="Logo"
      className="login-logo"
      // Add functionality if needed
    />
      <form onSubmit={onSumbitHandler} className='bg-slate-900 p-8 rounded-1g shadow-1g w-96 text-sm'>
      <h1 className='text-white text-2x1 font-semibold text-center mb-4'>Email
      Verify OTP</h1>
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
 
      </form>
    </div>
  )
}

export default EmailVerify
