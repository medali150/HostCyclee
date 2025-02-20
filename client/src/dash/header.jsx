import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/Appcontext";
import axios from "axios";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

const Aymen = () => {
  const navigate = useNavigate();
  const { userData, setIsLogin, setUserData } = useContext(AppContent);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const sendVerificationOTP = async () => {
    try {
      const { data } = await axios.post(
        "https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/sendVerifyOtp"
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/EmailVerify");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message || error.message || "An unexpected error occurred.");
    }
  };

  const logout = async () => {
    try {
      const { data } = await axios.post(
        "https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/logout"
      );
      if (data.success) {
        setIsLogin(false);
        setUserData(null);
        setShowDropdown(false);
        navigate("/Home");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message || error.message || "An unexpected error occurred.");
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const renderDropdown = () => (
    <li className="relative">
      <button
        ref={buttonRef}
        className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center"
        onClick={toggleDropdown}
      >
        {userData.name[0].toUpperCase()}
      </button>
      {showDropdown && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          <ul className="py-2">
            {!userData.isAccountVerified && (
              <li onClick={sendVerificationOTP} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Verify Email
              </li>
            )}
            <li onClick={logout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Logout
            </li>
          </ul>
        </div>
      )}
    </li>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="shadow-md py-4 px-4 sm:px-6 bg-white font-sans min-h-[70px] tracking-wide relative z-50">
        <div className="flex flex-wrap items-center justify-between gap-4 w-full max-w-screen-xl mx-auto">
          <a href="javascript:void(0)" className="text-lg font-bold text-blue-500">
            HOSTCYCLE
          </a>

          <button
            className="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`${isMenuOpen ? "block" : "hidden"} lg:block w-full lg:w-auto`}>
            <ul className="lg:flex lg:items-center gap-x-5 space-y-3 lg:space-y-0 mt-4 lg:mt-0">
              <li className="border-b lg:border-b-0 py-3 lg:py-0 px-3">
                <a href="/Home" className="hover:text-blue-500 text-blue-500 font-bold block text-base">
                  Home
                </a>
              </li>
              <li className="border-b lg:border-b-0 py-3 lg:py-0 px-3">
                <a href="/Commerce" className="hover:text-blue-500 text-gray-600 font-bold block text-base">
                  News
                </a>
              </li>
              <li className="border-b lg:border-b-0 py-3 lg:py-0 px-3">
                <a href="/Chatbot" className="hover:text-blue-500 text-gray-600 font-bold block text-base">
                  Support
                </a>
              </li>

              {userData ? (
                <>
                  <li className="border-b lg:border-b-0 py-3 lg:py-0 px-3">
                    <a href="/Compte" className="hover:text-blue-500 text-gray-600 font-bold block text-base">
                      Account
                    </a>
                  </li>
                  {userData.isAdmin && (
                    <li className="border-b lg:border-b-0 py-3 lg:py-0 px-3">
                      <a href="/Admin" className="hover:text-blue-500 text-gray-600 font-bold block text-base">
                        Dashboard
                      </a>
                    </li>
                  )}
                  {renderDropdown()}
                </>
              ) : (
                <li>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 hover:bg-blue-600 rounded-xl flex items-center"
                    onClick={() => navigate("/Login")}
                  >
                    Login
                    <img src="assets/arrow_icon.svg" alt="" className="ml-2 w-4 h-4" />
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Aymen;