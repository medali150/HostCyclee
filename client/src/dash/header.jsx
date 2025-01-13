'use client'

import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContent } from '../context/Appcontext'
import { ChevronDown, LogOut, Mail, User } from 'lucide-react'

const Aymen = () => {
  const navigate = useNavigate()
  const { userData, setIsLogin, setUserData } = useContext(AppContent)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const sendVerificationOTP = async () => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/auth/sendVerifyOtp')
      if (data.success) {
        toast.success(data.message)
        navigate('/EmailVerify')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      const { data } = await axios.post('http://localhost:4000/api/auth/logout')
      if (data.success) {
        setIsLogin(false)
        setUserData(null)
        navigate('/Home')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
        <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-black-600">HostCycle</span>
            </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/Home" className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300">Home</Link>
              <Link to="/Commerce" className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300">News</Link>
              {userData && (
                <Link to="/Compte" className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300">Account</Link>
              )}
              {userData?.isAdmin && (
                <Link to="/Admin" className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-lg font-medium transition duration-300">Dashboard</Link>
              )}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {userData ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center transition duration-300"
                  >
                    <User className="mr-2 h-5 w-5" />
                    {userData.name}
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      {!userData.isAcconuntVerified && (
                        <button
                          onClick={sendVerificationOTP}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
                        >
                          <Mail className="inline mr-2 h-4 w-4" /> Verify Email
                        </button>
                      )}
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-300"
                      >
                        <LogOut className="inline mr-2 h-4 w-4" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
  onClick={() => navigate('/Login')}
  className="text-white bg-white hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center inline-flex items-center transition duration-300"
>
                  Login
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Aymen

