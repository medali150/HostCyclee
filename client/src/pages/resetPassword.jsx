import React, { useState, useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { AppContent } from "../context/Appcontext"
import { toast } from "react-toastify"

const ResetPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [otp, setOtp] = useState("")
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false)
  const { backendUrl, setIsLogin, userData, getUserData } = useContext(AppContent)
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

  const onSubmitEmail = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`http://localhost:4000/api/auth/sendResetOtp`, { email })
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && setIsEmailSent(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitOTP = async (e) => {
    e.preventDefault()
    try {
      const otpArray = inputsRef.current.map((e) => e.value)
      const otp = otpArray.join("")
      setOtp(otp)
      setIsOtpSubmitted(true)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post(`http://localhost:4000/api/auth/resetPassword`, { email, otp, newPassword })
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate("/Login")
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {!isEmailSent && (
          <form onSubmit={onSubmitEmail} className="space-y-4">
            <h1 className="text-2xl font-semibold text-center mb-4">Réinitialiser le mot de passe</h1>
            <p className="text-center mb-6 text-gray-600">Enter your registered email address.</p>
            <div className="flex items-center border rounded-md overflow-hidden">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ID"
                className="flex-1 p-2 focus:outline-none"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors">
                Submit
              </button>
            </div>
          </form>
        )}

        {isEmailSent && !isOtpSubmitted && (
          <form onSubmit={onSubmitOTP} className="space-y-4">
            <h1 className="text-2xl font-semibold text-center mb-4">Verify OTP</h1>
            <p className="text-center mb-6 text-gray-600">Saisissez le code à 6 chiffres envoyé à votre adresse e-mail.</p>
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
              Vérifier l'OTP
            </button>
          </form>
        )}

        {isOtpSubmitted && (
          <form onSubmit={onSubmitNewPassword} className="space-y-4">
            <h1 className="text-2xl font-semibold text-center mb-4">Nouveau mot de passe</h1>
            <p className="text-center mb-6 text-gray-600">Entrez votre nouveau mot de passe ci-dessous.</p>
            <div className="flex items-center border rounded-md overflow-hidden">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                className="flex-1 p-2 focus:outline-none"
                required
              />
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 transition-colors">
              Soumettre
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ResetPassword

