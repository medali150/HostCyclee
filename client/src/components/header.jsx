import React, { useContext } from 'react'
import './header.css'
import { AppContent } from '../context/Appcontext'
const Header = () => {
  const {userData} =useContext(AppContent);
  return (
<div className="header-container">
 
  <img 
    src="assets/header_img.png" 
    alt="Header" 
    className="header-image w-64 h-64 mx-auto"
  />
  
 
  <h1 className="header-title text-7xl font-extrabold mt-6 text-center">
    Hey {userData ? userData.name : 'Developer'}!
    <img 
      src="assets/hand_wave.png" 
      alt="Wave" 
      className="wave-image inline-block w-16 h-16 ml-4"
    />
  </h1>
  

  <h2 className="text-5xl mt-6 text-center font-semibold">
    Welcome to our app
  </h2>
 
  <p className="text-2xl mt-4 text-center">
    Let's start with a quick product tour and we will have you up and running in no time!
  </p>
</div>

  
  )
}

export default Header