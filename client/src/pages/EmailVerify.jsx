import React, { useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { AppContent } from "../context/Appcontext"
import { toast } from "react-toastify"

const EmailVerify = () => {
  const { backendUrl, setIsLogin, userData, getUserData } = useContext(AppContent)
  const navigate = useNavigate()
  const inputsRef = useRef([])

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputsRef.current[index - 1].focus()
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const otpArray = inputsRef.current.map((e) => e.value)
      const otp = otpArray.join("")

      const { data } = await axios.post(`${backendUrl}/api/auth/verifyEmail`, { otp })
      if (data.success) {
        toast.success(data.message)
        getUserData()
        navigate("/Home")
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <img
        onClick={() => navigate("/Home")}
        src="/assets/logo.svg"
        alt="Logo"
        className="w-24 h-24 mb-8 cursor-pointer"
      />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <h1 className="text-2xl font-semibold text-center mb-4">Email Verify OTP</h1>
          <p className="text-center mb-6 text-gray-600">Enter the 6-digit code sent to your email.</p>
          <div className="flex justify-between mb-4">
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  required
                  className="w-10 h-10 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ref={(el) => (inputsRef.current[index] = el)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Verify Email
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmailVerify

