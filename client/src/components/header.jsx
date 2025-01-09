import React, { useContext } from 'react'
import './header.css'
import { AppContent } from '../context/Appcontext'
const Header = () => {
  const {userData} =useContext(AppContent);
  return (
    <div className="header-container">
    <img src="assets/header_img.png" alt="Header" className="header-image" />
    <h1 className="header-title">
      Hey { userData ? userData.name : 'Developer'}!
      <img src="assets/hand_wave.png" alt="Wave" className="wave-image" />
    </h1>
    <h2>Welcome to our app </h2>
    <p> let's start with a quik product tour and we will have you up and running in no time ! </p>
    <button>get started </button>
  </div>
  )
}

export default Header
