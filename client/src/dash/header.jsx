import React, { useContext, useState } from 'react'; import { useNavigate } from 'react-router-dom'; import { AppContent } from '../context/Appcontext'; import axios from 'axios'; import { toast } from 'react-toastify';

const Aymen = () => { const navigate = useNavigate(); 
  const { userData, setIsLogin, setUserData } = useContext(AppContent); 
  const [isAdmin, setIsAdmin] = useState(false);

// Check if user is admin

const sendVerificationOTP = async () => {
    try {
        const { data } = await axios.post('http://localhost:4000/api/auth/sendVerifyOtp');
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
        const { data } = await axios.post('http://localhost:4000/api/auth/logout');
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
    <div>
        <nav className='flex shadow-[0px_0px_16px_rgba(17,_17,_26,_0.1)] py-4 px-4 sm:px-6 bg-white font-sans min-h-[70px] tracking-wide relative z-50'>
            <div className='flex flex-wrap items-center justify-between gap-4 w-full max-w-screen-xl mx-auto'>
            <a href="javascript:void(0)" className="max-sm:hidden">
    <span className="text-lg font-bold text-blue-500">HOSTCYCLE</span>
</a>

               

                <div id="collapseMenu" className='max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50'>
                    <ul className='lg:flex gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50'>
                        <li className='mb-6 hidden max-lg:block'>
                            <a href="javascript:void(0)">
                                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
                            </a>
                        </li>
                        <li className='max-lg:border-b max-lg:py-3 px-3'>
                            <a href="/Home" className='hover:text-[#007bff] text-[#007bff] font-bold block text-base'>Home</a>
                        </li>
                        <li className='max-lg:border-b max-lg:py-3 px-3'>
                            <a href='/Commerce' className='hover:text-[#007bff] text-gray-600 font-bold block text-base'>
                            Nouvelles</a>
                        </li>

                        {userData ? (
                            <>
                                <li className='max-lg:border-b max-lg:py-3 px-3'>
                                    <a href='/Compte' className='hover:text-[#007bff] text-gray-600 font-bold block text-base'>Compte</a>
                                </li>
                                {userData.isAdmin && (
                                    <li className='max-lg:border-b max-lg:py-3 px-3'>
                                        <a href='/Admin ' className='hover:text-[#007bff] text-gray-600 font-bold block text-base'>Dashboard</a>
                                    </li>
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
                            <li>
                            <button
  className="login-button bg-blue text-white py-2 px-4 hover:bg-blue-500 rounded-xl"
  onClick={() => navigate('/Login')}
>
  Login <img src="assets/arrow_icon.svg" alt="" />
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