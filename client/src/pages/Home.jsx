import React from 'react'
import Navbar from '../components/navbar'
import Header from '../components/header'
import './home.css'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate= useNavigate();
  return (
    <div className="home-container">
      <Navbar/>
      <Header/>
    </div>
  )
}

export default Home
