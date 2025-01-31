import React, { useContext, useState } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setIsLogin, setUserData } = useContext(AppContent);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user is admin
 
  const sendVerificationOTP = async () => {
    try {
      const { data } = await axios.post('https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/sendVerifyOtp');
      if (data.success) {
        toast.success(data.message);
        navigate('/EmailVerify');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post('https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/logout');
      if (data.success) {
        setIsLogin(false);
        setUserData(null);
        navigate('/Home');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">HostCycle</div>
        <button className="mobile-nav-toggle" aria-label="Toggle navigation">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">News</a></li>

          {userData ? (
            <>
              <li><a href="#services">Compte</a></li>
              {userData.isAdmin && (
                <li><a href="/Admin">Dashboard</a></li>
              )}
              <li className="user-info">
                <span>{userData.name[0].toUpperCase()}</span>
                <div className="user-dropdown">
                  <ul>
                    {!userData.isAcconuntVerified && (
                      <li onClick={sendVerificationOTP}>Verify Email</li>
                    )}
                    <li onClick={logout}>Logout</li>
                  </ul>
                </div>
              </li>
            </>
          ) : (
            <button className="login-button" onClick={() => navigate('/Login')}>
              Login <img src="assets/arrow_icon.svg" alt="" />
            </button>
          )}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
