import React, { useContext } from 'react'

import Navbar from '../components/navbar'
import Header from '../components/header'
import './home.css'
import { useNavigate } from 'react-router-dom'
import Footer from '../dash/footer'
import Aymen from '../dash/header'
import Hero from '../dash/hero'
import { AppContent } from '../context/Appcontext'
const Home = () => {
  const {userData} =useContext(AppContent)
    const navigate= useNavigate();
  return (
    <div className="home-container">
      <Aymen/>
    
     
      <Hero/>
      
      <Footer/>
    </div>
  )
}

export default Home
