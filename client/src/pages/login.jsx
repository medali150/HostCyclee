import React, { useContext, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/Appcontext'

import axios from 'axios'

import { toast } from 'react-toastify';
const Login = () => {
  const navigate =useNavigate()
  const {backendUrl ,setIsLogin , getUserData}= useContext(AppContent);
const [state,setState]=useState('sign up') 
const [name,setname]=useState('')
const [email,setemail]=useState('')
const [password,setpassword]=useState('')
const [country, setCountry] = useState('');
const onSubitHundler =async(e)=>{
  try {
    e.preventDefault();
    axios.defaults.withCredentials=true;
    if (state==='sign up'){
     const {data}= await axios.post('http://localhost:4000/api/auth/register',{name,email,password,Contry: country})
      if (data.success){
        setIsLogin(true)  
        getUserData()
        navigate('/Home')
      }else{
        toast.error(data.message)
      }
    } else {
      if (state==='login'){
        const {data}= await axios.post('http://localhost:4000/api/auth/login',{email,password})
         if (data.success) {
          setIsLogin(true)
          getUserData()
          navigate('/Home')
         }else{
           toast.error(data.message)
         }
       }
      
      
      
    }
  } catch (error) {
    
  }
}
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
      ...prevData,
      [name]: value
  }));
};
const [isOpen, setIsOpen] = useState(false);

const toggleSidebar = () => {
   setIsOpen(!isOpen);
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
      const response = await axios.post('http://localhost:4000/api/auth/registerHostingCycle', formData, {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
      });

      if (response.data.success) {
          alert('Hosting cycle added successfully');
      } else {
          alert(`Error: ${response.data.message}`);
      }
  } catch (error) {
      alert('Server error: Unable to register hosting cycle');
  }
};
  const [formData, setFormData] = useState({
        namePAckage: '',
        startDate: '',
        endDate: '',
        cost: '',
        duration: ''
    });

 
  return (
    <div className="login-container bg-white" style={{ backgroundColor: 'white' }}>
  
    
    <div className="flex-shrink-0">
  <span className="login-logo text-2xl font-bold text-black-600" alt="Logo" onClick={() => navigate('/Home')}>HostCycle</span>
</div>

    <div className="login-content">
      <h2>{state === 'sign up' ? 'Create Account' : 'Login to Your Account'}</h2>
      <p>{state === 'sign up' ? 'Create your account' : 'Login to your account!'}</p>
      <form className="login-form" onSubmit={onSubitHundler}>
        { state==='sign up' &&(
          <>
        <div className="input-container">
          <img src="assets/person_icon.svg" alt="Person Icon" />
          <input type="text" placeholder="Enter your username" 
          onChange={(e)=> setname(e.target.value)}
          value={name}
          />
        </div>
        <div className="input-container">
                <label>Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value="">Select Country</option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Algerie">Algerie</option>
                  <option value="Egypt">Egypt</option>
                  <option value="Libya">Libya</option>
                </select>
              </div>

       
   </> ) }
        <div className="input-container">
          <img src="assets/lock_icon.svg" alt="Lock Icon" />
          <input type="password" placeholder="Enter your password" 
          onChange={(e)=> setpassword(e.target.value)}
          value={password}/>
        </div>
       
        <div className="input-container">
          <img src="assets\mail_icon.svg" alt="Lock Icon" />
          <input type="email" placeholder="Enter your Email" 
          onChange={(e)=> setemail(e.target.value)}
          value={email}/>
        </div>
        <p className='' onClick={()=>navigate('/Resetpassword')}>forget password</p>
        <button type="submit" className="submit-button">
          {state}
        </button>
      </form>
      {state ==='sign up' ? (<p>Already have an account ?{' '}<span onClick={()=>setState('login')}> login here</span></p>
      )
      :
      (<p>Don't have an account ?{' '}<span onClick={()=>setState('sign up')}>sign here</span></p>
        )}
      
      
    </div>
  </div>
  )
}

export default Login
